const home = 'https://www.xiaoheihe.cn/app/bbs/home';
const status = document.getElementById('status');
document.getElementById('version').textContent = `版本 ${chrome.runtime.getManifest().version}`;
document.getElementById('open-site').onclick = () => chrome.tabs.create({ url: home });
document.getElementById('open-settings').onclick = async () => {
  const button = document.getElementById('open-settings');
  button.disabled = true;
  try {
    const tabs = await chrome.tabs.query({ url: ['https://www.xiaoheihe.cn/*', 'https://xiaoheihe.cn/*'] });
    const tab = tabs.sort((a,b) => Number(b.active)-Number(a.active) || (b.lastAccessed||0)-(a.lastAccessed||0))[0];
    if (!tab) { await chrome.tabs.create({ url: `${home}?hbh_settings=1` }); window.close(); return; }
    await chrome.tabs.update(tab.id, { active: true });
    if (tab.windowId != null) await chrome.windows.update(tab.windowId, { focused: true });
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'hbh:open-settings' });
      window.close();
    } catch {
      status.textContent = '请刷新小黑盒页面，再点击页面右下角的“设置”。';
    }
  } catch (error) {
    status.textContent = `打开失败：${error.message}`;
  } finally { button.disabled = false; }
};
