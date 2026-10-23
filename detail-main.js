(() => {
  // Read public display data only; no requests or changes to Vue state.
  function propsFor(el, read) {
    if (!el) return null;
    let value = read(el.__vnode?.props), instance = el.__vueParentComponent;
    for (let depth = 0; !value && instance && depth < 10; depth++, instance = instance.parent) value = read(instance.props) || read(instance.vnode?.props);
    return value;
  }
  const numeric = value => /^\d{1,20}$/.test(String(value)) ? String(value) : '';
  const imageURL = value => { try { const url = new URL(value);return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  function queryClient() {
    const app = [...document.querySelectorAll('[data-v-app]')].map(el => el.__vue_app__).find(Boolean);
    const provides = app?._context?.provides;
    if (!provides) return null;
    // Vue Query provides its existing client on the app. Reading the cache does
    // not create observers, import modules, request account data or read tokens.
    for (const key of Reflect.ownKeys(provides)) {
      if (!String(key).includes('QUERY_CLIENT')) continue;
      const value = provides[key];if (typeof value?.getQueryData === 'function' && typeof value?.getQueriesData === 'function') return value;
    }
    return null;
  }
  function plain(value) { const el = document.createElement('div');el.innerHTML = String(value || '');return el.textContent.trim(); }
  function creatorId(el) {
    if (!el.matches('.content-management-home__content')) return '';
    const title = el.querySelector('.creator-content-item__title')?.textContent.trim();if (!title) return '';
    const candidates = new Set();let visited = 0;
    for (const [,data] of (queryClient()?.getQueriesData({queryKey:['user_profile']}) || []).slice(0, 25)) {
      for (const page of (data?.pages || []).slice(0, 20)) for (const article of (page?.articles || []).slice(0, 100)) {
        if (++visited > 2000) return '';
        if (plain(article.title) === title && numeric(article.link_id)) candidates.add(String(article.link_id));
      }
    }
    return candidates.size === 1 ? [...candidates][0] : '';
  }
  document.addEventListener('hbh-detail-post-request', event => {
    const token = event.detail;
    if (typeof token !== 'string' || !/^hbh-detail-\d+$/.test(token)) return;
    const el = document.querySelector(`[data-hbh-detail-request="${token}"]`);
    if (!el?.matches('.content-management-home__content,.user-profile-moment-item,.hb-cpt__bbs-list-content,.hb-cpt__moment-list-content')) return;
    const id = propsFor(el, props => numeric(props?.article?.link_id) || numeric(props?.link?.linkid) || numeric(props?.moment?.linkid) || numeric(props?.moment?.link?.linkid)) || creatorId(el);
    document.dispatchEvent(new CustomEvent('hbh-detail-post-result', { detail: JSON.stringify({ token, id }) }));
  });
  document.addEventListener('hbh-detail-identity-request', () => {
    const nav = document.querySelector('.nav-user-avatar');
    const client = queryClient();
    const account = propsFor(nav, props => props?.user?.account_detail?.userid ? props.user.account_detail : null) || client?.getQueryData(['user'])?.account_detail;
    const clear = () => document.dispatchEvent(new CustomEvent('hbh-detail-identity-result', { detail: JSON.stringify({ userId:'',avatar:'',name:'',comments:[] }) }));
    if (!account) { clear();return; }
    const userId = numeric(account.userid), avatar = imageURL(account.avatar);
    if (!userId || !avatar) { clear();return; }
    const comments = [];let visited = 0;
    for (const el of [...document.querySelectorAll('.link-comment [data-comment-id]')].slice(0, 250)) {
      const comment = propsFor(el, props => props?.comment?.temp_new === true ? props.comment : null);
      // Native successful-send marks temp_new. Match the account too, so another
      // author's missing avatar can never be replaced with the current user's.
      if (comment && numeric(comment.user?.userid) === userId && numeric(comment.commentid)) comments.push(String(comment.commentid));
    }
    const postId = location.pathname.match(/^\/app\/bbs\/link\/(\d+)/)?.[1];
    cache: if (postId) for (const [key,data] of (client?.getQueriesData({queryKey:['link_tree']}) || []).slice(0, 30)) {
      if (String(key[1]) !== postId) continue;
      for (const page of (data?.pages || []).slice(0, 30)) for (const floor of (page?.comments || []).slice(0, 100)) for (const comment of (floor?.comment || []).slice(0, 100)) {
        if (++visited > 2000) break cache;
        if (comment.temp_new === true && numeric(comment.user?.userid) === userId && numeric(comment.commentid)) comments.push(String(comment.commentid));
      }
    }
    document.dispatchEvent(new CustomEvent('hbh-detail-identity-result', { detail: JSON.stringify({ userId, avatar, name: String(account.username || '').slice(0, 100), comments }) }));
  });
  document.dispatchEvent(new Event('hbh-detail-bridge-ready'));
})();
