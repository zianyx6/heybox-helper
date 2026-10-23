(() => {
  'use strict';
  if (window.top !== window || document.getElementById('hbh-unified-style')) return;
  const style = document.createElement('style');
  style.id = 'hbh-unified-style';
  style.textContent = `
    html.hbh-workspace {scrollbar-gutter:stable;}
    .hbh-message-entry {display:inline-flex!important;align-items:center;justify-content:center;gap:7px;text-decoration:none!important;white-space:nowrap;font:inherit;border:0;box-sizing:border-box;}
    .hbh-message-entry svg {width:17px;height:17px;flex:none;}
    html:is(.hbh-rounded,.hbh-workspace) .hbh-message-entry {border-radius:999px!important;padding:9px 16px!important;color:var(--hbh-muted,#64748b)!important;line-height:1.4!important;}
    html:is(.hbh-rounded,.hbh-workspace) .hbh-message-entry:hover {background:var(--hbh-input,#f1f5f9)!important;color:var(--hbh-ink,#182230)!important;}
    html:is(.hbh-rounded,.hbh-workspace) .hbh-message-entry[aria-current="page"] {background:var(--hbh-accent-soft,#edf5ff)!important;color:var(--hbh-accent-text,#1673ce)!important;box-shadow:none!important;}
    .hbh-message-entry:focus-visible {outline:2px solid var(--hbh-accent,#2289ed);outline-offset:3px;}
    html:is(.hbh-rounded,.hbh-workspace) #app>main:has(>#page-message-center) {display:flow-root!important;min-height:0!important;}
    html:is(.hbh-rounded,.hbh-workspace) #app #page-message-center,html:is(.hbh-rounded,.hbh-workspace) #page-message-center {display:block!important;width:min(960px,calc(100% - 48px))!important;max-width:none!important;height:calc(100dvh - 104px)!important;min-height:0!important;margin:20px auto!important;padding:0!important;box-sizing:border-box!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__main {display:grid!important;grid-template-columns:180px minmax(0,1fr)!important;gap:20px!important;width:100%!important;min-width:0!important;max-width:none!important;height:100%!important;min-height:0!important;max-height:none!important;border:0!important;border-radius:0!important;background:transparent!important;overflow:visible!important;box-sizing:border-box;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__aside {width:auto!important;min-width:0!important;min-height:0!important;height:100%!important;border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:var(--hbh-radius,20px)!important;background:var(--hbh-surface,#fff)!important;display:flex!important;flex-direction:column;overflow:hidden!important;padding:16px 8px 8px!important;box-sizing:border-box!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__aside-title {position:static!important;height:auto!important;font-size:15px!important;font-weight:650;padding:0 10px 14px!important;background:transparent!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-center__aside-title:after {display:none!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-center__divider {display:none!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__search-box {position:static!important;padding:0 4px 12px!important;background:transparent!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-center__search {background:var(--hbh-input,#f7f9fc)!important;border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:999px!important;margin:0!important;box-sizing:border-box!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__search input {font-size:12px!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__conversation-list {flex:1;min-height:0;overflow-y:auto!important;scrollbar-gutter:stable;scrollbar-width:thin;padding:0 0 4px!important;overscroll-behavior:contain;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item {display:flex!important;align-items:center!important;padding:10px 7px!important;border-radius:calc(var(--hbh-radius,20px) * .7)!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item__avatar {width:36px!important;height:36px!important;flex-shrink:0;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item__content {min-width:0!important;margin-left:8px!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item__line {flex-wrap:wrap;row-gap:0;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item__title {font-size:13px!important;line-height:20px!important;max-width:100%;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item__time {display:block;margin-left:0!important;width:100%;font-size:10px!important;line-height:14px!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-list-item__text {font-size:11px!important;line-height:16px!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__content {width:auto!important;min-width:0!important;min-height:0!important;height:100%!important;overflow:hidden!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-home__detail {display:flex!important;flex-direction:column;min-width:0;min-height:0;height:100%!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-home__tabs {flex:0 0 auto!important;height:auto!important;min-height:52px!important;padding:4px 20px!important;margin-bottom:var(--hbh-card-gap,14px)!important;border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:var(--hbh-radius,20px)!important;background:var(--hbh-surface,#fff)!important;box-sizing:border-box!important;overflow:hidden;}
    html:is(.hbh-rounded,.hbh-workspace) .message-home__tabs.underline:after {display:none!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-home__tabs .slide-tab__tab-item {color:var(--hbh-muted,#64748b)!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-home__tabs .slide-tab__tab-item.active {color:var(--hbh-accent-text,#1673ce)!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-home__tabs .slide-tab-tab__bar {background:var(--hbh-accent,#2289ed)!important;}
    html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-home__detail-list {flex:1;min-height:0;overflow-x:hidden!important;overflow-y:auto!important;scrollbar-gutter:stable;scrollbar-width:thin;padding:0!important;box-sizing:border-box;background:transparent!important;overscroll-behavior:contain;}
    html:is(.hbh-rounded,.hbh-workspace) :is(.comment-message-item,.follow-message-item) {width:100%;box-sizing:border-box;border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:var(--hbh-radius,20px)!important;padding:var(--hbh-card-pad,20px 24px)!important;margin:0 0 var(--hbh-card-gap,14px)!important;background:var(--hbh-surface,#fff)!important;text-align:left;color:var(--hbh-ink,#182230);}
    html:is(.hbh-rounded,.hbh-workspace) :is(.comment-message-item,.follow-message-item):hover {background:var(--hbh-input,#f7f9fc)!important;}
    html:is(.hbh-rounded,.hbh-workspace) :is(.comment-message-item,.follow-message-item):before {display:none!important;}
    html:is(.hbh-rounded,.hbh-workspace) .follow-message-item {height:auto!important;min-height:86px;}
    html:is(.hbh-rounded,.hbh-workspace) .comment-message-item__username {font-size:13px!important;line-height:20px!important;color:var(--hbh-ink,#182230)!important;}
    html:is(.hbh-rounded,.hbh-workspace) .comment-message-item__time {font-size:11px!important;line-height:17px!important;color:var(--hbh-muted,#64748b)!important;}
    html:is(.hbh-rounded,.hbh-workspace) .comment-message-item__text {margin-top:6px!important;font-size:14px!important;line-height:1.65!important;color:var(--hbh-ink,#182230)!important;overflow-wrap:anywhere;}
    html:is(.hbh-rounded,.hbh-workspace) .message-content-preview {background:var(--hbh-input,#f7f9fc)!important;border:0!important;border-radius:calc(var(--hbh-radius,20px) * .65)!important;padding:10px!important;box-sizing:border-box!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-content-preview__post {background:transparent!important;}
    html:is(.hbh-rounded,.hbh-workspace) .message-chat {height:100%;min-height:0;border:1px solid var(--hbh-line,#e8edf2);border-radius:var(--hbh-radius,20px);background:var(--hbh-surface,#fff);overflow:hidden;box-sizing:border-box;}
    html:is(.hbh-rounded,.hbh-workspace) .message-chat__list {scrollbar-gutter:stable;scrollbar-width:thin;}
    html:is(.hbh-rounded,.hbh-workspace) .message-chat__content.is-text {border-radius:16px!important;}
    html.hbh-rounded .message-center__conversation-list .active{background:var(--hbh-accent-soft)!important;color:var(--hbh-accent-text)!important;border-radius:calc(var(--hbh-radius) * .7);}
    html[data-hbh-message-route] .nav-links .nav-link--active:not(.hbh-message-entry){box-shadow:none!important;background:transparent!important;color:var(--hbh-muted,#64748b)!important;}
    #hbh-route-status {position:fixed;top:76px;right:24px;z-index:90;pointer-events:none;padding:9px 15px;border:1px solid var(--hbh-line,#e8edf2);border-radius:999px;background:var(--hbh-surface,#fff);color:var(--hbh-accent-text,#1673ce);box-shadow:0 4px 18px #1822300d;font:13px/1.5 system-ui;}
    @media(max-width:760px) {
      html:is(.hbh-rounded,.hbh-workspace) #app #page-message-center,html:is(.hbh-rounded,.hbh-workspace) #page-message-center {width:calc(100% - 24px)!important;height:calc(100dvh - 88px)!important;margin:12px auto!important;}
      html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__main {grid-template-columns:1fr!important;grid-template-rows:auto minmax(0,1fr)!important;gap:12px!important;}
      html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__aside {display:flex!important;max-height:166px;height:auto!important;padding:8px 10px!important;}
      html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__aside-title {font-size:13px!important;padding-bottom:7px!important;}
      html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__search-box {padding-bottom:7px!important;}
      html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-center__conversation-list {display:flex!important;gap:6px;flex-shrink:0;overflow-x:auto!important;overflow-y:hidden!important;max-height:64px;scrollbar-gutter:auto;}
      html:is(.hbh-rounded,.hbh-workspace) .message-center__conversation-list>* {flex:0 0 auto;min-width:150px;}
      html:is(.hbh-rounded,.hbh-workspace) #page-message-center .message-home__tabs {padding-inline:12px!important;min-height:46px!important;}
    }
  `;
  document.documentElement.append(style);
  const link = document.createElement('a');
  link.id = 'hbh-message-entry';
  link.className = 'nav-link hbh-message-entry';
  link.href = '/message/home/comment';
  link.setAttribute('aria-label', '消息中心');
  link.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg><span>消息</span>';
  function update() {
    const nav = document.querySelector('.nav-links');
    if (nav && link.parentElement !== nav) nav.append(link);
    const selected = location.pathname.startsWith('/message');
    if(document.documentElement.hasAttribute('data-hbh-message-route')!==selected)document.documentElement.toggleAttribute('data-hbh-message-route',selected);
    if (selected && link.getAttribute('aria-current') !== 'page') link.setAttribute('aria-current', 'page');
    else if (!selected && link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
  }
  update();
  let scheduled = false;
  new MutationObserver(records => {
    if (scheduled || !records.some(record => record.addedNodes.length || record.removedNodes.length)) return;
    scheduled = true;
    setTimeout(() => { scheduled = false; update(); }, 120);
  }).observe(document.body, { childList:true, subtree:true });
  window.addEventListener('popstate', update);
})();
