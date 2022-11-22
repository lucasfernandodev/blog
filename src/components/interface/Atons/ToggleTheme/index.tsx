import style from './style.module.css';

import { Moon, Sun } from '../../../../lib/icons';
import { useEffect, useState } from 'react';

const ToggleTheme = () => {
  const theme = localStorage.getItem('THEME') || 'dark';
  const currentTheme: boolean = theme === 'dark' ? true : false;

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(currentTheme);

  useEffect(() => {
    const theme = localStorage.getItem('THEME') || 'dark';
    const currentTheme: boolean = theme === 'dark' ? true : false;
    setIsDarkTheme(currentTheme);
  }, []);

  useEffect(() => {
    if (document.documentElement) {
      isDarkTheme === true
        ? document.documentElement?.classList.add('isDarkTheme')
        : document.documentElement?.classList.remove('isDarkTheme');
    }
  }, [isDarkTheme]);

  function toggleTheme() {
    const themePrev = isDarkTheme;
    setIsDarkTheme(!isDarkTheme);

    const theme = !themePrev ? 'dark' : 'ligth';

    window.localStorage.setItem('THEME', theme);
  }

  return (
    <button 
      aria-label="dark mode toggle" 
      className={style.toggleTheme} 
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDarkTheme}
    >
      {isDarkTheme ? <Moon /> : <Sun />}
    </button>
  );
};

export default ToggleTheme;
