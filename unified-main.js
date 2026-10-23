(() => {
  'use strict';
  if (window.top !== window) return;
  const root = document.documentElement;
  const targets = {
    message: {path:'/message/home/comment', view:'#page-message-center', label:'正在打开消息…'},
    home: {path:'/app/bbs/home', view:'#page-bbs-community', label:'正在返回社区…'}
  };
  const prefetched = new WeakMap();
  let cancelPending = () => {};
  let activeAnimation;
  function enhanced() { return root.classList.contains('hbh-rounded') || root.classList.contains('hbh-workspace'); }
  function routerForPage() {
    const app = [...document.querySelectorAll('[data-v-app]')].map(el => el.__vue_app__).find(Boolean);
    return app?.config?.globalProperties?.$router;
  }
  function intent(element) {
    if (!(element instanceof Element)) return;
    const link = element.closest('.nav-links .nav-link');
    if (!link) return;
    if (link.id === 'hbh-message-entry') return {link, target:targets.message, intercepted:true};
    // The site's Community button already uses its native router. Let its own handler run.
    if (enhanced() && link.textContent.trim() === '社区') return {link, target:targets.home, intercepted:link.tagName === 'A'};
  }
  function prefetch(router, target) {
    if (!enhanced() || !router?.resolve) return;
    let routes = prefetched.get(router);
    if (!routes) { routes = new Set(); prefetched.set(router, routes); }
    if (routes.has(target.path)) return;
    routes.add(target.path);
    try {
      // Only load the site's route modules, without mounting components or fetching inbox data.
      for (const record of router.resolve(target.path).matched || []) {
        const component = record.components?.default;
        if (typeof component !== 'function' || component.displayName || component.props || component.__vccOpts) continue;
        Promise.resolve(component()).catch(() => { routes.delete(target.path); });
      }
    } catch { routes.delete(target.path); }
  }
  function begin(target, link) {
    cancelPending();
    activeAnimation?.cancel();
    let done = false, ready = false;
    let firstFrame = 0, secondFrame = 0;
    const status = document.createElement('div');
    status.id = 'hbh-route-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = target.label;
    root.setAttribute('data-hbh-route-pending', target === targets.message ? 'message' : 'home');
    link.setAttribute('aria-busy', 'true');
    const noticeTimer = setTimeout(() => { if (!done) document.body.append(status); }, 180);
    const stopTimer = setTimeout(() => finish(false), 6000);
    const observer = new MutationObserver(check);
    observer.observe(document.body, {childList:true, subtree:true});
    function finish(animate) {
      if (done) return;
      done = true;
      observer.disconnect();
      clearTimeout(noticeTimer);
      clearTimeout(stopTimer);
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      root.removeAttribute('data-hbh-route-pending');
      link.removeAttribute('aria-busy');
      status.remove();
      const view = document.querySelector(target.view);
      if (animate && view && enhanced() && root.classList.contains('hbh-motion') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // A single small entrance on the new view keeps the existing page visible during loading.
        activeAnimation = view.animate([{opacity:.86, transform:'translateY(4px)'}, {opacity:1, transform:'translateY(0)'}], {
          duration:150, easing:'cubic-bezier(.2,.8,.2,1)'
        });
        activeAnimation.finished.catch(() => {});
      }
    }
    function check() {
      if (done || ready || location.pathname !== target.path || !document.querySelector(target.view)) return;
      ready = true;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (location.pathname === target.path && document.querySelector(target.view)) finish(true);
          else { ready = false; check(); }
        });
      });
    }
    cancelPending = () => finish(false);
    return {check, cancel:cancelPending, active:() => !done};
  }
  for (const eventName of ['pointerover', 'focusin']) {
    document.addEventListener(eventName, event => {
      const navigation = intent(event.target);
      if (navigation) prefetch(routerForPage(), navigation.target);
    }, {passive:true});
  }
  document.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
    const navigation = intent(event.target);
    if (!navigation) return;
    const {link, target, intercepted} = navigation;
    const router = routerForPage();
    if (!router?.push) return;
    if (location.pathname === target.path) {
      if (intercepted) { event.preventDefault(); event.stopImmediatePropagation(); }
      return;
    }
    prefetch(router, target);
    const pending = enhanced() ? begin(target, link) : {check:() => {}, cancel:() => {}, active:() => true};
    if (!intercepted) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    try {
      Promise.resolve(router.push(target.path)).then(pending.check).catch(() => {
        if (!pending.active()) return;
        pending.cancel();
        location.assign(target.path);
      });
    } catch {
      if (!pending.active()) return;
      pending.cancel();
      location.assign(target.path);
    }
  }, true);
  window.addEventListener('popstate', () => cancelPending());
  window.addEventListener('pagehide', () => { cancelPending(); activeAnimation?.cancel(); });
})();
