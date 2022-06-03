;(() => {
  let theme = localStorage.getItem('AETER_THEME') || 'dark';

  const doc = document.documentElement;

  theme === 'dark' ? doc?.classList.add('isDarkTheme') : doc?.classList.remove('isDarkTheme');
})();