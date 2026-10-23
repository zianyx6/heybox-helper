(() => {
 'use strict';
 if(window.top!==window&&!document.documentElement.classList.contains('hbh-embedded'))return;
 if(document.getElementById('hbh-game-style'))return;
 const root=document.documentElement,style=document.createElement('style');style.id='hbh-game-style';
 style.textContent=`
 html.hbh-game-view body #page-topic-link{width:min(1120px,calc(100vw - 40px))!important;max-width:none!important;margin:24px auto!important;padding:0!important;box-sizing:border-box!important}
 html.hbh-game-view #page-topic-link .topic-link__content{display:grid!important;grid-template-columns:minmax(0,1fr) 260px;gap:20px;width:100%!important}
 html.hbh-game-view #page-topic-link .topic-link__main{width:100%!important;max-width:none!important;min-width:0!important}
 html.hbh-game-view #page-topic-link .topic-link__right{width:100%!important;min-width:0!important}
 html.hbh-game-view.hbh-workspace body #page-topic-link{--hbh-game-width:min(1000px,calc(100vw - 280px));width:var(--hbh-game-width)!important;max-width:var(--hbh-game-width)!important;padding-left:200px!important;box-sizing:content-box!important}
 html.hbh-game-view.hbh-workspace #page-topic-link .topic-link__content{display:block!important}
 html.hbh-game-view.hbh-workspace #page-topic-link .topic-link__right{display:none!important}
 html.hbh-game-view.hbh-workspace #hbh-left-links{left:max(16px,calc((100vw - min(1000px,100vw - 280px)) / 2 - 100px))!important}
 html.hbh-game-view .topic-link__panel{background:transparent!important}
 html.hbh-game-view .topic-link__header{border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:var(--hbh-radius,20px)!important;background:var(--hbh-surface,#fff)!important;padding:8px 16px!important;margin-bottom:14px!important}
 html.hbh-game-view #page-game-detail{display:flex;flex-direction:column;gap:16px;background:transparent!important;min-width:0}
 html.hbh-game-view #page-game-detail> :is(.game-detail-section-medias,.game-detail-section-data,.game-detail-section-score,.game-detail-section-similar-games,.game-detail-section-comment){border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:var(--hbh-radius,20px)!important;background:var(--hbh-surface,#fff)!important;padding:20px!important;margin:0!important;min-width:0;box-sizing:border-box;overflow-wrap:anywhere}
 html.hbh-game-view .game-detail-section-medias :is(video,img){max-width:100%!important;max-height:420px!important;object-fit:contain!important;border-radius:12px}
 html.hbh-game-view .game-detail-section-medias{overflow:hidden}
 html.hbh-game-view .game-name{font-size:24px!important;line-height:1.4!important;font-weight:700;overflow-wrap:anywhere}
 html.hbh-game-view :is(.game-info,.game-data,.game-awards,.about-game){min-width:0;max-width:100%;box-sizing:border-box}
 html.hbh-game-view .game-info{font-size:14px;line-height:1.85}
 html.hbh-game-view :is(.tags,.data-list,.follow-score-wrapper,.awards-inner){flex-wrap:wrap!important;gap:8px}
 html.hbh-game-view :is(.section-title,.game-detail-section-score .score-type-tab){color:var(--hbh-ink,#182230)}
 html.hbh-game-view .game-detail-game-card{border-radius:14px!important;min-width:0;max-width:100%}
 html.hbh-game-view .game-detail-comment-item{border-bottom:1px solid var(--hbh-line,#e8edf2)!important;padding-block:16px!important}
 html.hbh-game-view .game-detail-section-footer{position:sticky!important;height:auto!important;min-height:64px;inset:auto!important;bottom:12px!important;width:100%!important;min-width:0;display:flex;align-items:center;gap:12px;flex-wrap:wrap;border:1px solid var(--hbh-line,#e8edf2)!important;border-radius:var(--hbh-radius,20px)!important;background:var(--hbh-surface,#fff)!important;padding:14px 18px!important;box-shadow:0 6px 24px #1822300d;box-sizing:border-box;z-index:15}
 html.hbh-game-view .game-detail-section-footer :is(.follow-wrapper,.btn-wrapper){display:flex;flex-wrap:wrap;gap:8px;min-width:0;max-width:100%}
 html.hbh-game-view .game-detail-section-footer :is(button,.btn){border-radius:999px!important;max-width:100%;box-sizing:border-box}
 html.hbh-game-view .game-detail-section-footer .btn-wrapper{flex:1;min-height:42px}
 html.hbh-game-view .game-detail-section-footer .btn-wrapper>*{min-height:42px!important;display:flex;align-items:center;justify-content:center;line-height:1.4!important;padding:8px 16px!important;border-radius:999px!important;box-sizing:border-box}
 html.hbh-game-view .game-detail-section-footer .cost{font-weight:700;font-variant-numeric:tabular-nums}
 @media(max-width:1000px){html.hbh-game-view.hbh-workspace body #page-topic-link,html.hbh-game-view body #page-topic-link{width:calc(100vw - 32px)!important;max-width:none!important;padding-left:0!important;box-sizing:border-box!important}html.hbh-game-view #page-topic-link .topic-link__content{display:block!important}html.hbh-game-view #page-topic-link .topic-link__right{margin-top:16px}}
 @media(max-width:600px){html.hbh-game-view #page-game-detail> :is(.game-detail-section-medias,.game-detail-section-data,.game-detail-section-score,.game-detail-section-similar-games,.game-detail-section-comment){padding:14px!important}html.hbh-game-view .game-name{font-size:20px!important}html.hbh-game-view .game-detail-section-footer{position:relative!important;bottom:auto!important;padding:12px!important}html.hbh-game-view .game-detail-section-medias :is(video,img){max-height:260px!important}}
 `;root.append(style);
 function update(){const game=/^\/app\/topic\/game\//.test(location.pathname)||!!document.getElementById('page-game-detail');const enabled=game&&(root.classList.contains('hbh-rounded')||root.classList.contains('hbh-workspace')||root.classList.contains('hbh-embedded'));if(root.classList.contains('hbh-game-view')!==enabled)root.classList.toggle('hbh-game-view',enabled);}
 let pending=false;const schedule=()=>{if(pending)return;pending=true;setTimeout(()=>{pending=false;update();},100);};
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});new MutationObserver(update).observe(root,{attributes:true,attributeFilter:['class']});window.addEventListener('popstate',update);update();
})();
