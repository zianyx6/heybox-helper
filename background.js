const names = new Set(['user_pkey', 'user_heybox_id', 'x_xhh_tokenid']);
let queue = Promise.resolve();
chrome.cookies.onChanged.addListener(({ cookie, removed, cause }) => {
  if (!names.has(cookie.name) || !/(^|\.)xiaoheihe\.cn$/.test(cookie.domain.replace(/^\./, ''))) return;
  // Store only attributes: never copy the cookie value into logs or messages.
  const event = {
    time: new Date().toISOString(), name: cookie.name, domain: cookie.domain,
    path: cookie.path, removed, cause, session: cookie.session,
    expires: cookie.expirationDate || null, httpOnly: cookie.httpOnly,
    secure: cookie.secure, sameSite: cookie.sameSite
  };
  queue = queue.then(async () => {
    const { events = [] } = await chrome.storage.local.get('events');
    await chrome.storage.local.set({ events: [...events, event].slice(-200) });
  }).catch(() => {});
});

async function diagnosticReport() {
  await queue;
  const cookies = (await chrome.cookies.getAll({ domain: 'xiaoheihe.cn' })).filter(cookie => names.has(cookie.name));
  const { events = [] } = await chrome.storage.local.get('events');
  return {
    version: chrome.runtime.getManifest().version,
    generatedAt: new Date().toISOString(),
    notice: 'Cookie 存在不代表服务器仍认可登录；报告不包含 Cookie 值。',
    cookies: cookies.map(cookie => ({
      name: cookie.name, domain: cookie.domain, path: cookie.path,
      session: cookie.session, expires: cookie.expirationDate ? new Date(cookie.expirationDate * 1000).toISOString() : null,
      httpOnly: cookie.httpOnly, secure: cookie.secure, sameSite: cookie.sameSite
    })),
    events
  };
}

chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message?.type !== 'hbh:diagnostics') return;
  if (sender.id !== chrome.runtime.id) { respond({ ok: false, error: '无法验证扩展来源' }); return; }
  (async () => {
    if (message.action === 'report') return { ok: true, report: await diagnosticReport() };
    if (message.action === 'clear') {
      // Serialize clearing with writes so an earlier event cannot reappear after clearing.
      queue = queue.then(() => chrome.storage.local.remove('events'));
      await queue;
      return { ok: true };
    }
    throw new Error('不支持的诊断操作');
  })().then(respond, error => respond({ ok: false, error: error.message }));
  return true;
});
