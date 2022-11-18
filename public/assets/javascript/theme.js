;(() => {
  let theme = localStorage.getItem('THEME') || 'dark';

  const doc = document.documentElement;

  theme === 'dark' ? doc?.classList.add('isDarkTheme') : doc?.classList.remove('isDarkTheme');
})();