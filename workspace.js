(() => {
 if(window.top!==window)return;
 const style=document.createElement('style');style.textContent=`
 html.hbh-workspace :is(#page-user-profile,#page-creator-content-management).layout-normal>.content>.right{display:none!important}html.hbh-workspace :is(#page-user-profile,#page-creator-content-management).layout-normal{width:min(760px,calc(100vw - 248px))!important;padding-left:200px!important;box-sizing:content-box!important;max-width:none!important;margin-inline:auto!important}html.hbh-workspace :is(#page-user-profile,#page-creator-content-management).layout-normal>.content{display:block!important;width:100%!important}html.hbh-workspace :is(#page-user-profile,#page-creator-content-management).layout-normal>.content>.list{width:100%!important;max-width:none!important;flex:none!important}

 html.hbh-workspace #page-topic-link .topic-link__right{display:none!important}html.hbh-workspace #page-topic-link .topic-link__content{display:block!important;width:100%!important;max-width:none!important}html.hbh-workspace #page-topic-link .topic-link__main{flex:none!important;width:100%!important;max-width:none!important;min-width:0!important}#hbh-post-dialog{background:#fff!important;color-scheme:light!important;animation:none!important;transition:none!important}#hbh-post-dialog::backdrop{background:rgba(15,20,25,.18)!important;animation:none!important;transition:none!important}#hbh-post-dialog iframe{background:#fff!important;color-scheme:light!important}

 html.hbh-workspace #page-topic-link{width:760px!important;max-width:calc(100vw - 240px)!important;margin:20px auto!important;padding-left:200px!important;box-sizing:content-box!important}html.hbh-workspace #page-topic-link .topic-link__main{width:100%!important;max-width:760px!important}html.hbh-workspace #page-topic-link .topic-link__content>.right{display:none!important}#hbh-search-results a{font-size:13px!important}#hbh-search-results p{font:12px/1.6 system-ui;color:#536471;padding:8px}#hbh-post-dialog iframe{visibility:hidden}#hbh-post-dialog[data-ready] iframe{visibility:visible}#hbh-post-dialog:not([data-ready])::after{content:"正在加载帖子…";position:absolute;top:80px;left:32px;font:14px system-ui;color:#536471}@media(max-width:1000px){html.hbh-workspace #page-topic-link{width:auto!important;max-width:calc(100vw - 32px)!important;padding-left:0!important}}

 #hbh-post-dialog{position:fixed!important;inset:0!important;margin:auto!important;max-width:94vw!important;max-height:90vh!important;box-sizing:border-box!important} html.hbh-workspace #page-bbs-community .bbs-home__topic-list-wrapper{display:none!important} #hbh-left-links{max-height:calc(100vh - 120px);overflow-y:auto;overflow-x:hidden;background:#fff}#hbh-community-search{box-sizing:border-box;width:100%;padding:9px 12px;border:1px solid #eff3f4;border-radius:20px;margin:12px 0;font:13px system-ui}#hbh-community-list button{display:flex;align-items:center;gap:9px;width:100%;border:0;background:transparent;padding:10px;border-radius:22px;text-align:left;cursor:pointer;font:13px system-ui;color:#0f1419}#hbh-community-list button[hidden]{display:none!important}#hbh-community-list button:hover{background:#eff3f4}#hbh-community-list img{width:28px;height:28px;border-radius:8px;object-fit:cover}#hbh-community-list h3{font:600 13px system-ui;color:#536471;margin:12px 10px}
 html.hbh-workspace [data-hbh-remove-nav]{display:none!important}
 html.hbh-workspace #page-bbs-community>.content>.right{display:none!important}
 html.hbh-workspace #page-bbs-community{max-width:760px!important;margin:20px auto!important;padding-left:200px!important;box-sizing:content-box!important}
 html.hbh-workspace #page-bbs-community>.content>.list{width:100%!important;max-width:760px!important}
 html.hbh-workspace #page-bbs-community .bbs-home__topic-list-wrapper{position:fixed!important;left:max(20px,calc(50vw - 530px))!important;top:180px!important;width:175px!important;max-height:calc(100vh - 200px)!important;overflow-x:hidden!important;overflow-y:auto!important;background:white!important;border:1px solid #eff3f4!important;border-radius:16px!important;z-index:30;padding:12px!important;box-sizing:border-box!important}
 html.hbh-workspace .bbs-home__topic-list-wrapper :is(.swiper,.swiper-wrapper,.swiper-slide){height:auto!important;width:100%!important;max-width:100%!important;transform:none!important;overflow:visible!important} html.hbh-workspace .bbs-home__topic-list-wrapper .swiper-wrapper{display:flex!important;flex-direction:column!important} html.hbh-workspace .bbs-home__topic-list{display:flex!important;flex-direction:column!important;align-items:stretch!important;transform:none!important;overflow:visible!important}
 html.hbh-workspace .bbs-home__topic-item{display:flex!important;align-items:center!important;gap:10px!important;width:100%!important;padding:9px!important;border-radius:20px!important;flex-shrink:0!important}
 html.hbh-workspace .bbs-home__topic-item:hover{background:#eff3f4!important}
 html.hbh-workspace .bbs-home__topic-item-icon{width:28px!important;height:28px!important}
 html.hbh-workspace .bbs-home__topic-name{font-size:13px!important;white-space:normal!important;margin:0!important}
 #hbh-left-links{position:fixed;left:max(20px,calc(50vw - 530px));top:100px;width:175px;z-index:31;font:14px system-ui}#hbh-left-links a{display:block;color:#0f1419;text-decoration:none;padding:10px 16px;border-radius:24px;font-weight:650}#hbh-left-links a:hover,#hbh-left-links a[aria-current="page"]{background:#eff3f4}
 #hbh-post-dialog{width:min(1180px,94vw);height:88vh;border:1px solid #eff3f4;border-radius:20px;padding:0;box-shadow:0 20px 100px #0003}#hbh-post-dialog::backdrop{background:#0f141980}#hbh-post-dialog .hbh-modal-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-bottom:1px solid #eff3f4;font:14px system-ui}#hbh-post-dialog button{border:0;border-radius:20px;padding:8px 16px;cursor:pointer}#hbh-post-dialog[open]{display:flex!important;flex-direction:column}#hbh-post-dialog .hbh-modal-bar{flex:none;min-height:56px;box-sizing:border-box}#hbh-post-dialog iframe{display:block;flex:1;min-height:0;width:100%;height:0;border:0}#hbh-post-dialog a{color:#167ac6}
 @media(max-width:1000px){html.hbh-workspace :is(#page-user-profile,#page-creator-content-management).layout-normal{padding-left:0!important;width:calc(100vw - 32px)!important}html.hbh-workspace #page-bbs-community{padding-left:0!important;max-width:calc(100vw - 32px)!important}html.hbh-workspace #page-bbs-community .bbs-home__topic-list-wrapper{position:static!important;width:100%!important;max-height:210px!important}#hbh-left-links{position:static;width:auto;margin:10px 20px;display:flex;flex-wrap:wrap}#hbh-left-links :is(#hbh-community-list,#hbh-search-results){width:100%}}
 `;document.documentElement.append(style);
 const nav=document.createElement('nav');nav.id='hbh-left-links';nav.setAttribute('aria-label','黑盒助手导航');nav.innerHTML='<a href="/app/bbs/home" data-hbh-feed="home">⌂ 社区动态</a><a href="/app/bbs/home?hbh_feed=following" data-hbh-feed="following">♡ 关注动态</a>';
 const search=document.createElement('input');search.id='hbh-community-search';search.placeholder='筛选快捷项 / 回车搜索全部';search.type='search';search.setAttribute('aria-label','搜索社区');
 const communities=document.createElement('div');communities.id='hbh-community-list';nav.append(search,communities);
 let communitySignature='';
 function syncCommunities(){const source=[...document.querySelectorAll('#page-bbs-community .bbs-home__topic-item')];if(!source.length)return;const signature=source.map(b=>b.textContent.trim()+'|'+(b.querySelector('img')?.src||'')).join('~');if(signature===communitySignature)return;communitySignature=signature;communities.replaceChildren();const heading=document.createElement('h3');heading.textContent='快捷社区';communities.append(heading);for(const original of source){const button=document.createElement('button');button.type='button';const label=original.textContent.trim();button.dataset.label=label.toLowerCase();const image=original.querySelector('img');if(image){const img=document.createElement('img');img.src=image.src;img.alt='';button.append(img);}button.append(document.createTextNode(label));button.onclick=()=>original.click();communities.append(button);}filterCommunities();}
 function filterCommunities(){const q=search.value.trim().toLowerCase();for(const button of communities.querySelectorAll('button'))button.hidden=!button.dataset.label.includes(q);}
 search.oninput=filterCommunities;search.onkeydown=e=>{if(e.key==='Enter'&&search.value.trim()){e.preventDefault();document.dispatchEvent(new CustomEvent('hbh-community-search',{detail:search.value.trim()}));}};const results=document.createElement('div');results.id='hbh-search-results';nav.append(results);
 let stopFrameWatch=()=>{};const dialog=document.createElement('dialog');dialog.id='hbh-post-dialog';dialog.innerHTML='<div class="hbh-modal-bar"><strong>帖子与评论</strong><a target="_blank" rel="noopener">在新标签页打开</a><button type="button" aria-label="关闭帖子">关闭 ✕</button></div><iframe id="hbh-post-frame" name="hbh-post-frame" title="帖子详情与评论"></iframe>';
 document.body.append(dialog);
 dialog.querySelector('iframe').addEventListener('load',()=>{
  try{const doc=dialog.querySelector('iframe').contentDocument;if(!doc||doc.URL==='about:blank')return;
   // detail-init.js applies frame styling at document_start, before reveal.

   stopFrameWatch();let finished=false;let pending=false;const frame=dialog.querySelector('iframe');
   const finish=()=>{if(finished)return;finished=true;observer.disconnect();clearTimeout(timeout);requestAnimationFrame(()=>requestAnimationFrame(()=>{if(dialog.open&&frame.contentDocument===doc)dialog.setAttribute('data-ready','');}));};
   const check=()=>{if(pending||finished)return;const content=doc.querySelector('.hb-bbs-link__content,#page-game-detail,.topic-link__main,#page-user-profile,#page-creator-content-management,#page-creator-content-management-detail,#page-message-center');if(content&&content.children.length){pending=true;const images=[...content.querySelectorAll('img')].slice(0,3);Promise.race([Promise.allSettled(images.map(img=>img.decode?img.decode():Promise.resolve())),new Promise(resolve=>setTimeout(resolve,500))]).then(finish);}};
   const observer=new MutationObserver(check);const timeout=setTimeout(finish,8000);stopFrameWatch=()=>{finished=true;observer.disconnect();clearTimeout(timeout);};observer.observe(doc.body||doc.documentElement,{childList:true,subtree:true});check();
  }catch{dialog.setAttribute('data-ready','');}
 });
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{stopFrameWatch();dialog.querySelector('iframe').src='about:blank';});
 let active=false;
 function update(){
 const home=location.pathname==='/app/bbs/home'||location.pathname==='/bbs/home'||location.pathname.startsWith('/app/topic/')||location.pathname.startsWith('/app/user/profile')||location.pathname.startsWith('/creator/content_management');
 if(document.documentElement.classList.contains('hbh-workspace')!==active)document.documentElement.classList.toggle('hbh-workspace',active);
 if(active&&home){if(!nav.isConnected)document.body.append(nav);syncCommunities();}else nav.remove();
 if(!active)return;
 const unwanted=new Set(['首页','小黑盒加速器','黑盒语音','黑盒工坊','开放平台','加入我们']);
 for(const el of document.querySelectorAll('.nav-links .nav-link')){if(unwanted.has(el.textContent.trim())&&el.getBoundingClientRect().top<145)el.setAttribute('data-hbh-remove-nav','');}
 }
 let pending=false;new MutationObserver(()=>{if(!active||pending)return;pending=true;setTimeout(()=>{pending=false;update();},250);}).observe(document.body,{subtree:true,childList:true});
 let detailSequence=0;
 function openPost(url){stopFrameWatch();dialog.querySelector('a').href=url.href;dialog.removeAttribute('data-ready');url.searchParams.set('hbh_embed','1');dialog.querySelector('iframe').src=url.href;if(!dialog.open)dialog.showModal();}
 document.addEventListener('click',e=>{
 if(!active||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0||e.target.closest('#hbh-post-dialog'))return;
 if(e.target.closest('button,input,textarea,select,[role="button"],[contenteditable="true"],.sorter,.list-cotent__operation-btn,.list-content__operation-btn,.creator-content-item__operation,.creator-content-item__data-wrapper'))return;
 const a=e.target.closest('a[href]');let url=null;
 if(a){
  if(a.hasAttribute('download')||a.target&&a.target!=='_self')return;
  const link=new URL(a.href,location.href);if(link.origin!==location.origin)return;
  const match=link.pathname.match(/^\/(?:app\/bbs\/link|creator\/content_management\/detail)\/(\d+)\/?$/);
  if(!match)return;url=new URL('/app/bbs/link/'+match[1]+link.search+link.hash,location.origin);
 }else{
  const card=e.target.closest('.content-management-home__content,.user-profile-moment-item');if(!card)return;
  // Creator cards use a Vue click handler rather than a URL. Read only the
  // article's display ID, and leave edit/delete/menu controls untouched.
  const token='hbh-detail-'+(++detailSequence);let id='';
  const receive=event=>{try{const result=JSON.parse(event.detail);if(result.token===token&&/^\d{1,20}$/.test(result.id))id=result.id;}catch{}};
  document.addEventListener('hbh-detail-post-result',receive);card.setAttribute('data-hbh-detail-request',token);
  document.dispatchEvent(new CustomEvent('hbh-detail-post-request',{detail:token}));
  document.removeEventListener('hbh-detail-post-result',receive);card.removeAttribute('data-hbh-detail-request');if(!id)return;
  url=new URL('/app/bbs/link/'+id,location.origin);
 }
 e.preventDefault();e.stopImmediatePropagation();openPost(url);
 },true);
 let changed=false;chrome.storage.onChanged.addListener((c,area)=>{if(area==='local'&&c.workspace){changed=true;active=!!c.workspace.newValue;update();if(!active&&dialog.open)dialog.close();}});chrome.storage.local.get('workspace').then(({workspace})=>{if(!changed){active=!!workspace;update();}});
})();


