(() => {
 const style=document.createElement('style');
 style.textContent=`
 html.hbh-social body{background:#fff!important;color:#0f1419}
 html.hbh-social [data-hbh-top]{background:rgba(255,255,255,.94)!important;border-bottom:1px solid #eff3f4!important;box-shadow:none!important;backdrop-filter:blur(16px)}
 html.hbh-social [data-hbh-nav]{border-radius:999px!important;padding:10px 16px!important;transition:background .15s;color:#536471!important;font-weight:500!important;text-decoration:none!important}
 html.hbh-social [data-hbh-nav]:hover{background:#eff3f4!important;color:#0f1419!important}
 html.hbh-social [data-hbh-nav][data-hbh-active]{color:#0f1419!important;font-weight:750!important;box-shadow:inset 0 -3px #1d9bf0}
 html.hbh-social [data-hbh-publish]{background:#1d9bf0!important;color:white!important;border:0!important;border-radius:999px!important;padding:10px 24px!important;font-weight:700!important;box-shadow:none!important}
 html.hbh-social [data-hbh-publish]:hover{background:#1a8cd8!important}
 html.hbh-social [data-hbh-trends]{border:1px solid #eff3f4!important;border-radius:20px!important;overflow:hidden;background:#f7f9f9!important;box-shadow:none!important}
 html.hbh-social [data-hbh-trends] :is(button,a){border-radius:999px!important}
 html.hbh-social [data-hbh-trends] :is(button,a):hover{filter:brightness(.96)}
 html.hbh-social [data-hbh-top] :is(a,button):focus-visible{outline:2px solid #1d9bf0!important;outline-offset:3px}
 @media(prefers-reduced-motion:reduce){html.hbh-social [data-hbh-nav]{transition:none}}
 `;
 document.documentElement.append(style);
 let enabled=false;
 const navLabels=new Set(['首页','社区','小黑盒加速器','黑盒语音','黑盒工坊','开放平台','加入我们']);
 function mark(){
  if(!enabled)return;
  const candidates=[...document.querySelectorAll('.nav-links .nav-link, .nav-actions .publish-btn')];
  for(const el of candidates){const text=el.textContent.trim();
   if(navLabels.has(text) && el.getBoundingClientRect().top<140){
    el.setAttribute('data-hbh-nav','');
    if(text==='社区' && location.pathname.startsWith('/app/bbs'))el.setAttribute('data-hbh-active','');
    else el.removeAttribute('data-hbh-active');
    let parent=el.parentElement;
    for(let i=0;parent && i<5;i++,parent=parent.parentElement){const r=parent.getBoundingClientRect();if(r.width>innerWidth*.75 && r.height>=40 && r.height<=120 && r.top<100){parent.setAttribute('data-hbh-top','');break;}}
   }
   if(text==='发布内容' && el.getBoundingClientRect().top<140)el.setAttribute('data-hbh-publish','');
  }
  for(const el of document.querySelectorAll('.hot-topic__name')){
   if(el.childElementCount>1 || el.textContent.trim()!=='热门社区')continue;
   let p=el.parentElement;
   for(let i=0;p && i<5;i++,p=p.parentElement){const r=p.getBoundingClientRect();if(r.width>=200 && r.width<=450 && r.height>180 && r.height<850 && p.textContent.includes('查看')){p.setAttribute('data-hbh-trends','');break;}}
  }
 }
 let pending=false;
 const observer=new MutationObserver(()=>{if(!enabled || pending)return;pending=true;setTimeout(()=>{pending=false;mark();},300);});
 observer.observe(document.body,{childList:true,subtree:true});
 let changed=false;
 const apply=value=>{enabled=!!value;document.documentElement.classList.toggle('hbh-social',enabled);mark();};
 chrome.storage.onChanged.addListener((c,area)=>{if(area==='local' && c.social){changed=true;apply(c.social.newValue);}});
 chrome.storage.local.get('social').then(({social})=>{if(!changed)apply(social);});
})();
