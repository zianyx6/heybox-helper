(() => {
  if (window.top !== window && !document.documentElement.classList.contains('hbh-embedded') && new URL(location.href).searchParams.get('hbh_embed') !== '1') return;
  if (document.getElementById('hbh-rounded-theme')) return;
  const root = document.documentElement;
  const defaults = { enabled: true, radius: 20, density: 'comfortable', motion:true, preset:'blue', accent:'#2289ed', pageColor:'#f5f6f8', backgroundOpacity:.2 };
  const palettes = {
    blue: {accent:'#2289ed',pageColor:'#f5f6f8'},
    pink: {accent:'#cf477f',pageColor:'#fff3f7'},
    mint: {accent:'#087e6c',pageColor:'#eef6f2'},
    violet: {accent:'#7955c5',pageColor:'#f4f0fa'},
    sand: {accent:'#aa652d',pageColor:'#f8f3eb'}
  };
  const style = document.createElement('style');
  style.id = 'hbh-rounded-theme';
  style.textContent = `
    html.hbh-rounded body { background:var(--hbh-page)!important; background-image:var(--hbh-background,none)!important; background-size:cover!important; background-position:center!important; background-attachment:fixed!important; color:var(--hbh-ink); font-family:'Segoe UI','PingFang SC','Microsoft YaHei',system-ui,sans-serif; }
    html.hbh-rounded .nav { background:var(--hbh-surface)!important; border-bottom:1px solid var(--hbh-line)!important; box-shadow:none!important; }
    html.hbh-rounded .nav-content { background:var(--hbh-surface)!important; box-shadow:none!important; }
    html.hbh-rounded .nav-links { display:flex; align-items:center!important; gap:6px; }
    html.hbh-rounded .nav-link { height:auto!important; min-height:36px; line-height:1.4!important; border-radius:999px!important; padding:9px 17px!important; }
    html.hbh-rounded .nav-link:hover { background:var(--hbh-input)!important; }
    html.hbh-rounded .nav-links .nav-link--active { box-shadow:none!important; background:var(--hbh-accent-soft)!important; color:var(--hbh-accent-text)!important; }
    html.hbh-rounded .publish-btn { border-radius:999px!important; background:var(--hbh-accent)!important; color:var(--hbh-accent-ink)!important; border:0!important; padding:10px 22px!important; }
    html.hbh-rounded [data-hbh-top] { background:var(--hbh-surface)!important; border-color:var(--hbh-line)!important; backdrop-filter:none!important; }
    html.hbh-rounded [data-hbh-nav]:hover { background:var(--hbh-input)!important; color:var(--hbh-ink)!important; }
    html.hbh-rounded [data-hbh-nav][data-hbh-active] { background:var(--hbh-accent-soft)!important; color:var(--hbh-accent-text)!important; box-shadow:none!important; }
    html.hbh-rounded [data-hbh-publish]:hover { background:var(--hbh-accent)!important; color:var(--hbh-accent-ink)!important; }
    html.hbh-rounded [data-hbh-trends] { background:var(--hbh-surface)!important; border-color:var(--hbh-line)!important; }
    html.hbh-rounded [data-hbh-top] :is(a,button):focus-visible { outline-color:var(--hbh-accent)!important; }
    html.hbh-rounded :is(#page-bbs-community,#page-topic-link) { background:transparent!important; }
    html.hbh-rounded :is(.bbs-home__content-list,.topic-link__list,#hbh-follow-feed) { background:transparent!important; }
    html.hbh-rounded :is(.bbs-home__content-item,.topic-link__item,.user-profile-moment-item,.content-management-home__content) {
      background:var(--hbh-surface)!important; border:1px solid var(--hbh-line)!important; border-radius:var(--hbh-radius)!important; margin-bottom:var(--hbh-card-gap)!important; padding:var(--hbh-card-pad)!important; box-sizing:border-box!important; box-shadow:0 2px 8px rgba(30,50,75,.025); min-width:0;
    }
    html.hbh-rounded :is(.hb-cpt__bbs-list-content,.hb-cpt__moment-list-content) { width:100%!important; min-width:0; }
    html.hbh-rounded :is(.hb-bbs-home__feed-splitline,.topic-link__splitline)::after { display:none!important; }
    /* Native search is an Element Plus input inside search-input-wrap; only the innermost shell draws the border. */
    html.hbh-rounded .search-input-wrap { min-width:0; max-width:100%; background:transparent!important; border:0!important; box-shadow:none!important; }
    html.hbh-rounded .search-input { width:100%!important; min-width:0; height:44px!important; }
    html.hbh-rounded .search-input .el-input__wrapper {
      min-width:0; min-height:44px; padding:8px 16px!important; box-sizing:border-box!important; border:1px solid var(--hbh-line)!important; border-radius:999px!important; background:var(--hbh-surface)!important; box-shadow:none!important;
    }
    html.hbh-rounded .search-input .el-input__wrapper:focus-within { border-color:var(--hbh-accent)!important; box-shadow:0 0 0 3px var(--hbh-accent-soft)!important; }
    html.hbh-rounded .search-input .el-input__inner { min-width:0; height:26px!important; padding:0!important; border:0!important; border-radius:0!important; background:transparent!important; color:var(--hbh-ink)!important; box-shadow:none!important; outline:0!important; font:inherit; }
    html.hbh-rounded .search-input :is(.el-input__suffix,.search-input__action) { color:var(--hbh-muted)!important; }
    html.hbh-rounded .search-input__action:hover { color:var(--hbh-accent-text)!important; }
    html.hbh-rounded .search-input .el-input__inner::placeholder { color:var(--hbh-muted)!important; opacity:.8; }
    html.hbh-rounded :is(.search-history,.search__pull-list,.el-popper.search-input-popper) { background:var(--hbh-surface)!important; border:1px solid var(--hbh-line)!important; border-radius:var(--hbh-radius)!important; box-shadow:0 8px 24px rgba(24,34,48,.08)!important; box-sizing:border-box; }
    html.hbh-rounded :is(.search-pull__history-item,.search-history__item,.suggestion__item) { border-radius:calc(var(--hbh-radius) * .6)!important; }
    html.hbh-rounded :is(.search-pull__history-item,.suggestion__item):hover { background:var(--hbh-input)!important; }
    html.hbh-rounded .user-follow__search { background:var(--hbh-surface)!important; border:1px solid var(--hbh-line)!important; border-radius:999px!important; box-shadow:none!important; }
    html.hbh-rounded .user-follow__search input { min-width:0; border:0!important; background:transparent!important; box-shadow:none!important; color:var(--hbh-ink)!important; }
    html.hbh-rounded .user-follow__search:focus-within { border-color:var(--hbh-accent)!important; box-shadow:0 0 0 3px var(--hbh-accent-soft)!important; }
    html.hbh-rounded :is(.bbs-home__topic-list-wrapper,.topic-link__panel,.user-profile-wrapper,.user-profile__content,.bbs-community-hot-topic) { background:var(--hbh-surface)!important; border-radius:var(--hbh-radius)!important; }
    html.hbh-rounded #hbh-left-links { background:var(--hbh-surface)!important; padding:14px 10px!important; border:1px solid var(--hbh-line); border-radius:var(--hbh-radius); box-sizing:border-box; scrollbar-width:thin; scrollbar-color:var(--hbh-line) transparent; }
    html.hbh-rounded #hbh-left-links>a { border-radius:999px!important; padding:11px 12px!important; margin-bottom:4px; font-size:14px; }
    html.hbh-rounded #hbh-left-links>a[aria-current="page"] { background:var(--hbh-accent-soft)!important; color:var(--hbh-accent-text)!important; }
    html.hbh-rounded #hbh-left-links>a:hover { background:var(--hbh-accent-soft)!important; color:var(--hbh-accent-text)!important; }
    html.hbh-rounded #hbh-community-search { border-radius:999px!important; background:var(--hbh-input)!important; border:1px solid var(--hbh-line)!important; padding:10px 11px!important; font-size:12px; box-sizing:border-box; min-width:0; max-width:100%; color:var(--hbh-ink)!important; }
    html.hbh-rounded #hbh-community-search:focus { outline:none!important; border-color:var(--hbh-accent)!important; box-shadow:0 0 0 3px var(--hbh-accent-soft)!important; background:var(--hbh-surface)!important; }
    html.hbh-rounded #hbh-community-list button { border-radius:calc(var(--hbh-radius) * .7)!important; padding:var(--hbh-nav-pad)!important; }
    html.hbh-rounded #hbh-community-list button:hover { background:var(--hbh-input)!important; }
    html.hbh-rounded #hbh-community-list img { border-radius:10px!important; }
    html.hbh-rounded #hbh-post-dialog { border-radius:calc(var(--hbh-radius) + 4px)!important; border:1px solid var(--hbh-line)!important; overflow:hidden; box-shadow:0 22px 80px rgba(24,34,48,.18)!important; }
    html.hbh-rounded #hbh-post-dialog .hbh-modal-bar { padding:12px 18px!important; border-color:var(--hbh-line)!important; }
    html.hbh-rounded #hbh-post-dialog button { border-radius:999px!important; background:var(--hbh-input); color:var(--hbh-ink); }
    html.hbh-rounded #hbh-post-dialog .hbh-modal-bar a { color:var(--hbh-accent-text)!important; }
    html.hbh-rounded #hbh-follow-feed>.hbh-feed-header { border:1px solid var(--hbh-line); border-radius:var(--hbh-radius); padding:16px 22px; background:var(--hbh-surface); margin-bottom:var(--hbh-card-gap); }
    html.hbh-rounded #hbh-follow-feed>button { border-radius:999px!important; background:var(--hbh-accent)!important; color:var(--hbh-accent-ink)!important; }
    html.hbh-rounded :is(.nav-link,.publish-btn,#hbh-community-list button):focus-visible { outline:2px solid var(--hbh-accent)!important; outline-offset:3px; }
    html.hbh-rounded .hb-bbs-link__content :is(.post__content,.image-text__content) img { border-radius:calc(var(--hbh-radius) * .6); }
    html.hbh-rounded .hb-bbs-link__content>.link-comment { background:var(--hbh-input); border-left-color:var(--hbh-line)!important; }
    html.hbh-rounded :is(.link-comment__reply,.link-reply__target) { border-radius:calc(var(--hbh-radius) * .65)!important; }
    @media(max-width:1000px) {
      html.hbh-rounded #hbh-left-links { display:block!important; margin:12px 16px!important; max-height:320px!important; width:auto!important; }
      html.hbh-rounded #hbh-left-links>a { display:inline-block; }
      html.hbh-rounded #hbh-community-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:4px; }
      html.hbh-rounded #hbh-community-list h3 { grid-column:1/-1; }
    }
    @media(prefers-reduced-motion:reduce) { html.hbh-rounded .nav-link { transition:none!important; } }
  `;
  root.append(style);
  let appearance = {}, backgroundImage = '';
  const changedKeys = new Set();
  const hex = (value, fallback) => /^#[0-9a-f]{6}$/i.test(value || '') ? value.toLowerCase() : fallback;
  const rgb = value => [1,3,5].map(i => parseInt(value.slice(i,i+2),16));
  const mix = (a,b,t) => '#' + rgb(a).map((n,i) => Math.round(n*(1-t)+rgb(b)[i]*t).toString(16).padStart(2,'0')).join('');
  const luminance = value => rgb(value).map(n => { const c=n/255; return c<=.04045 ? c/12.92 : ((c+.055)/1.055)**2.4; }).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
  function readableAccent(accent) {
    let result=accent;
    for(let i=0;i<16 && (luminance(result)+.05)/.05>4.5;i++) result=mix(result,'#000000',.12);
    return result;
  }
  function setProperty(key, value) {
    if (root.style.getPropertyValue(key) !== value) root.style.setProperty(key, value);
  }
  function apply(raw) {
    const settings = { ...defaults, ...raw };
    const palette = settings.preset === 'custom' ? settings : palettes[settings.preset] || palettes.blue;
    const accent = hex(palette.accent, defaults.accent), page = hex(palette.pageColor, defaults.pageColor);
    const surface = '#ffffff'; // Native cards use fixed dark text; keep their surfaces opaque and light.
    const vars = {
      '--hbh-page':page,'--hbh-surface':surface,'--hbh-ink':'#182230','--hbh-muted':'#64748b',
      '--hbh-accent':accent,'--hbh-accent-ink':luminance(accent)>.179 ? '#000000':'#ffffff',
      '--hbh-accent-text':readableAccent(accent),'--hbh-accent-soft':mix(accent,surface,.91),
      '--hbh-input':mix(accent,surface,.97),'--hbh-line':mix(accent,surface,.86)
    };
    Object.entries(vars).forEach(([key,value])=>setProperty(key,value));
    const opacity = Number.isFinite(Number(settings.backgroundOpacity)) ? Math.max(0,Math.min(1,Number(settings.backgroundOpacity))) : .2;
    const validImage = typeof backgroundImage === 'string' && backgroundImage.length <= 1600000 && /^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(backgroundImage);
    const overlay = `rgba(${rgb(page).join(',')},${1-opacity})`;
    setProperty('--hbh-background', validImage && window.top === window ? `linear-gradient(${overlay},${overlay}),url("${backgroundImage}")` : 'none');
    const radius = [12,20,28].includes(Number(settings.radius)) ? Number(settings.radius) : 20;
    const enabled = settings.enabled !== false;
    if (root.classList.contains('hbh-rounded') !== enabled) root.classList.toggle('hbh-rounded', enabled);
    setProperty('--hbh-radius', `${radius}px`);
    setProperty('--hbh-card-gap', settings.density === 'compact' ? '8px' : '14px');
    setProperty('--hbh-card-pad', settings.density === 'compact' ? '14px 18px' : '20px 24px');
    setProperty('--hbh-nav-pad', settings.density === 'compact' ? '7px 9px' : '10px');
  }
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || (!changes.appearance && !changes.backgroundImage)) return;
    if(changes.appearance) { changedKeys.add('appearance'); appearance=changes.appearance.newValue || {}; }
    if(changes.backgroundImage) { changedKeys.add('backgroundImage'); backgroundImage=changes.backgroundImage.newValue || ''; }
    apply(appearance);
  });
  chrome.storage.local.get(['appearance','backgroundImage']).then(saved => {
    if(!changedKeys.has('appearance'))appearance=saved.appearance || {};
    if(!changedKeys.has('backgroundImage'))backgroundImage=saved.backgroundImage || '';
    apply(appearance);
  }).catch(()=>apply(appearance));
})();
