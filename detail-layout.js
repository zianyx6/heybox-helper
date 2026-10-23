(() => {
  const embedded = window.top !== window && (document.documentElement.classList.contains('hbh-embedded') || new URL(location.href).searchParams.get('hbh_embed') === '1');
  if (window.top !== window && !embedded) return;
  let enabled = embedded, pending = false, identity = null;
  const moved = new Map();
  function restore() {
    for (const [target, original] of moved) if (original.isConnected && target.isConnected) original.append(target);
    moved.clear();document.querySelectorAll('.hbh-composer-identity,img.hbh-self-avatar').forEach(el => el.remove());
    document.querySelectorAll('img[data-hbh-self-avatar]').forEach(el => { el.removeAttribute('src');el.removeAttribute('data-hbh-self-avatar'); });
  }
  function improveComposer() {
    for (const [target, original] of moved) if (!target.isConnected || !original.isConnected) moved.delete(target);
    const content = document.querySelector('#page-bbs-link .hb-bbs-link__content');
    const comment = content?.querySelector(':scope > .link-comment');
    const target = document.querySelector('#page-bbs-link .hb-bbs-link__reply-target');
    if (comment && target && target.parentElement !== comment) {
      if (!moved.has(target)) moved.set(target, target.parentElement);
      // Retain the same Teleport target, editor, focus and native send listeners.
      comment.append(target);
    }
    if (target && identity?.avatar && !target.querySelector('.hbh-composer-identity') && target.querySelector('.link-reply')) {
      const own = document.createElement('div');own.className = 'hbh-composer-identity';
      const image = document.createElement('img');image.src = identity.avatar;image.alt = '';
      const label = document.createElement('span');label.textContent = identity.name || '参与讨论';
      own.append(image, label);target.prepend(own);
    }
    const own = target?.querySelector('.hbh-composer-identity');
    if (own && !identity?.avatar) own.remove();
    else if (own) {
      if (own.querySelector('img').src !== identity.avatar) own.querySelector('img').src = identity.avatar;
      const label = identity.name || '参与讨论';if (own.querySelector('span').textContent !== label) own.querySelector('span').textContent = label;
    }
  }
  function update() {
    pending = false;
    const active = enabled || embedded;
    document.documentElement.classList.toggle('hbh-detail', active);
    if (!active) { restore();return; }
    improveComposer();
    if (document.querySelector('#page-bbs-link')) document.dispatchEvent(new Event('hbh-detail-identity-request'));
  }
  function schedule() { if (!pending) { pending = true;setTimeout(update, 100); } }
  document.addEventListener('hbh-detail-bridge-ready', schedule);
  document.addEventListener('hbh-detail-identity-result', event => {
    if (!enabled && !embedded) return;
    let info;try { info = JSON.parse(event.detail); } catch { return; }
    if (info.userId === '' && info.avatar === '') { identity = null;improveComposer();return; }
    if (!/^\d{1,20}$/.test(info.userId) || typeof info.avatar !== 'string' || !/^https?:\/\//.test(info.avatar)) return;
    identity = info;improveComposer();
    for (const id of Array.isArray(info.comments) ? info.comments : []) {
      if (!/^\d{1,20}$/.test(id)) continue;
      const row = document.querySelector(`.link-comment [data-comment-id="${id}"]`);
      const header = row?.querySelector('.link-comment__comment-item-header');
      const host = header?.querySelector('.comment-item-header__avatar');
      const native = host?.matches('img') ? host : host?.querySelector('img');
      if (!header || row.querySelector('img.hbh-self-avatar') || native?.getAttribute('src')) continue;
      const image = document.createElement('img');image.className = 'hbh-self-avatar';image.src = info.avatar;image.alt = `${info.name || '我'}的头像`;
      // Fallback only for freshly submitted self rows with no native source.
      if (host && !host.matches('img')) host.prepend(image);
      else if (host) { host.src = info.avatar;host.dataset.hbhSelfAvatar = 'true'; }
      else { const link = header.querySelector('a');if (link) link.prepend(image); }
    }
  });
  const observer = new MutationObserver(records => {
    if ((enabled || embedded) && records.some(record => record.type === 'attributes' ? record.target.matches('.nav-user-avatar') : [...record.addedNodes].some(node => node.nodeType === 1 && !node.matches?.('.hbh-composer-identity,.hbh-self-avatar')) || record.removedNodes.length)) schedule();
  });
  observer.observe(document.documentElement, { childList:true,subtree:true,attributes:true,attributeFilter:['src'] });
  window.addEventListener('pagehide', () => observer.disconnect(), { once:true });
  if (window.top === window) {
    let changed = false;
    chrome.storage.onChanged.addListener((changes, area) => { if (area === 'local' && changes.workspace) { changed = true;enabled = !!changes.workspace.newValue;update(); } });
    chrome.storage.local.get('workspace').then(settings => { if (!changed) { enabled = !!settings.workspace;update(); } });
  } else update();
})();
