(() => { let e = localStorage.getItem('THEME') || 'dark', s = document.documentElement; 'dark' === e ? s?.classList.add('isDarkTheme') : s?.classList.remove('isDarkTheme'); })();
