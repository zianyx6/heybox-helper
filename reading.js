(() => {
 const defaults = {enabled:false,fontSize:17,lineHeight:1.85,width:1000,top:true};
 const style = document.createElement('style');
 style.id='heybox-helper-reading-style';
 const host=document.createElement('div');
 const shadow=host.attachShadow({mode:'closed'});
 shadow.innerHTML='<style>:host{all:initial;position:fixed;right:24px;bottom:28px;z-index:2147483646}button{font:14px system-ui;background:#26384d;color:white;border:0;border-radius:24px;padding:12px 16px;cursor:pointer;box-shadow:0 3px 14px #0003}button:focus-visible{outline:3px solid #609aff}</style><button type="button" aria-label="回到页面顶部">↑ 顶部</button>';
 shadow.querySelector('button').onclick=()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 let revision=0;
 function apply(raw) {
  const s={...defaults,...raw};
  const size=Math.min(22,Math.max(14,Number(s.fontSize)||17));
  const line=Math.min(2.2,Math.max(1.4,Number(s.lineHeight)||1.85));
  const width=Math.min(1400,Math.max(720,Number(s.width)||1000));
  style.textContent=s.enabled ? `
    main, [role="main"] {max-width:${width}px !important;margin-inline:auto !important;}
    :is(article, main, [role="main"]) :is(p, blockquote, li) {font-size:${size}px !important;line-height:${line} !important;overflow-wrap:break-word;}
    article img {max-width:100%;height:auto;}
    @media(min-width:1001px) {
      html.hbh-workspace {--hbh-reading-width:min(${width}px, calc(100vw - 320px));}
      html.hbh-workspace body :is(#page-bbs-community,#page-topic-link) {width:var(--hbh-reading-width)!important;max-width:var(--hbh-reading-width)!important;}
      html.hbh-workspace body :is(#page-bbs-community>.content>.list,#page-topic-link .topic-link__main) {width:100%!important;max-width:none!important;}
      html.hbh-workspace body #hbh-left-links {left:max(16px, calc((100vw - var(--hbh-reading-width)) / 2 - 100px))!important;}
    }
  ` : '';

  if(!style.isConnected)document.documentElement.append(style);
  if(s.enabled && s.top){if(!host.isConnected)document.documentElement.append(host);}else host.remove();
 }
 chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local' && changes.reading){revision++;apply(changes.reading.newValue);}});
 const initial=revision;
 chrome.storage.local.get('reading').then(({reading})=>{if(initial===revision)apply(reading);});
})();
