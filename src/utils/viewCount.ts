export const viewCount = {
  get: () => {
    return window.localStorage.getItem('blog-views-register')
  },
  set: () => {
    const date = new Date();
    const expiresAt = { expiresAt: (date.setHours(date.getHours() + 24)) }
    window.localStorage.setItem('blog-views-register', JSON.stringify(expiresAt));
  },
  isExpiredTime: ({ expiresAt }: { expiresAt: Date }) => {
    if (!expiresAt) return;
    const isExpired = expiresAt.valueOf() - new Date().valueOf()
    return isExpired <= 0 ? true : false;
  }
}