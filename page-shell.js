(() => {
  'use strict';
  const root = document.documentElement;
  if (document.getElementById('hbh-page-shell-style')) return;
  // A route can discard its query string. The owning iframe survives both
  // Vue navigation and full document loads, so it identifies our reader.
  let embedded = false;
  if (window.top !== window) {
    try {
      const frame = window.frameElement;
      embedded = !!frame?.matches('#hbh-post-frame') && !!frame.closest('#hbh-post-dialog');
    } catch {}
    embedded ||= new URL(location.href).searchParams.get('hbh_embed') === '1';
    if (!embedded) return;
    root.classList.add('hbh-embedded', 'hbh-shell');
  }
  const style = document.createElement('style');
  style.id = 'hbh-page-shell-style';
  style.textContent = `
    html.hbh-shell {scrollbar-gutter:stable;}
    html:is(.hbh-shell,.hbh-rounded) #app {min-width:0!important;}
    html.hbh-rounded.hbh-social body {background:var(--hbh-page,#f5f6f8)!important;background-image:var(--hbh-background,none)!important;background-size:cover!important;background-position:center!important;background-attachment:fixed!important;}
    html.hbh-rounded.hbh-shell :is(#page-bbs-community,#page-topic-link)>.content>.list,
    html.hbh-rounded.hbh-shell :is(.hb-bbs-home,.bbs-home__content-list) {background:transparent!important;}
    html.hbh-shell body :is(.layout-normal>.content>.right,.layout-normal>.right,#page-bbs-community>.content>.right,#page-topic-link .topic-link__right,#page-topic-link .topic-link__content>.right) {display:none!important;}
    html.hbh-shell .layout-normal>.content {display:block!important;min-width:0!important;}
    html.hbh-shell .layout-normal>.content>:is(.list,.left),
    html.hbh-shell #page-topic-link .topic-link__main {width:100%!important;max-width:none!important;min-width:0!important;box-sizing:border-box!important;}
    html.hbh-shell #page-topic-link .topic-link__content {display:block!important;min-width:0!important;}
    /* Keep controls inside the content edge, separate from native scroll rails. */
    html.hbh-shell body :is(#page-bbs-community,#page-topic-link,#page-user-profile,#page-creator-content-management,#hbh-follow-feed) .hb-cpt__scroll-list {min-width:0;box-sizing:border-box!important;scrollbar-gutter:stable;padding-inline-end:16px!important;}
    html.hbh-shell body :is(.hb-cpt__bbs-list-content,.hb-cpt__moment-list-content) {padding-inline-end:20px!important;box-sizing:border-box!important;min-width:0!important;max-width:100%!important;}
    html.hbh-shell body :is(.bbs-list-content__header,.list-content__header) {min-width:0;gap:12px;}
    html.hbh-shell body :is(.list-cotent__operation-btn,.list-content__operation-btn,.hbh-post-local-more) {flex-shrink:0;margin-inline-end:8px!important;min-width:32px;min-height:32px;box-sizing:border-box;}
    html.hbh-shell body .hbh-post-local-more[data-hbh-floating] {right:24px!important;}
    html.hbh-shell body .bbs-new-style-bottom__actions {margin-inline-end:8px;gap:12px;flex-shrink:0;}
    html.hbh-shell body .bbs-new-style-bottom__action {min-height:32px;padding:4px;box-sizing:border-box;}
    /* Match the selected accent even when the older compact navbar is enabled. */
    html.hbh-rounded body :is(.publish-btn,[data-hbh-publish],.link-reply__menu-btn.hb-color__btn--confirm),
    html.hbh-rounded.hbh-social body :is(.publish-btn,[data-hbh-publish],.link-reply__menu-btn.hb-color__btn--confirm):is(:hover,:focus-visible,:active) {
      background:var(--hbh-accent,#2289ed)!important;background-image:none!important;color:var(--hbh-accent-ink,#fff)!important;border-color:var(--hbh-accent,#2289ed)!important;
    }
    html.hbh-embedded,html.hbh-embedded body {margin:0!important;padding:0!important;min-width:0!important;width:100%!important;background:var(--hbh-page,#f7f8f9)!important;color-scheme:light!important;}
    html.hbh-embedded {scrollbar-gutter:stable;}
    html.hbh-embedded body :is(.nav,.nav-content,[data-mask-frame]) {display:none!important;}
    html.hbh-embedded body :is(.hb-cpt-page-header,.topic-link__header) {top:0!important;}
    html.hbh-embedded body #app {min-width:0!important;min-height:100dvh!important;width:100%!important;padding:0!important;}
    html.hbh-embedded body #app>main {padding:0!important;min-height:100dvh!important;width:100%!important;max-width:none!important;}
    html.hbh-embedded.hbh-shell body :is(.layout-normal,#page-bbs-community,#page-topic-link,#page-user-profile,#page-creator-content-management,#page-creator-content-management-detail) {
      width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;padding:16px!important;box-sizing:border-box!important;
    }
    html.hbh-embedded.hbh-shell body #page-bbs-link {padding:0!important;}
    html.hbh-embedded.hbh-shell body #page-topic-link :is(.topic-link__content,.topic-link__main,.topic-link__panel) {width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;box-sizing:border-box!important;}
    html.hbh-embedded.hbh-shell body #page-topic-link .topic-link__content {display:block!important;grid-template-columns:minmax(0,1fr)!important;}
    html.hbh-embedded body #hbh-left-links {display:none!important;}
    html.hbh-embedded:has(#page-bbs-link .hb-bbs-link__content) {scrollbar-gutter:auto;overflow:hidden!important;}
    html.hbh-embedded:has(#page-bbs-link .hb-bbs-link__content) body {overflow:hidden!important;}
    @media(max-width:760px) {
      html.hbh-embedded:has(#page-bbs-link .hb-bbs-link__content),html.hbh-embedded:has(#page-bbs-link .hb-bbs-link__content) body {overflow-y:auto!important;}
      html.hbh-shell body :is(#page-bbs-community,#page-topic-link,#page-user-profile,#page-creator-content-management,#hbh-follow-feed) .hb-cpt__scroll-list {padding-inline-end:10px!important;}
    }
  `;
  root.append(style);
  let changed = false;
  const apply = enabled => {
    const active = embedded || !!enabled;
    if (root.classList.contains('hbh-shell') !== active) root.classList.toggle('hbh-shell', active);
  };
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.workspace) {changed = true;apply(changes.workspace.newValue);}
  });
  chrome.storage.local.get('workspace').then(saved => {if (!changed) apply(saved.workspace);}).catch(() => apply(false));
})();
