'use client'
import style from './style.module.css';
import IconMoon from "@/assets/icons/moon";
import IconSun from '@/assets/icons/sun';
import { setCookie } from 'cookies-next';
import { FC, useState } from "react"

interface Props {
  theme: string
}


export const ThemeSwicher: FC<Props> = ({ theme }) => {
  const [_theme, setTheme] = useState(theme);

  const toggleTheme = () => {
    const root = document.getElementsByTagName('html')[0];
    if (root.classList.contains('dark-mode')) {
      setTheme('light-mode')
      setCookie('theme', 'light-mode')
      root.classList.add('light-mode')

      root.classList.remove('dark-mode')
    } else {
      setTheme('dark-mode')
      setCookie('theme', 'dark-mode')
      root.classList.add('dark-mode')

      root.classList.remove('light-mode')
    }
  }

  return (
    <button onClick={toggleTheme} className={style.toggleTheme}>
      {_theme === 'dark-mode' ? <IconMoon /> : <IconSun />}
    </button>
  )
}