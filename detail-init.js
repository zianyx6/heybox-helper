(() => {
  if (document.getElementById('hbh-detail-style')) return;
  const embed = window.top !== window && (document.documentElement.classList.contains('hbh-embedded') || new URL(location.href).searchParams.get('hbh_embed') === '1');
  if (embed) document.documentElement.classList.add('hbh-detail', 'hbh-detail-embed');
  const style = document.createElement('style');
  style.id = 'hbh-detail-style';
  style.textContent = `
    html.hbh-detail #page-bbs-link { width:min(1180px,calc(100vw - 40px))!important;max-width:none!important;margin:22px auto!important;padding:0!important;box-sizing:border-box!important; }
    html.hbh-detail #page-bbs-link > .right,
    html.hbh-detail #page-bbs-link > .content > .right,
    html.hbh-detail #page-bbs-link .bbs-link__related-recommend { display:none!important; }
    html.hbh-detail #page-bbs-link > .left,
    html.hbh-detail #page-bbs-link > .content,
    html.hbh-detail #page-bbs-link > .content > .left,
    html.hbh-detail #page-bbs-link > .content > .list { width:100%!important;max-width:none!important;margin:0!important;padding:0!important; }
    html.hbh-detail #page-bbs-link > .content { display:block!important; }
    html.hbh-detail #page-bbs-link [data-mask-frame] { display:none!important; }
    html.hbh-detail .hb-bbs-link { width:100%!important;max-width:none!important;margin:0!important;background:var(--hbh-surface,#fff);border:1px solid var(--hbh-line,#eff3f4);border-radius:var(--hbh-radius,20px);overflow:hidden;box-sizing:border-box; }
    html.hbh-detail .hb-bbs-link__header { display:none!important; }
    html.hbh-detail .hb-bbs-link__container { height:auto!important;max-height:none!important;overflow:visible!important;padding:0!important;min-width:0!important; }
    html.hbh-detail .hb-bbs-link__container > .scroll-list__content-container { width:100%!important;min-width:0!important;height:auto!important;max-height:none!important;overflow:visible!important; }
    html.hbh-detail .hb-bbs-link__content { display:grid!important;grid-template-columns:minmax(0,1.15fr) minmax(320px,1fr);gap:0!important;max-width:none!important;width:100%!important;height:calc(100dvh - 150px)!important;min-height:380px;overflow:hidden!important;padding:0!important;box-sizing:border-box!important; }
    html.hbh-detail .hb-bbs-link__content > :not(.link-comment) { min-width:0!important;max-width:100%!important;min-height:0;overflow-y:auto!important;overflow-x:hidden!important;max-height:100%;padding:20px 24px 24px 20px!important;box-sizing:border-box!important;scrollbar-gutter:stable;overscroll-behavior:contain;overflow-wrap:anywhere; }
    html.hbh-detail .hb-bbs-link__content > .link-comment { display:flex!important;flex-direction:column;min-height:0;min-width:0;overflow:hidden!important;max-height:100%;padding:0!important;border-left:1px solid var(--hbh-line,#eff3f4);box-sizing:border-box; }
    /* Native sticky top:52px belongs to its single-column page, not this split pane. */
    html.hbh-detail .link-comment > .comment__comment-header { position:relative!important;inset:auto!important;transform:none!important;flex:0 0 auto;width:100%;margin:0!important;padding:16px 22px 8px 18px;box-sizing:border-box;z-index:1;background:var(--hbh-surface,#fff); }
    html.hbh-detail .link-comment > .link-comment__list { position:relative;flex:1 1 0;min-height:0;min-width:0;width:100%;overflow-y:auto!important;overflow-x:hidden!important;margin:0!important;padding:8px 22px 16px 16px!important;box-sizing:border-box!important;scrollbar-gutter:stable;overscroll-behavior:contain;scroll-padding-block:12px; }
    html.hbh-detail .link-comment__list > .link-comment__comment-item { min-width:0;max-width:100%;box-sizing:border-box; }
    html.hbh-detail .link-comment > .hb-bbs-link__reply-target { position:relative!important;inset:auto!important;width:100%!important;flex:none;margin:0!important;padding:12px 16px!important;border-top:1px solid var(--hbh-line,#eff3f4);background:var(--hbh-surface,#fff)!important;box-sizing:border-box;z-index:5; }
    html.hbh-detail .link-comment__reply { position:relative!important;inset:auto!important;width:100%!important;box-sizing:border-box; }
    html.hbh-detail .link-reply__main-box { min-width:0; }
    html.hbh-detail .link-reply__input-wrapper { width:100%!important;box-sizing:border-box;padding:10px 12px!important;background:var(--hbh-input,#f5f6f8);border-radius:14px!important; }
    html.hbh-detail .link-reply__editor { min-height:38px;max-height:130px!important;overflow-y:auto!important;font-size:14px;line-height:1.6; }
    html.hbh-detail .link-reply__menu-box { display:flex!important;align-items:center;gap:8px;flex-wrap:wrap;width:100%;height:auto!important;min-height:42px;padding-top:8px!important;margin:0!important;box-sizing:border-box; }
    html.hbh-detail .link-reply__menu-btn { border-radius:999px!important;width:auto!important;height:auto!important;min-height:34px;padding:7px 18px!important;line-height:20px!important;box-sizing:border-box; }
    html.hbh-detail .link-reply__menu-btn.hb-color__btn--confirm { margin-left:auto!important;order:10;background:var(--hbh-accent,#2289ed)!important;color:var(--hbh-accent-ink,#fff)!important; }
    html.hbh-detail .link-reply__menu-btn.hb-color__btn--cancel { order:9; }
    html.hbh-detail .hbh-composer-identity { display:flex;align-items:center;gap:8px;margin:0 0 8px;font:12px/1.4 system-ui;color:var(--hbh-muted,#536471); }
    html.hbh-detail .hbh-composer-identity img { width:24px;height:24px;border-radius:50%;object-fit:cover; }
    html.hbh-detail .comment-item-header__avatar { flex-shrink:0!important;opacity:1;visibility:visible; }
    html.hbh-detail img.hbh-self-avatar { display:block!important;width:34px!important;height:34px!important;border-radius:50%;object-fit:cover; }
    html.hbh-detail .hb-bbs-link__content img,html.hbh-detail .hb-bbs-link__content video { max-width:100%!important;object-fit:contain; }
    html.hbh-detail .hb-bbs-link__content .image-text__header-image,html.hbh-detail .hb-bbs-link__content .header-image__container { min-width:0;max-width:100%!important; }
    html.hbh-detail .hb-bbs-image-text::after { left:0!important;width:100%!important; }
    html.hbh-detail .hb-bbs-link__content pre { max-width:100%;overflow-x:auto; }
    html.hbh-detail .hb-bbs-link__content p { font-size:14px;line-height:1.7; }
    html.hbh-workspace #page-creator-content-management-detail > .content > .right,
    html.hbh-workspace #page-creator-content-management-detail > .right { display:none!important; }
    html.hbh-workspace #page-creator-content-management-detail.layout-normal { width:min(760px,calc(100vw - 248px))!important;max-width:none!important;padding-left:200px!important;box-sizing:content-box!important;margin-inline:auto!important; }
    html.hbh-workspace #page-creator-content-management-detail > .content { display:block!important;width:100%!important; }
    html.hbh-workspace #page-creator-content-management-detail > .content > .list { width:100%!important;max-width:none!important;flex:none!important; }
    html.hbh-detail-embed,html.hbh-detail-embed body { background:var(--hbh-surface,#fff)!important;color-scheme:light!important; }
    html.hbh-detail-embed .nav-content,html.hbh-detail-embed [data-mask-frame] { display:none!important; }
    html.hbh-detail-embed #page-bbs-link { width:100%!important;margin:0!important; }
    html.hbh-detail-embed .hb-bbs-link { border:0;border-radius:0; }
    html.hbh-detail-embed .hb-bbs-link__content { height:100dvh!important;min-height:0; }
    html.hbh-detail-embed:has(#page-bbs-link .hb-bbs-link__content),html.hbh-detail-embed:has(#page-bbs-link .hb-bbs-link__content) body { overflow:hidden!important; }
    @media(max-width:1000px) { html.hbh-workspace #page-creator-content-management-detail.layout-normal { width:calc(100vw - 32px)!important;padding-left:0!important; } }
    @media(max-width:760px) {
      html.hbh-detail #page-bbs-link { width:calc(100vw - 24px)!important; }
      html.hbh-detail .hb-bbs-link__content { display:block!important;height:auto!important;min-height:0;overflow:visible!important; }
      html.hbh-detail .hb-bbs-link__content > :not(.link-comment) { max-height:none;overflow-y:visible!important; }
      html.hbh-detail .hb-bbs-link__content > .link-comment { height:min(650px,80dvh);border-left:0;border-top:1px solid var(--hbh-line,#eff3f4); }
      html.hbh-detail-embed #page-bbs-link { width:100%!important; }
      html.hbh-detail-embed .hb-bbs-link__content { height:auto!important; }
      html.hbh-detail-embed:has(#page-bbs-link .hb-bbs-link__content),html.hbh-detail-embed:has(#page-bbs-link .hb-bbs-link__content) body { overflow-y:auto!important; }
    }
  `;
  (document.head || document.documentElement).append(style);
})();
