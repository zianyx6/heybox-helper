(() => {
 if(window.top!==window)return;
 // Read-only bridge: isolated scripts can request a card's numeric post ID only.
 document.addEventListener('hbh-post-id-request',event=>{
  const token=event.detail;if(typeof token!=='string'||!/^hbh-post-\d+$/.test(token))return;
  const el=document.querySelector(`[data-hbh-id-request="${token}"]`);let id='';
  if(el?.matches('.hb-cpt__bbs-list-content,.hb-cpt__moment-list-content')&&!el.closest('#page-bbs-link,[contenteditable="true"],.editor')){
   const read=props=>{for(const value of [props?.link?.linkid,props?.moment?.linkid,props?.moment?.link?.linkid])if(/^\d{1,20}$/.test(String(value)))return String(value);return '';};
   id=read(el.__vnode?.props);let instance=el.__vueParentComponent;
   for(let i=0;i<8&&!id&&instance;i++,instance=instance.parent)id=read(instance.props)||read(instance.vnode?.props);
  }
  document.dispatchEvent(new CustomEvent('hbh-post-id-result',{detail:JSON.stringify({token,id})}));
 });
 document.dispatchEvent(new Event('hbh-post-id-bridge-ready'));
 let clientPromise, runtime, nativeCard;
 async function client(){
  if(!clientPromise)clientPromise=(async()=>{const script=[...document.scripts].find(s=>/\/app\/index-[^/]+\.js$/.test(s.src)&&!s.src.includes('legacy'));if(!script)throw Error('没有找到网页接口模块，请刷新后重试');const mod=await import(script.src);if(!mod.H?.$get)throw Error('网页接口模块已更新，需重新适配');runtime=mod; nativeCard=(await import(new URL("./index.vue_vue_type_style_index_0_lang-CzBGa-_p.js",script.src).href))._; if(!mod.b7 || !mod.M || !nativeCard)throw Error("原生卡片模块已变化，需要重新适配");return mod.H;})().catch(e=>{clientPromise=null;throw e;});
  return clientPromise;
 }
 const css=document.createElement('style');css.textContent='html.hbh-following .bbs-home__content-list{display:none!important}#hbh-follow-feed{width:100%;min-width:0;box-sizing:border-box;background:white;font:14px/1.6 system-ui;color:#0f1419}#hbh-follow-feed>.hbh-feed-header{padding:16px 24px;border-bottom:1px solid #eff3f4}#hbh-follow-feed>.hbh-feed-header h2{font-size:20px;margin:0}#hbh-follow-feed .bbs-home__content-item{padding:16px 24px;border-bottom:1px solid #eff3f4;box-sizing:border-box;width:100%;overflow:hidden}#hbh-follow-feed .hb-cpt__bbs-list-content{width:100%;min-width:0}#hbh-follow-feed>button{border:0;background:#1d9bf0;color:white;padding:9px 18px;border-radius:24px;margin:10px;cursor:pointer}#hbh-follow-feed>button:disabled{opacity:.5}#hbh-follow-feed .hint{color:#536471;font-size:13px}';document.head.append(css);
 // This cache lives in this tab only; no post bodies or account data are persisted.
 const CACHE_MS=180000,BATCH_SIZE=10,MAX_USERS=1000,MAX_POSTS=200;
 let users=[],items=new Map(),failures=new Map(),processed=new Set(),generation=0,loading=false;
 let initialized=false,cacheUntil=0,cacheIdentity='',userTotal=0,homeScroll=0,followScroll=0;
 const mounted=new Map();
 function accountIdentity(){
  const nav=document.querySelector('.nav-user');
  const read=props=>{for(const value of [props?.user?.account_detail?.userid,props?.user?.profile?.heybox_id])if(/^\d{1,20}$/.test(String(value)))return 'id:'+value;return '';};
  let id=read(nav?.__vnode?.props),instance=nav?.__vueParentComponent;
  for(let i=0;i<8&&!id&&instance;i++,instance=instance.parent)id=read(instance.props)||read(instance.vnode?.props);
  if(id)return id;
  // Production Vue omits component metadata. Read its existing query cache only;
  // do not subscribe, fetch account data, or touch login credentials.
  try{const app=[...document.querySelectorAll('[data-v-app]')].map(el=>el.__vue_app__).find(Boolean);const query=app?._context?.provides?.VUE_QUERY_CLIENT;if(typeof query?.getQueryData==='function')return read({user:query.getQueryData(['user'])});}catch{}
  const avatar=nav?.querySelector('img.nav-user-avatar,img');return avatar?.getAttribute('src')?'avatar:'+avatar.getAttribute('src'):'';
 }
 let activeRequests=0;const requestWaiters=[];
 async function read(api,path,params,run){
  while(activeRequests>=2){await new Promise(resolve=>requestWaiters.push(resolve));if(run!==generation)return null;}
  if(run!==generation)return null;activeRequests++;
  try{const response=await api.$get(path,params);if(run===generation&&cacheIdentity&&accountIdentity()!==cacheIdentity){leave();initialized=false;cacheUntil=0;users=[];items.clear();failures.clear();processed.clear();return null;}return response;}finally{activeRequests--;for(const resolve of requestWaiters.splice(0))resolve();}
 }
 const panel=document.createElement('section');panel.id='hbh-follow-feed';
 const head=document.createElement('article');head.className='hbh-feed-header';head.innerHTML='<h2>关注动态</h2><p class="hint">已加载的近期帖子按最新时间排列；每位用户读取首批动态，非完整时间线。</p>';
 const status=document.createElement('p');status.setAttribute('role','status');head.append(status);
 const list=document.createElement('div'),more=document.createElement('button'),retry=document.createElement('button'),refresh=document.createElement('button');more.type=retry.type=refresh.type='button';more.textContent='加载更多关注用户';retry.textContent='重试失败用户';refresh.textContent='刷新动态';retry.hidden=true;panel.append(head,list,more,retry,refresh);
 function timestamp(...sources){for(const p of sources){if(!p)continue;for(const v of [p.create_at,p.create_time,p.time]){if(v==null||v==='')continue;const n=Number(v),parsed=Number.isFinite(n)?(n>1e12?n:n*1000):Date.parse(v);if(Number.isFinite(parsed)&&parsed>0)return parsed;}}return 0;}
 function clearCards(){for(const {el} of mounted.values())runtime?.b7(null,el);mounted.clear();list.replaceChildren();}
 let navigation=null;
 function setActive(active){const nav=document.getElementById('hbh-left-links');if(nav?.dataset.feed!==active)nav?.setAttribute('data-feed',active);for(const a of nav?.querySelectorAll('[data-hbh-feed]')||[]){const selected=a.dataset.hbhFeed===active;if(selected&&a.getAttribute('aria-current')!=='page')a.setAttribute('aria-current','page');else if(!selected&&a.hasAttribute('aria-current'))a.removeAttribute('aria-current');}}
 function restoreScroll(value,run=generation){requestAnimationFrame(()=>{if(run===generation)window.scrollTo({top:value,behavior:'instant'});});}
 function leave(restore=true){const active=panel.isConnected;if(active)followScroll=window.scrollY;generation++;navigation?.cancel();navigation=null;loading=false;starting=false;document.documentElement.classList.remove('hbh-following');setActive('home');clearCards();panel.remove();if(active&&restore&&isHome())restoreScroll(homeScroll);}
 function controls(){more.hidden=!initialized||processed.size>=users.length||items.size>=MAX_POSTS;retry.hidden=!failures.size;more.disabled=retry.disabled=refresh.disabled=loading||starting;}
 function summary(prefix=''){status.textContent=prefix+`已读取 ${processed.size}/${users.length} 位关注用户，加载 ${items.size} 篇帖子。`+(failures.size?` ${failures.size} 位读取失败，可单独重试。`:'')+(items.size>=MAX_POSTS?' 已达到本次 200 篇上限，可刷新重新读取。':'')+(userTotal>MAX_USERS?' 本次最多读取前 1000 位关注用户。':'');controls();}
 function render(){
  const app=[...document.querySelectorAll('[data-v-app]')].map(el=>el.__vue_app__).find(Boolean);
  if(!app)throw Error('无法连接原网页卡片上下文，请刷新重试');
  const sorted=[...items.entries()].sort(([aid,a],[bid,b])=>b.time-a.time||bid.length-aid.length||bid.localeCompare(aid));
  let next=list.firstElementChild;
  for(const [id,item] of sorted){
   let card=mounted.get(id);if(!card){const el=document.createElement('div');el.className='bbs-home__content-item hb-bbs-home__feed-splitline';el.dataset.hbhFollowId=id;card={el,item:null};mounted.set(id,card);}
   if(card.el!==next)list.insertBefore(card.el,next);else next=next.nextElementSibling;
   if(card.item!==item){const {post,user}=item;const vnode=runtime.M(nativeCard,{link:{...post,user:post.user||user},show_create_time:true});vnode.appContext=app._context;runtime.b7(vnode,card.el);card.item=item;}
  }
  controls();
 }
 async function batch(failedOnly=false){
  if(loading||!initialized||!panel.isConnected)return;const candidates=failedOnly?[...failures.values()]:users.filter(u=>!processed.has(String(u.userid)));const queue=candidates.slice(0,BATCH_SIZE);if(!queue.length)return;
  loading=true;controls();const run=generation;let index=0,done=0;
  try{const api=await client();if(run!==generation)return;
   async function worker(){while(run===generation&&index<queue.length&&(failedOnly||items.size<MAX_POSTS)){
    const user=queue[index++],id=String(user.userid);summary(`正在读取 ${done}/${queue.length}… `);
    try{const response=await read(api,'/bbs/app/profile/events',{list_type:'moment',userid:id,dw:660,lastval:''},run);if(run!==generation)return;const {data}=response;if(data.status!=='ok')throw Error(data.msg||'读取失败');if(!Array.isArray(data.result?.moments))throw Error('动态接口结构变化');
     for(const moment of data.result.moments){const post=moment.link||moment,key=String(post.linkid);if(!/^\d{1,20}$/.test(key))continue;const time=timestamp(post,moment,moment.moment);const prior=items.get(key);if(!prior&&items.size<MAX_POSTS)items.set(key,{post,user,time});else if(prior&&time>prior.time)items.set(key,{post,user,time});}failures.delete(id);
    }catch{if(run!==generation)return;failures.set(id,user);}
    if(run!==generation)return;processed.add(id);done++;
   }}
   await Promise.all([worker(),worker()]);if(run!==generation)return;render();summary();
  }catch(error){if(run===generation)status.textContent=error.message;}
  finally{if(run===generation){loading=false;controls();}}
 }
 let starting=false;
 async function start(force=false){
  if(loading||starting||!isHome()||!enabled())return;const main=homeMain();if(!main)return;starting=true;const run=++generation;main.append(panel);document.documentElement.classList.add('hbh-following');setActive('following');
  try{const account=accountIdentity();if(!force&&account.startsWith('id:')&&account===cacheIdentity&&initialized&&Date.now()<cacheUntil){render();summary('最近 3 分钟的缓存 · ');restoreScroll(followScroll,run);return;}
   cacheIdentity=account;initialized=false;users=[];processed.clear();items.clear();failures.clear();clearCards();followScroll=0;status.textContent='正在读取关注关系…';controls();restoreScroll(0,run);
   const api=await client();if(run!==generation)return;const response=await read(api,'/bbs/app/profile/following/list',{userid:''},run);if(run!==generation)return;const {data}=response;if(data.status!=='ok')throw Error(data.msg||'请先登录小黑盒');if(!Array.isArray(data.follow_list))throw Error('关注接口返回结构变化，请反馈');
   const unique=new Map();for(const user of data.follow_list)if(/^\d+$/.test(String(user.userid))&&!unique.has(String(user.userid)))unique.set(String(user.userid),user);userTotal=unique.size;users=[...unique.values()].slice(0,MAX_USERS);initialized=true;cacheUntil=Date.now()+CACHE_MS;
   if(!users.length){status.textContent='当前没有关注用户';controls();return;}await batch();
  }catch(error){if(run===generation)status.textContent=error.message;}
  finally{if(run===generation){starting=false;controls();}}
 }
 more.onclick=()=>batch();retry.onclick=()=>batch(true);refresh.onclick=()=>start(true);
 const enabled=()=>document.documentElement.classList.contains('hbh-workspace');
 const isHome=()=>/^\/(?:app\/)?bbs\/home\/?$/.test(location.pathname);
 const homeMain=()=>document.querySelector('#page-bbs-community main.list');
 const router=()=>[...document.querySelectorAll('[data-v-app]')].map(n=>n.__vue_app__).find(Boolean)?.config?.globalProperties?.$router;
 // Only the short route transition watches DOM readiness. It always disconnects.
 function waitHome(attempt){return new Promise(resolve=>{let done=false;const finish=ready=>{if(done)return;done=true;observer.disconnect();clearTimeout(timer);resolve(ready);};const check=()=>{if(!enabled())finish(false);else if(isHome()&&homeMain())finish(true);};const observer=new MutationObserver(check);const timer=setTimeout(()=>finish(false),8000);attempt.cancel=()=>finish(false);observer.observe(document.body,{childList:true,subtree:true});observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});check();});}
 async function showFollowing(){
  if(!enabled()||navigation||panel.isConnected&&document.documentElement.classList.contains('hbh-following'))return;
  if(isHome())homeScroll=window.scrollY;leave(false);const run=generation;const attempt={cancel:()=>{}};navigation=attempt;setActive('following');
  const ready=waitHome(attempt);
  try{if(!isHome()){const route=router();if(!route){attempt.cancel();location.assign('/app/bbs/home?hbh_feed=following');return;}await Promise.race([Promise.resolve(route.push('/app/bbs/home')),ready]);}const available=await ready;if(run===generation){if(available&&enabled())await start();else setActive('home');}}
  catch(error){if(run===generation){setActive('home');const a=document.querySelector('#hbh-left-links [data-hbh-feed="following"]');if(a)a.title='打开失败，请重试或在新标签页打开';}}
  finally{attempt.cancel();if(navigation===attempt)navigation=null;}
 }
 function plainClick(e,a){return e.button===0&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&(!a.target||a.target==='_self')&&!a.hasAttribute('download');}
 document.addEventListener('click',e=>{const a=e.target.closest('#hbh-left-links a');if(!a||!enabled()||!plainClick(e,a))return;const url=new URL(a.href,location.href);const following=a.dataset.hbhFeed==='following'||url.hash==='#hbh-following';if(following){e.preventDefault();e.stopImmediatePropagation();showFollowing();}},true);
 const observer=new MutationObserver(()=>{if(!enabled()||!isHome()||!panel.isConnected){if(panel.isConnected||document.documentElement.classList.contains('hbh-following'))leave();}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('popstate',()=>{if(!isHome())leave();});
 // Modified/new-tab links retain a real URL. Wait once for isolated-world settings.
 if(new URL(location.href).searchParams.get('hbh_feed')==='following'){
  let finished=false;const finish=()=>{if(finished)return;finished=true;bootstrap.disconnect();clearTimeout(timeout);};
  const check=()=>{if(enabled()){finish();const url=new URL(location.href);url.searchParams.delete('hbh_feed');history.replaceState(history.state,'',url.href);showFollowing();}};
  const bootstrap=new MutationObserver(check),timeout=setTimeout(finish,10000);bootstrap.observe(document.documentElement,{attributes:true,attributeFilter:['class']});check();
 }
 let searchSequence=0;
 document.addEventListener('hbh-community-search',async e=>{
  const query=typeof e.detail==='string'?e.detail.trim().slice(0,80):'';if(!query)return;
  const output=document.getElementById('hbh-search-results');if(!output)return;const seq=++searchSequence;output.textContent='正在查找社区…';
  try{const api=await client();const {data}=await api.$get('/bbs/app/topic/categories',{});if(seq!==searchSequence)return;if(data.status!=='ok')throw Error(data.msg||'读取社区失败');const found=new Map();let visited=0;
  function walk(node){if(!node||typeof node!=='object'||++visited>20000)return;if(Array.isArray(node)){for(const item of node)walk(item);return;}if(/^\d+$/.test(String(node.topic_id))&&typeof node.name==='string'&&node.name.toLowerCase().includes(query.toLowerCase()))found.set(String(node.topic_id),node.name);for(const value of Object.values(node))if(value&&typeof value==='object')walk(value);}
  walk(data.result);output.replaceChildren();const hint=document.createElement('p');hint.textContent=found.size?'社区目录匹配结果':'社区目录中未找到匹配项，可尝试更短关键词。';output.append(hint);for(const [id,name] of [...found].slice(0,50)){const a=document.createElement('a');a.href='/app/topic/link/'+id;a.textContent=name;output.append(a);}
  }catch(error){if(seq===searchSequence)output.textContent=error.message;}
 });
 document.addEventListener('click',e=>{const a=e.target.closest('#hbh-left-links a');if(!a||!enabled()||!plainClick(e,a))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||a.dataset.hbhFeed==='following'||url.hash==='#hbh-following')return;leave();if(location.pathname===url.pathname&&location.search===url.search){e.preventDefault();e.stopImmediatePropagation();return;}const route=router();if(!route)return;e.preventDefault();e.stopImmediatePropagation();Promise.resolve(route.push(url.pathname+url.search+url.hash)).catch(()=>location.assign(url.href));},true);

})();


