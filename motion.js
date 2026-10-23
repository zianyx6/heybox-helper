(() => {
  'use strict';
  if (window.top !== window && !document.documentElement.classList.contains('hbh-embedded') && new URL(location.href).searchParams.get('hbh_embed') !== '1') return;
  if (document.getElementById('hbh-motion-style')) return;
  const root = document.documentElement;
  const style = document.createElement('style');
  style.id = 'hbh-motion-style';
  style.textContent = `
    html.hbh-motion :is(.nav-link,.publish-btn,.hbh-message-entry,#hbh-left-links>a,#hbh-community-list button,.hbh-post-local-more,.list-cotent__operation-btn,.list-content__operation-btn,#hbh-follow-feed>button,#hbh-post-dialog .hbh-modal-bar button) {
      transition:background-color 150ms ease,color 150ms ease,border-color 150ms ease,box-shadow 150ms ease,transform 150ms cubic-bezier(.2,.8,.2,1)!important;
    }
    html.hbh-motion :is(.bbs-home__content-item,.topic-link__item,.comment-message-item,.follow-message-item) {
      transition:border-color 150ms ease,box-shadow 150ms ease,background-color 150ms ease!important;
    }
    html.hbh-motion :is(.bbs-community__search-module .search,.search-wrapper .search,.message-center__search,#hbh-community-search) {
      transition:border-color 150ms ease,box-shadow 150ms ease,background-color 150ms ease!important;
    }
    html.hbh-motion :is(.publish-btn,#hbh-follow-feed>button,#hbh-post-dialog .hbh-modal-bar button,.hbh-post-local-more):active {
      transform:scale(.975);
    }
    @media(hover:hover) and (pointer:fine) {
      html.hbh-motion :is(.publish-btn,#hbh-follow-feed>button):hover { transform:translateY(-1px); }
      html.hbh-motion.hbh-rounded :is(.bbs-home__content-item,.topic-link__item):hover {border-color:var(--hbh-accent-soft,#dcecff)!important;box-shadow:0 4px 14px rgba(30,50,75,.045);}
    }
    html:not(.hbh-motion) :is(.nav-link,.publish-btn,.hbh-message-entry,#hbh-left-links>a,#hbh-community-list button,.hbh-post-local-more,.list-cotent__operation-btn,.list-content__operation-btn,#hbh-follow-feed>button,#hbh-post-dialog .hbh-modal-bar button,.bbs-home__content-item,.topic-link__item,.comment-message-item,.follow-message-item,.bbs-community__search-module .search,.search-wrapper .search,.message-center__search,#hbh-community-search) {transition:none!important;}
    @media(prefers-reduced-motion:reduce) {
      html.hbh-motion :is(.nav-link,.publish-btn,.hbh-message-entry,#hbh-left-links>a,#hbh-community-list button,.hbh-post-local-more,.list-cotent__operation-btn,.list-content__operation-btn,#hbh-follow-feed>button,#hbh-post-dialog .hbh-modal-bar button,.bbs-home__content-item,.topic-link__item,.comment-message-item,.follow-message-item,.bbs-community__search-module .search,.search-wrapper .search,.message-center__search,#hbh-community-search) {transition:none!important;transform:none!important;}
    }
  `;
  root.append(style);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motion = true, changed = false;
  function apply() {
    const enabled = motion && !reduced.matches;
    if (root.classList.contains('hbh-motion') !== enabled) root.classList.toggle('hbh-motion', enabled);
    const duration = enabled ? '150ms' : '0ms';
    if (root.style.getPropertyValue('--hbh-motion-duration') !== duration) root.style.setProperty('--hbh-motion-duration', duration);
  }
  reduced.addEventListener('change', apply);
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes.appearance) return;
    changed = true; motion = changes.appearance.newValue?.motion !== false; apply();
  });
  chrome.storage.local.get('appearance').then(({appearance}) => { if (!changed) { motion = appearance?.motion !== false; apply(); } }).catch(apply);
})();
