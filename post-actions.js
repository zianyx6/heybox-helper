(() => {
  'use strict';
  if (window.top !== window || document.getElementById('hbh-post-actions-style')) return;

  // Feedback stays on this device. No recommendation/feedback endpoint is called.
  const CARD = '.hb-cpt__bbs-list-content,.hb-cpt__moment-list-content';
  const WRAPPER = '.bbs-home__content-item,.topic-link__item,.user-profile-moment-item';
  const HEADER = '.bbs-list-content__header,.list-content__header';
  const NATIVE_MORE = '.list-cotent__operation-btn,.list-content__operation-btn';
  const validId = value => /^\d{1,20}$/.test(String(value ?? '')) ? String(value) : '';
  const sanitize = value => [...new Set((Array.isArray(value) ? value : []).map(validId).filter(Boolean))].slice(-1000);
  const states = new WeakMap(), requests = new Map(), pending = new Set(), bypass = new WeakSet();
  let hiddenPosts = new Set(), timer = 0, requestId = 0, queue = Promise.resolve(), current = null, undoId = '', toastTimer;
  let storageVersion = 0;

  const style = document.createElement('style');
  style.id = 'hbh-post-actions-style';
  style.textContent = `
    [data-hbh-post-hidden="true"]{display:none!important}
    [data-hbh-post-menu-host]{position:relative}
    .hbh-post-local-more{margin-left:auto;flex:none;border:0;background:transparent;color:var(--hbh-muted,#536471);border-radius:999px;min-width:32px;min-height:32px;cursor:pointer;font:700 20px/1 system-ui;letter-spacing:1px;padding:4px 8px}
    .hbh-post-local-more:hover{background:var(--hbh-accent-soft,#edf5ff);color:var(--hbh-accent,#2289ed)}
    .hbh-post-local-more:focus-visible{outline:2px solid var(--hbh-accent,#2289ed);outline-offset:2px}
    .hbh-post-local-more[data-hbh-floating]{position:absolute;top:4px;right:8px;z-index:2}
  `;
  document.documentElement.append(style);

  const ui = document.createElement('div');
  ui.id = 'hbh-post-actions-host';
  const shadow = ui.attachShadow({ mode: 'open' });
  shadow.innerHTML = `<style>
    :host{all:initial;font:14px/1.5 'Segoe UI','Microsoft YaHei',system-ui;color:var(--hbh-ink,#182230)}
    *{box-sizing:border-box} [hidden]{display:none!important}
    #menu{position:fixed;z-index:2147483646;width:min(260px,calc(100vw - 24px));padding:6px;border:1px solid var(--hbh-line,#e4eaf0);border-radius:16px;background:var(--hbh-surface,#fff);box-shadow:0 10px 36px #18223024}
    @keyframes hbh-menu-in {from{opacity:.65;transform:translateY(-3px)}to{opacity:1;transform:translateY(0)}}
    #menu:not([hidden]){animation:hbh-menu-in var(--hbh-motion-duration,0ms) cubic-bezier(.2,.8,.2,1) both}
    #menu button,#undo{transition:background-color var(--hbh-motion-duration,0ms) ease,color var(--hbh-motion-duration,0ms) ease}
    @media(prefers-reduced-motion:reduce){#menu{animation:none!important}#menu button,#undo{transition:none!important}}
    button{font:inherit;cursor:pointer} #menu button{display:block;width:100%;padding:11px 12px;border:0;border-radius:11px;text-align:left;background:transparent;color:inherit}
    #menu button:hover,#menu button:focus-visible{background:var(--hbh-accent-soft,#edf5ff);outline:none}
    #menu button:disabled{opacity:.55;cursor:default} small{display:block;color:var(--hbh-muted,#64748b);font-size:12px;margin-top:3px}
    #toast{position:fixed;z-index:2147483647;left:50%;bottom:30px;transform:translateX(-50%);max-width:calc(100vw - 32px);display:flex;align-items:center;gap:16px;background:var(--hbh-surface,#fff);color:var(--hbh-ink,#182230);border:1px solid var(--hbh-line,#e4eaf0);border-radius:16px;padding:12px 16px;box-shadow:0 8px 30px #18223022}
    #undo{border:0;background:transparent;color:var(--hbh-accent,#2289ed);padding:5px;font-weight:600;white-space:nowrap}
  </style><div id="menu" role="menu" aria-label="帖子操作" hidden><button id="hide" role="menuitem">不感兴趣（仅本机）<small>本机隐藏，不影响原站推荐</small></button><button id="native" role="menuitem">原站更多操作</button></div><div id="toast" role="status" aria-live="polite" hidden><span id="message"></span><button id="undo" hidden>撤销隐藏</button></div>`;
  document.documentElement.append(ui);
  const menu = shadow.getElementById('menu'), hideButton = shadow.getElementById('hide');
  const nativeButton = shadow.getElementById('native'), toast = shadow.getElementById('toast');
  const undo = shadow.getElementById('undo'), message = shadow.getElementById('message');

  function eligible(card) {
    return card?.isConnected && card.matches(CARD) && !card.closest('#hbh-post-dialog,.hb-bbs-link__content,.link-comment,[contenteditable="true"],.hb-cpt__rich-text-editor') &&
      !/^\/app\/(?:bbs\/link\/|creator\/editor)/.test(location.pathname);
  }
  function wrapper(card) { return card.closest(WRAPPER) || card; }
  function applyHidden(card) {
    const state = states.get(card), target = wrapper(card);
    const hide = !!state?.id && hiddenPosts.has(state.id);
    if (hide) {
      if (target.getAttribute('data-hbh-post-hidden') !== 'true') target.setAttribute('data-hbh-post-hidden', 'true');
    } else if (target.hasAttribute('data-hbh-post-hidden')) target.removeAttribute('data-hbh-post-hidden');
  }
  function refreshHidden() {
    for (const card of document.querySelectorAll(CARD)) if (eligible(card)) applyHidden(card);
  }
  function directId(card) {
    // A link quoted inside the post body identifies that quoted post, not this card.
    // Native Vue cards use the read-only MAIN bridge; only card-level links qualify here.
    const links = card.matches('a[href]') ? [card] : card.querySelectorAll(':scope > a[href]');
    const ids = new Set();
    for (const link of links) {
      try {
        const url = new URL(link.getAttribute('href'), location.href);
        if (url.origin !== location.origin) continue;
        const match = url.pathname.match(/^\/app\/bbs\/link\/(\d{1,20})\/?$/);
        if (match) ids.add(match[1]);
      } catch { /* Ignore malformed original links. */ }
    }
    return ids.size === 1 ? ids.values().next().value : '';
  }
  function prepare(card) {
    if (!eligible(card)) return;
    let state = states.get(card);
    if (!state) { state = { id: '', token: '' }; states.set(card, state); }
    const id = directId(card);
    // Reused native components may represent a different post after navigation.
    state.id = id;
    if (state.token) requests.delete(state.token);
    state.token = '';
    const native = card.querySelector(NATIVE_MORE);
    let own = card.querySelector('.hbh-post-local-more');
    if (native) own?.remove();
    else if (!own) {
      own = document.createElement('button');
      own.type = 'button'; own.className = 'hbh-post-local-more'; own.textContent = '···';
      own.setAttribute('aria-label', '更多帖子操作'); own.setAttribute('aria-haspopup', 'menu');
      const header = card.querySelector(HEADER);
      if (header) header.append(own);
      else { card.setAttribute('data-hbh-post-menu-host', ''); own.setAttribute('data-hbh-floating', ''); card.append(own); }
    }
    applyHidden(card);
    {
      const token = `hbh-post-${++requestId}`;
      state.token = token; requests.set(token, card);
      card.setAttribute('data-hbh-id-request', token);
      document.dispatchEvent(new CustomEvent('hbh-post-id-request', { detail: token }));
      // Only live unresolved cards are retained, never a growing post history.
      if (requests.size > 500) requests.delete(requests.keys().next().value);
    }
  }
  function scan(node) {
    if (!(node instanceof Element) || node === ui || ui.contains(node)) return;
    const card = node.closest(CARD);
    if (card) pending.add(card);
    for (const child of node.querySelectorAll(CARD)) pending.add(child);
    if (node.matches(CARD)) pending.add(node);
  }
  function schedule() {
    if (timer || !pending.size) return;
    timer = setTimeout(() => {
      timer = 0;
      const cards = [...pending]; pending.clear();
      for (const card of cards) prepare(card);
      for (const [token, card] of requests) if (!card.isConnected) requests.delete(token);
      if (current && !current.trigger.isConnected) closeMenu(false);
    }, 80);
  }
  function setHidden(value) { hiddenPosts = new Set(sanitize(value)); refreshHidden(); }
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.hiddenPosts) { storageVersion++; setHidden(changes.hiddenPosts.newValue); }
  });
  const initialVersion = storageVersion;
  const ready = chrome.storage.local.get('hiddenPosts').then(value => {
    if (storageVersion === initialVersion) setHidden(value.hiddenPosts);
  });
  function persist(update) {
    const task = queue.then(async () => {
      await ready;
      const value = await chrome.storage.local.get('hiddenPosts');
      const ids = new Set(sanitize(value.hiddenPosts));
      const result = update(ids);
      const next = [...ids].slice(-1000);
      await chrome.storage.local.set({ hiddenPosts: next });
      setHidden(next);
      return result;
    });
    queue = task.catch(() => {});
    return task;
  }
  function showToast(text, id = '') {
    clearTimeout(toastTimer); message.textContent = text; undoId = id;
    undo.hidden = !id; undo.disabled = false; toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; undoId = ''; }, id ? 10000 : 6000);
  }
  function closeMenu(focus = true) {
    if (!current) return;
    const trigger = current.trigger; current = null; menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (focus && trigger.isConnected) trigger.focus({ preventScroll: true });
  }
  function positionMenu(trigger) {
    const box = trigger.getBoundingClientRect(), width = menu.offsetWidth, height = menu.offsetHeight;
    // The layout viewport excludes the page scrollbar; innerWidth includes it.
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    const left = Math.max(12, Math.min(box.right - width, viewportWidth - width - 16));
    const top = Math.max(12, Math.min(box.bottom + 6, viewportHeight - height - 16));
    menu.style.left = `${left}px`; menu.style.top = `${top}px`;
  }
  function openMenu(card, trigger, native, event) {
    closeMenu(false);
    current = { card, trigger, native, x: event.clientX, y: event.clientY };
    const state = states.get(card);
    hideButton.disabled = !state?.id;
    hideButton.querySelector('small').textContent = state?.id ? '本机隐藏，不影响原站推荐' : '此内容暂未识别，无法安全隐藏';
    nativeButton.hidden = !native;
    menu.hidden = false; trigger.setAttribute('aria-expanded', 'true'); positionMenu(trigger);
    (hideButton.disabled && native ? nativeButton : hideButton).focus();
  }

  document.addEventListener('hbh-post-id-result', event => {
    if (typeof event.detail !== 'string' || event.detail.length > 200) return;
    let data; try { data = JSON.parse(event.detail); } catch { return; }
    if (!/^hbh-post-\d+$/.test(data?.token)) return;
    const card = requests.get(data.token), state = card && states.get(card);
    requests.delete(data.token);
    if (!eligible(card) || state?.token !== data.token) return;
    state.id = validId(data.id) || directId(card); state.token = '';
    card.removeAttribute('data-hbh-id-request'); applyHidden(card);
    if (current?.card === card) {
      hideButton.disabled = !state.id;
      hideButton.querySelector('small').textContent = state.id ? '本机隐藏，不影响原站推荐' : '此内容暂未识别，无法安全隐藏';
    }
  });
  document.addEventListener('hbh-post-id-bridge-ready', () => {
    for (const card of document.querySelectorAll(CARD)) if (!states.get(card)?.id) pending.add(card);
    schedule();
  });
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest(`${NATIVE_MORE},.hbh-post-local-more`);
    if (trigger && bypass.has(trigger)) { bypass.delete(trigger); return; }
    if (!trigger || event.button !== 0) return;
    const card = trigger.closest(CARD);
    if (!eligible(card)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (!states.has(card)) prepare(card);
    if (current?.trigger === trigger) closeMenu();
    else openMenu(card, trigger, trigger.matches(NATIVE_MORE) ? trigger : null, event);
  }, true);
  document.addEventListener('pointerdown', event => {
    if (!current || event.composedPath().includes(ui) || current.trigger.contains(event.target)) return;
    closeMenu(false);
  }, true);
  document.addEventListener('keydown', event => {
    if (!current) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeMenu(); }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const options = [hideButton, nativeButton].filter(button => !button.disabled && !button.hidden);
      const index = options.indexOf(shadow.activeElement), offset = event.key === 'ArrowUp' ? -1 : 1;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + offset + options.length) % options.length;
      options[next]?.focus();
    }
    if (event.key === 'Tab') closeMenu(false);
  }, true);
  window.addEventListener('resize', () => closeMenu(false), { passive: true });
  document.addEventListener('scroll', event => {
    if (current && !event.composedPath().includes(ui)) closeMenu(false);
  }, { passive: true, capture: true });
  hideButton.addEventListener('click', async () => {
    const id = current && states.get(current.card)?.id;
    if (!id) return;
    closeMenu();
    try {
      await persist(ids => { ids.delete(id); ids.add(id); });
      showToast('已在本机隐藏这篇帖子', id);
    } catch { showToast('未能保存隐藏设置，请刷新页面后重试'); }
  });
  nativeButton.addEventListener('click', () => {
    const action = current; closeMenu(false);
    if (!action?.native?.isConnected) return;
    bypass.add(action.native);
    action.native.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: action.x, clientY: action.y }));
    bypass.delete(action.native);
  });
  undo.addEventListener('click', async () => {
    const id = undoId; if (!id) return;
    undo.disabled = true;
    try { await persist(ids => ids.delete(id)); if (undoId === id) showToast('已恢复这篇帖子'); }
    catch { if (undoId === id) { undo.disabled = false; message.textContent = '撤销失败，请重试'; } }
  });
  document.addEventListener('hbh-reset-hidden-posts', async () => {
    try {
      const count = await persist(ids => { const previous = ids.size; ids.clear(); return previous; });
      showToast(`已恢复 ${count} 篇本机隐藏帖子`);
      document.dispatchEvent(new CustomEvent('hbh-hidden-posts-reset', { detail: { count } }));
    } catch {
      document.dispatchEvent(new CustomEvent('hbh-hidden-posts-reset', { detail: { error: '恢复失败，请刷新页面后重试' } }));
    }
  });

  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') scan(record.target);
      else if (record.type === 'characterData') scan(record.target.parentElement);
      else {
        const changedCard = record.target instanceof Element && record.target.closest(CARD);
        // Our added menu control needs no second initialization pass.
        const realChanges = [...record.addedNodes, ...record.removedNodes].some(node => !(node instanceof Element) || !node.matches('.hbh-post-local-more'));
        if (changedCard && realChanges) pending.add(changedCard);
        for (const node of record.addedNodes) if (!(node instanceof Element) || !node.matches('.hbh-post-local-more')) scan(node);
      }
    }
    schedule();
  });
  ready.then(() => {
    scan(document.body); schedule();
    observer.observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  }).catch(() => showToast('无法读取本机隐藏设置，请刷新页面后重试'));
})();
