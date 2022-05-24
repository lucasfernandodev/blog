;(() => {
  var theme = localStorage.getItem('AETER_THEME') || 'dark'
  const currentTheme = theme === 'dark' ? true : false;

  currentTheme === true ? document.querySelector('html')?.classList.add("isDarkTheme") : document.querySelector('html')?.classList.remove("isDarkTheme")
})()