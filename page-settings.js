(() => {
 'use strict';
 if (window.top !== window || document.getElementById('hbh-settings-host')) return;
 const defaults = {
  workspace: false, social: false,
  reading: {enabled:false,fontSize:17,lineHeight:1.85,width:1000,top:true},
  appearance: {enabled:true,radius:20,density:'comfortable',motion:true,preset:'blue',accent:'#2289ed',pageColor:'#f5f6f8',backgroundOpacity:.2},
  backgroundImage:''
 };
 const host = document.createElement('div');
 host.id = 'hbh-settings-host';
 const shadow = host.attachShadow({mode:'open'});
 const icon = (name) => {
  const paths = {
   settings:'<path d="m9.5 4 .5-2h4l.5 2 2 1.2 2-.6 2 3.4-1.5 1.5v2.4l1.5 1.5-2 3.4-2-.6-2 1.2-.5 2h-4l-.5-2-2-1.2-2 .6-2-3.4L5 12.9v-2.4L3.5 9l2-3.4 2 .6Z"/><circle cx="12" cy="11.7" r="3"/>',
   close:'<path d="m6 6 12 12M18 6 6 18"/>',
   look:'<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.3-3.5c-.8-.7-.3-2 1-2H17a4 4 0 0 0 4-4A8.5 8.5 0 0 0 12 3Z"/><path d="M7.5 10h.01M10 6.5h.01M15 7h.01M17 11h.01"/>',
   layout:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 9v11"/>',
   reading:'<path d="M3 5h6a3 3 0 0 1 3 3v13a4 4 0 0 0-4-3H3Zm18 0h-6a3 3 0 0 0-3 3v13a4 4 0 0 1 4-3h5Z"/>',
   shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
   check:'<path d="m5 12 4 4L19 6"/>'
  };
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
 };
 const toggle = (key, title, description) => `<label class="setting"><span class="setting-copy"><span class="setting-title">${title}</span>${description ? `<span class="setting-description">${description}</span>` : ''}</span><input data-key="${key}" type="checkbox" role="switch"><span class="switch" aria-hidden="true"></span></label>`;
 const select = (key, title, options) => `<label class="setting select-row"><span class="setting-title">${title}</span><select data-key="${key}">${options.map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></label>`;
 const color = (key,title) => `<label class="setting"><span class="setting-title">${title}</span><input data-key="${key}" type="color" aria-label="${title}"></label>`;
 shadow.innerHTML = `
 <style>
 :host{all:initial;position:fixed;right:24px;bottom:88px;z-index:2147483647;color-scheme:light;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;color:#243449;letter-spacing:normal}
 *,*::before,*::after{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}button:disabled{cursor:wait;opacity:.58}[hidden]{display:none!important}button,select,input{outline-offset:4px}button:focus-visible,select:focus-visible{outline:3px solid #88b4ed}svg{flex-shrink:0}
 #hbh-settings-trigger{display:flex;align-items:center;gap:8px;padding:12px 17px;border:1px solid #e0e7ef;border-radius:999px;background:#fff;color:#344c68;box-shadow:0 5px 22px #233b5614;transition:background var(--hbh-motion-duration,0ms),box-shadow var(--hbh-motion-duration,0ms)}#hbh-settings-trigger:hover{background:#f1f6fd;box-shadow:0 7px 24px #233b5624}
 .backdrop{position:fixed;inset:0;background:rgba(29,42,61,.26);display:flex;align-items:center;justify-content:flex-end;padding:24px;isolation:isolate}
 .panel{background:#fbfcfe;width:456px;max-width:100%;max-height:calc(100dvh - 48px);border-radius:26px;border:1px solid #ffffffb3;box-shadow:0 24px 90px #172b4b33;display:flex;flex-direction:column;overflow:hidden;outline:none}
 .panel-header{padding:25px 26px 20px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;border-bottom:1px solid #e9edf3;background:#fff}h2{font-size:21px;line-height:1.4;margin:0 0 5px;letter-spacing:-.3px;font-weight:700}.subtitle{font-size:12px;color:#8290a1;margin:0}.close{width:34px;height:34px;border:0;border-radius:50%;background:#f3f5f8;color:#5b6b7d;display:grid;place-items:center;flex-shrink:0}.close:hover{background:#e9eef5}
 .body{overflow-y:auto;overscroll-behavior:contain;padding:20px 23px 24px;scrollbar-width:thin;scrollbar-color:#d8e0ea transparent}.section+.section{margin-top:23px}.section-heading{display:flex;align-items:center;gap:9px;font-size:13px;font-weight:650;color:#66758a;margin:0 0 10px 3px}.section-heading svg{width:17px;height:17px}.card{border:1px solid #e9edf3;background:#fff;border-radius:18px;padding:3px 16px}
 .setting{position:relative;display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:58px;padding:13px 0}.setting+.setting{border-top:1px solid #f0f3f7}.setting-copy{display:block;min-width:0}.setting-title{font-size:13px;font-weight:560;color:#314259;display:block}.setting-description{display:block;font-size:11px;color:#8b97a6;line-height:1.6;margin-top:3px}.setting input[type=checkbox]{position:absolute;right:0;width:38px;height:23px;margin:0;opacity:0;cursor:pointer;z-index:1}.switch{display:block;flex:0 0 38px;width:38px;height:23px;background:#dce3ed;border-radius:20px;transition:background var(--hbh-motion-duration,0ms);position:relative;pointer-events:none}.switch::after{content:"";position:absolute;left:3px;top:3px;width:17px;height:17px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #1c365826;transition:transform var(--hbh-motion-duration,0ms)}input:checked+.switch{background:#568bce}input:checked+.switch::after{transform:translateX(15px)}input:focus-visible+.switch{outline:3px solid #a0c0ea;outline-offset:3px}input:disabled+.switch{opacity:.45}
 select{max-width:160px;border:1px solid #e5eaf1;border-radius:10px;background:#f7f9fc;color:#526782;padding:7px 27px 7px 11px;cursor:pointer;font-size:12px;min-height:34px}.select-row{min-height:56px}.section-note{font-size:11px;color:#8c98a8;line-height:1.7;margin:9px 4px 0}.footer{padding:12px 25px;border-top:1px solid #e9edf3;background:#fff;display:flex;align-items:center;gap:6px;min-height:43px;font-size:11px;color:#8b97a7}.footer svg{width:14px;height:14px}.footer.error{color:#b44f54}
 details{background:#fff;border:1px solid #e9edf3;border-radius:18px;padding:0 16px}summary{display:flex;align-items:center;gap:8px;padding:15px 0;cursor:pointer;font-size:13px;font-weight:560;list-style:none}summary::-webkit-details-marker{display:none}summary::after{content:"⌄";margin-left:auto;color:#8a98aa}details[open] summary::after{transform:rotate(180deg)}.diagnostic-note{font-size:11px;line-height:1.7;color:#8b97a6;margin:0 0 12px}.diagnostic-status{font-size:12px;color:#64758b;white-space:pre-line;line-height:1.8;padding:10px 12px;background:#f7f9fc;border-radius:11px;margin:0 0 12px}.diagnostic-actions{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:15px}.secondary{font-size:11px;border:1px solid #e2e8f0;border-radius:10px;padding:7px 11px;background:#fff;color:#60738b}.secondary:hover{background:#f2f6fb}.secondary.primary{background:#edf4ff;border-color:#dfebfa;color:#4b7ebd}
 /* Palette variables inherit across this shadow boundary; native page styles cannot enter. */
 #hbh-settings-trigger{color:var(--hbh-accent-text,#176ac2);border-color:var(--hbh-line,#e0e7ef)}
 #hbh-settings-trigger:hover,.secondary:hover{background:var(--hbh-input,#f1f6fd)}
 .panel{background:var(--hbh-input,#fbfcfe)}
 .panel-header,.footer,.card,details{background:var(--hbh-surface,#fff);border-color:var(--hbh-line,#e9edf3)}
 .setting+.setting,#hbh-custom-colors{border-color:var(--hbh-line,#f0f3f7)}
 select{border-color:var(--hbh-line,#e5eaf1);background:var(--hbh-input,#f7f9fc);color:var(--hbh-ink,#526782)}
 select option:checked{background:var(--hbh-accent-soft,#edf4ff);color:var(--hbh-accent-text,#176ac2)}
 input:checked+.switch{background:var(--hbh-accent,#2289ed)}
 button:focus-visible,select:focus-visible,input:focus-visible,input:focus-visible+.switch{outline-color:var(--hbh-accent,#2289ed)}
 .secondary.primary{background:var(--hbh-accent-soft,#edf4ff);border-color:var(--hbh-line,#dfebfa);color:var(--hbh-accent-text,#176ac2)}
 input[type=color]{width:46px;height:34px;padding:3px;border:1px solid var(--hbh-line,#e5eaf1);background:#fff;border-radius:9px;cursor:pointer;flex-shrink:0}
 #hbh-custom-colors{border-top:1px solid #f0f3f7;border-bottom:1px solid #f0f3f7}
 .background-card{margin-top:12px;padding-bottom:13px}.background-actions{display:flex;align-items:center;gap:9px}.file-label{cursor:pointer;position:relative;display:inline-flex;align-items:center;justify-content:center;min-height:34px}.file-label input{position:absolute;inset:0;opacity:0;width:100%;cursor:pointer}.file-label:focus-within{outline:3px solid var(--hbh-accent,#2289ed);outline-offset:3px}.file-label.busy{opacity:.6;cursor:wait}.background-preview{height:90px;background-size:cover;background-position:center;border-radius:12px;border:1px solid var(--hbh-line,#e5eaf1);margin-bottom:12px}.background-actions button{min-height:34px}.range-row{gap:8px}.range-row input{width:100px;max-width:32%;accent-color:var(--hbh-accent,#2289ed)}.range-row output{font-size:11px;min-width:30px;color:#64748b}.section-note.error{color:#b44f54}
 @media(prefers-reduced-motion:reduce){*,*::after{transition:none!important}}@media(max-width:520px){:host{right:15px;bottom:82px}.backdrop{padding:10px;align-items:flex-end}.panel{width:100%;max-height:calc(100dvh - 20px);border-radius:24px}.panel-header{padding:20px}.body{padding:17px}.footer{padding-inline:20px}#hbh-settings-trigger{padding:11px 14px}}
 </style>
 <button type="button" id="hbh-settings-trigger" aria-label="打开黑盒助手设置" aria-expanded="false" aria-controls="hbh-settings-panel">${icon('settings')}<span>设置</span></button>
 <div class="backdrop" id="hbh-settings-backdrop" hidden>
  <section class="panel" id="hbh-settings-panel" role="dialog" aria-modal="true" aria-labelledby="hbh-settings-title" tabindex="-1">
   <header class="panel-header"><div><h2 id="hbh-settings-title">让浏览更合心意</h2><p class="subtitle">黑盒助手 · 页面设置</p></div><button type="button" class="close" id="hbh-settings-close" aria-label="关闭设置">${icon('close')}</button></header>
   <div class="body">
    <section class="section"><h3 class="section-heading">${icon('look')}外观</h3><div class="card">
     ${toggle('appearance.enabled','启用个性化外观','主题颜色、圆角卡片与本地图片背景')}
     ${select('appearance.preset','主题预设',[['blue','晴空蓝'],['pink','樱花粉'],['mint','薄荷绿'],['violet','鸢尾紫'],['sand','暖砂色'],['custom','自定义']])}
     <div id="hbh-custom-colors" hidden>
      ${color('appearance.accent','主题强调色')}
      ${color('appearance.pageColor','页面底色')}
     </div>
     ${select('appearance.radius','圆角大小',[[12,'小圆角'],[20,'舒适圆角'],[28,'大圆角']])}
     ${select('appearance.density','页面间距',[['comfortable','舒适'],['compact','紧凑']])}
     ${toggle('appearance.motion','轻量动画','悬停与按下反馈，跟随系统减少动态效果')}
    </div><div class="card background-card">
     <div class="setting"><span class="setting-copy"><span class="setting-title">图片背景</span><span class="setting-description">仅保存在本机，不上传。支持 JPG、PNG、WebP，最大 8 MB。</span></span></div>
     <div class="background-preview" id="hbh-background-preview" hidden></div>
     <div class="background-actions"><label class="secondary primary file-label">选择图片<input type="file" id="hbh-background-file" accept="image/jpeg,image/png,image/webp" aria-label="选择本地背景图片"></label><button type="button" class="secondary" id="hbh-background-remove">移除背景</button></div>
     <label class="setting range-row"><span class="setting-copy"><span class="setting-title">背景可见度</span><span class="setting-description">卡片保持白底，便于阅读。</span></span><input type="range" data-key="appearance.backgroundOpacity" min="0" max="1" step="0.05" aria-label="背景可见度"><output id="hbh-background-opacity">20%</output></label>
     <p class="section-note" id="hbh-background-status" role="status">尚未设置图片背景</p>
    </div></section>
    <section class="section"><h3 class="section-heading">${icon('layout')}社区布局</h3><div class="card">
     ${toggle('workspace','社区工作区','左侧选社区、关注动态与帖子弹窗')}
     ${toggle('social','简洁导航','精简导航视觉，突出当前所在位置')}
     <div class="setting"><span class="setting-copy"><span class="setting-title">本机隐藏的帖子</span><span class="setting-description">恢复通过“不感兴趣”隐藏的内容</span></span><button type="button" class="secondary" id="hbh-reset-hidden-posts">全部恢复</button></div>
    </div></section>
    <section class="section"><h3 class="section-heading">${icon('reading')}阅读</h3><div class="card">
     ${toggle('reading.enabled','阅读优化','按你的习惯调整正文与阅读宽度')}
     ${select('reading.fontSize','正文字号',[[15,'15 px'],[17,'17 px'],[19,'19 px'],[21,'21 px']])}
     ${select('reading.lineHeight','正文行距',[[1.6,'紧凑'],[1.85,'舒适'],[2.1,'宽松']])}
     ${select('reading.width','内容最大宽度',[[800,'800 px'],[1000,'1000 px'],[1200,'1200 px']])}
     ${toggle('reading.top','回到顶部按钮','启用阅读优化时显示')}
    </div><p class="section-note">更改会自动保存并应用。关闭对应开关即可恢复。</p></section>
    <section class="section"><details id="hbh-diagnostics"><summary>${icon('shield')}登录诊断</summary><p class="diagnostic-note">记录仅保存在本机，报告不包含登录凭据。遇到掉登录时，可导出报告帮助排查。</p><p class="diagnostic-status" id="hbh-diagnostic-status" role="status">展开后读取诊断状态</p><div class="diagnostic-actions"><button type="button" class="secondary primary" id="hbh-report-export">导出报告</button><button type="button" class="secondary" id="hbh-report-refresh">刷新状态</button><button type="button" class="secondary" id="hbh-report-clear">清空记录</button></div></details></section>
   </div>
   <footer class="footer" id="hbh-settings-status" role="status">${icon('check')}<span>设置会自动保存</span></footer>
  </section>
 </div>`;

 const tabCSS=document.createElement('style');tabCSS.textContent=`
  .settings-tabs{display:flex;gap:5px;padding:12px 22px;background:var(--hbh-surface,#fff);border-bottom:1px solid var(--hbh-line,#e9edf3);flex:none}
  .settings-tabs button{flex:1;border:0;border-radius:999px;padding:9px 5px;font:600 12px system-ui;background:transparent;color:var(--hbh-muted,#64748b);transition:background-color var(--hbh-motion-duration,0ms),color var(--hbh-motion-duration,0ms)}
  .settings-tabs button[aria-selected="true"]{background:var(--hbh-accent-soft,#edf5ff);color:var(--hbh-accent-text,#1673ce)}
  .settings-tabs button:hover{background:var(--hbh-input,#f1f5f9)}
  .panel{height:min(880px,calc(100dvh - 48px))}.body{flex:1;min-height:0}.tabpanel:focus{outline:none}.about-copy{font-size:12px;line-height:1.9;color:var(--hbh-muted,#64748b);padding:14px 0}.about-copy h3{font-size:17px;color:var(--hbh-ink,#182230);margin:0 0 8px}.about-copy p{margin:7px 0}
  @media(max-width:520px){.panel{height:calc(100dvh - 20px)}.settings-tabs{padding:10px 16px}}
 `;shadow.append(tabCSS);
 const body=shadow.querySelector('.body'),sections=[...body.children];
 const tabs=document.createElement('nav');tabs.className='settings-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','设置分类');
 const tabGroups=[['appearance','外观',sections[0]],['reading','阅读',sections[2]],['community','社区',sections[1]],['about','关于',null]];
 let selectedTab='appearance';const tabPanels=new Map(),tabButtons=new Map();
 for(const [id,label,section] of tabGroups){const button=document.createElement('button');button.type='button';button.id='hbh-tab-'+id;button.dataset.tab=id;button.setAttribute('role','tab');button.setAttribute('aria-controls','hbh-panel-'+id);button.textContent=label;tabs.append(button);tabButtons.set(id,button);const pane=document.createElement('section');pane.id='hbh-panel-'+id;pane.className='tabpanel';pane.setAttribute('role','tabpanel');pane.setAttribute('aria-labelledby',button.id);if(section)pane.append(section);tabPanels.set(id,pane);}
 const about=tabPanels.get('about'),aboutCard=document.createElement('div');aboutCard.className='card';const aboutCopy=document.createElement('div');aboutCopy.className='about-copy';const title=document.createElement('h3');title.textContent='关于黑盒助手';const version=document.createElement('p');version.textContent='版本 '+(chrome.runtime.getManifest?.().version||'0.11.0');const pendingAbout=document.createElement('p');pendingAbout.textContent='关于页内容待完善。';const local=document.createElement('p');local.textContent='主题、背景图片和隐藏记录保存在本机。';aboutCopy.append(title,version,pendingAbout,local);aboutCard.append(aboutCopy);about.append(aboutCard,sections[3]);
 body.replaceChildren(...tabPanels.values());body.before(tabs);
 function selectTab(id,focus=false){if(!tabPanels.has(id))return;selectedTab=id;for(const [key,button] of tabButtons){const selected=key===id;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;tabPanels.get(key).hidden=!selected;}body.scrollTop=0;if(focus)tabButtons.get(id).focus({preventScroll:true});}
 tabs.addEventListener('click',event=>{const button=event.target.closest('[data-tab]');if(button)selectTab(button.dataset.tab);});
 tabs.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const ids=[...tabPanels.keys()],index=ids.indexOf(selectedTab);const next=event.key==='Home'?0:event.key==='End'?ids.length-1:(index+(event.key==='ArrowLeft'?-1:1)+ids.length)%ids.length;selectTab(ids[next],true);});selectTab('appearance');
 document.documentElement.append(host);
 const $ = (selector) => shadow.querySelector(selector);
 const controls = [...shadow.querySelectorAll('[data-key]')];
 const backdrop = $('#hbh-settings-backdrop');
 const panel = $('#hbh-settings-panel');
 const trigger = $('#hbh-settings-trigger');
 let state = {}, ready = false, opened = false, previousFocus = null, loadRevision = 0;
 let writes = Promise.resolve(), pending = new Map(), saveGeneration = 0;
 let imageBusy = false, previewImage = null;
 const clone = value => value && typeof value === 'object' && !Array.isArray(value) ? {...value} : {};
 const getValue = (key) => {
  if (pending.has(key)) return pending.get(key).value;
  const [group, field] = key.split('.');
  if (field) return (state[group] || {})[field] ?? defaults[group][field];
  return state[group] ?? defaults[group];
 };
 function status(message, error = false) {
  $('#hbh-settings-status span').textContent = message;
  $('#hbh-settings-status').classList.toggle('error', error);
 }
 function render() {
  for (const input of controls) {
   const value = getValue(input.dataset.key);
   if (input.type === 'checkbox') input.checked = !!value;
   else input.value = String(value);
   input.disabled = !ready;
  }
  $('#hbh-custom-colors').hidden = getValue('appearance.preset') !== 'custom';
  $('#hbh-background-opacity').textContent = `${Math.round(Number(getValue('appearance.backgroundOpacity'))*100)}%`;
  const image = getValue('backgroundImage');
  const safeImage = typeof image === 'string' && image.length <= 1600000 && /^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(image) ? image : '';
  if (safeImage !== previewImage) {
   previewImage = safeImage;
   $('#hbh-background-preview').style.backgroundImage = safeImage ? `url("${safeImage}")` : 'none';
   $('#hbh-background-preview').hidden = !safeImage;
   backgroundStatus(safeImage ? '已设置本地图片背景' : '尚未设置图片背景');
  }
  $('#hbh-background-file').disabled = !ready || imageBusy;
  $('#hbh-background-file').parentElement.classList.toggle('busy',imageBusy);
  $('#hbh-background-remove').disabled = !ready || imageBusy || !safeImage;
  $('#hbh-reset-hidden-posts').disabled = !ready;
 }
 async function save(key, value) {
  const generation = ++saveGeneration;
  pending.set(key, {value,generation});
  status('正在保存…');
  render();
  writes = writes.then(async () => {
   const [group, field] = key.split('.');
   try {
    // Merge each change into the latest persisted object so unrelated fields survive.
    const latest = await chrome.storage.local.get(group);
    const next = field ? {...clone(latest[group]), [field]:value} : value;
    if(group==='appearance'&&['preset','accent','pageColor'].includes(field))next.enabled=true;
    await chrome.storage.local.set({[group]:next});
    state[group] = next;
    if (pending.get(key)?.generation === generation) pending.delete(key);
    if (generation === saveGeneration) status('已保存，立即生效');
   } catch (error) {
    if (pending.get(key)?.generation === generation) pending.delete(key);
    if (generation === saveGeneration) status('保存失败，请重试或重新加载扩展', true);
   }
   render();
  });
  return writes;
 }
 for (const input of controls) input.addEventListener('change', () => {
  const key = input.dataset.key;
  const raw = input.type === 'checkbox' ? input.checked : input.value;
   const value = input.type === 'checkbox' || ['appearance.density','appearance.preset','appearance.accent','appearance.pageColor'].includes(key) ? raw : Number(raw);
   if(input.type === 'color' && !/^#[0-9a-f]{6}$/i.test(value)) { render(); return; }
  save(key, value);
 });
 // Keep drag feedback cheap; persist the range only when the user commits the change.
 $('[data-key="appearance.backgroundOpacity"]').addEventListener('input',event=>{
  $('#hbh-background-opacity').textContent=`${Math.round(Number(event.target.value)*100)}%`;
 });
 function backgroundStatus(message,error=false) {
  $('#hbh-background-status').textContent=message;
  $('#hbh-background-status').classList.toggle('error',error);
 }
 function rasterDimensions(buffer,type) {
  const bytes=new Uint8Array(buffer), view=new DataView(buffer), u16=p=>view.getUint16(p), le24=p=>bytes[p]+bytes[p+1]*256+bytes[p+2]*65536;
  if(type==='image/png' && bytes.length>=24 && view.getUint32(0)===0x89504e47 && view.getUint32(4)===0x0d0a1a0a && view.getUint32(12)===0x49484452) return [view.getUint32(16),view.getUint32(20)];
  if(type==='image/jpeg' && bytes[0]===255 && bytes[1]===216) {
   let pos=2;
   while(pos+4<bytes.length) {
    if(bytes[pos++]!==255) break;
    while(bytes[pos]===255)pos++;
    const marker=bytes[pos++];
    if(marker===217||marker===218)break;
    const length=u16(pos);
    if(length<2||pos+length>bytes.length)break;
    if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker) && length>=8) return [u16(pos+5),u16(pos+3)];
    pos+=length;
   }
  }
  if(type==='image/webp' && bytes.length>=30 && view.getUint32(0)===0x52494646 && view.getUint32(8)===0x57454250) {
   const chunk=view.getUint32(12);
   if(chunk===0x56503858) return [le24(24)+1,le24(27)+1];
   if(chunk===0x56503820 && bytes[23]===0x9d && bytes[24]===1 && bytes[25]===0x2a) return [view.getUint16(26,true)&16383,view.getUint16(28,true)&16383];
   if(chunk===0x5650384c && bytes[20]===0x2f) return [1+bytes[21]+((bytes[22]&63)<<8),1+(bytes[22]>>6)+(bytes[23]<<2)+((bytes[24]&15)<<10)];
  }
  throw new Error('图片格式无法识别，请使用有效的 JPG、PNG 或 WebP。');
 }
 function fileDataURL(blob) {
  return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('读取图片失败，请重新选择。'));reader.onabort=()=>reject(new Error('图片读取已取消。'));reader.readAsDataURL(blob);});
 }
 async function prepareBackground(file) {
  if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('仅支持 JPG、PNG 和 WebP 图片。');
  if(!file.size || file.size>8*1024*1024)throw new Error('请选择不超过 8 MB 的图片。');
  const [width,height]=rasterDimensions(await file.arrayBuffer(),file.type);
  if(!width||!height||width>12000||height>12000||width*height>24000000)throw new Error('图片尺寸过大，请先缩小至 2400 万像素以内。');
  const image=new Image(),url=URL.createObjectURL(file);
  try {
   await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('图片无法解码，请更换文件。'));image.src=url;});
   if(image.naturalWidth*image.naturalHeight>24000000||image.naturalWidth>12000||image.naturalHeight>12000)throw new Error('图片尺寸过大，请先缩小后重试。');
   const canvas=document.createElement('canvas');
   const scale=Math.min(1,1920/Math.max(image.naturalWidth,image.naturalHeight));
   canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
   const context=canvas.getContext('2d');if(!context)throw new Error('暂时无法处理图片，请重试。');
   context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
   let blob;
   for(const quality of [.84,.68,.48]) {
    blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',quality));
    if(blob && blob.size<=1150000)break;
   }
   canvas.width=canvas.height=1;
   if(!blob || blob.size>1150000)throw new Error('压缩后的图片仍过大，请选择更小的图片。');
   const data=await fileDataURL(blob);
   if(typeof data!=='string' || data.length>1600000)throw new Error('图片过大，请选择更小的图片。');
   return data;
  } finally { URL.revokeObjectURL(url);image.src=''; }
 }
 $('#hbh-background-file').addEventListener('change',async event=>{
  const input=event.target,file=input.files?.[0];if(!file||imageBusy)return;
  imageBusy=true;render();backgroundStatus('正在处理图片…');
  try {
   const data=await prepareBackground(file);
   await save('appearance.enabled',true);
   if(Number(getValue('appearance.backgroundOpacity'))===0)await save('appearance.backgroundOpacity',.35);
   await save('backgroundImage',data);
   const saved=await chrome.storage.local.get('backgroundImage');
   if(saved.backgroundImage!==data)throw new Error('图片保存失败，可能已超出本机存储空间。请移除旧背景后重试。');
   backgroundStatus('背景已保存到本机，未上传。');
  } catch(error) { backgroundStatus(error.message||'导入失败，请重新选择图片。',true); }
  finally { imageBusy=false;input.value='';render(); }
 });
 $('#hbh-background-remove').addEventListener('click',()=>{
  // The remove button becomes disabled immediately; retain focus inside the dialog.
  $('#hbh-background-file').focus({preventScroll:true});
  save('backgroundImage','');
 });
 $('#hbh-reset-hidden-posts').addEventListener('click',()=>{
  document.dispatchEvent(new CustomEvent('hbh-reset-hidden-posts'));
 });
 document.addEventListener('hbh-hidden-posts-reset',event=>{if(event.detail?.error)status('恢复失败，请重试',true);else status(`已恢复隐藏的帖子${Number.isFinite(event.detail?.count) ? `（${event.detail.count} 条）` : ''}`);});
 chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  for (const key of Object.keys(defaults)) if (changes[key]) {
   loadRevision++;
   state[key] = changes[key].newValue;
  }
  render();
 });
 // Reads that complete after a change notification must not overwrite that newer state.
 async function initialize() {
  const revision = loadRevision;
  try {
   const saved = await chrome.storage.local.get(Object.keys(defaults));
   if (revision === loadRevision) state = saved;
   else for (const key of Object.keys(defaults)) if (!(key in state)) state[key] = saved[key];
   ready = true;
   render();
  } catch (error) { status('无法读取设置，请重新加载扩展', true); }
 }
 function focusable() {
  const closedDetails = [...panel.querySelectorAll('details:not([open])')];
  return [...panel.querySelectorAll('button,select,input,summary,[tabindex="0"]')].filter(el => {
   if (el.disabled || el.closest('[hidden]') || !el.getClientRects().length) return false;
   // Chromium may return rectangles for closed-details descendants even though
   // they cannot receive focus. Only its summary belongs in the tab sequence.
   return !closedDetails.some(details => details.contains(el) && !details.querySelector(':scope > summary')?.contains(el));
  });
 }
 function open() {
  if (opened) return;
  previousFocus = document.activeElement;
  opened = true;
  backdrop.hidden = false;
  trigger.setAttribute('aria-expanded','true');
  $('#hbh-settings-close').focus({preventScroll:true});
 }
 function close() {
  if (!opened) return;
  opened = false;
  backdrop.hidden = true;
  trigger.setAttribute('aria-expanded','false');
  if (previousFocus && previousFocus.isConnected && previousFocus !== host) previousFocus.focus({preventScroll:true});
  else trigger.focus({preventScroll:true});
 }
 trigger.addEventListener('click', open);
 $('#hbh-settings-close').addEventListener('click', close);
 backdrop.addEventListener('click', event => { if(event.target === backdrop) close(); });
 shadow.addEventListener('keydown', event => {
  if (!opened) return;
  if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
  if (event.key === 'Tab') {
   const items = focusable(), first = items[0], last = items[items.length - 1];
   if (!first) { event.preventDefault(); panel.focus(); return; }
   const current = shadow.activeElement;
   if (event.shiftKey && (current === first || current === panel)) { event.preventDefault(); last.focus(); }
   else if (!event.shiftKey && (current === last || current === panel)) { event.preventDefault(); first.focus(); }
  }
 });
 // A focused control may be disabled by an external storage update, returning
 // focus to the page. Escape must still dismiss the open settings dialog.
 document.addEventListener('keydown',event=>{
  if(opened && event.key==='Escape') { event.preventDefault();event.stopPropagation();close(); }
 },true);
 // Prevent background page keyboard shortcuts from acting on settings fields.
 shadow.addEventListener('keydown', event => { if (opened) event.stopPropagation(); });
 document.addEventListener('hbh-open-settings', open);
 chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message?.type === 'hbh:open-settings') { open(); respond({ok:true}); }
 });
 let diagnosticBusy = false;
 async function diagnostics(action) {
  if (diagnosticBusy) return;
  diagnosticBusy = true;
  const buttons = [...shadow.querySelectorAll('.diagnostic-actions button')];
  buttons.forEach(button => button.disabled = true);
  const output = $('#hbh-diagnostic-status');
  output.textContent = action === 'clear' ? '正在清空…' : '正在读取…';
  try {
   const result = await chrome.runtime.sendMessage({type:'hbh:diagnostics',action:action === 'clear' ? 'clear' : 'report'});
   if (!result?.ok) throw new Error(result?.error || '读取失败');
   if (action === 'clear') { output.textContent = '记录已清空'; return; }
   const report = result.report;
   if (!report || typeof report !== 'object') throw new Error('报告暂时不可用');
   const eventCount = Array.isArray(report.events) ? report.events.length : 0;
   const cookieCount = Array.isArray(report.cookies) ? report.cookies.length : 0;
   output.textContent = `本地事件 ${eventCount} 条 · 登录标记 ${cookieCount} 项\n登录标记存在不代表会话仍然有效。`;
   if (action === 'export') {
    const blob = new Blob([JSON.stringify(report,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = 'heybox-session-report.json';
    shadow.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url),10000);
    output.textContent += '\n报告已导出。';
   }
  } catch (error) { output.textContent = '诊断暂不可用，请重新加载扩展后重试。'; }
  finally { diagnosticBusy = false; buttons.forEach(button => button.disabled = false); }
 }
 $('#hbh-diagnostics').addEventListener('toggle', event => { if (event.target.open) diagnostics('report'); });
 $('#hbh-report-refresh').addEventListener('click', () => diagnostics('report'));
 $('#hbh-report-export').addEventListener('click', () => diagnostics('export'));
 $('#hbh-report-clear').addEventListener('click', () => diagnostics('clear'));
 render();
 initialize();
 if (new URLSearchParams(location.search).get('hbh_settings') === '1') open();
})();
