import { IconMoon, IconSun } from '@tabler/icons';
import { useState, useEffect, useRef } from 'react';
import Link from '../../Utils/Link';
import Container from '../Container';
import style from './style.module.css';
import {useRouter} from 'next/router';
import { parseCookies, setCookie } from 'nookies';


const Header = () => {


  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<null | string>(null)
  const currentUrl = useRouter();
  const {slug} = currentUrl.query;

  const wrapperRef = useRef<HTMLDivElement>(null)

 

  useEffect(() => {
    const {EATER_THEME} = parseCookies();
    if(typeof EATER_THEME !== 'undefined'){
      EATER_THEME === 'dark' ? setIsDarkTheme(true) : setIsDarkTheme(false)
    }
  }, [])
  

  useEffect(() => {
    if(typeof slug !== 'undefined'){

      const pathname = currentUrl.asPath.replace(slug as string, "").replaceAll("/","");

      if(pathname === 'categorias'){
        const tab: string[] = ["front-end" , "back-end" , 'bugs'];
        const result = tab.find(value => value === slug as unknown as string);
    
        if(typeof result !== 'undefined'){
          setCurrentTab(result)
        }
      }
    }
  },[slug, currentUrl.asPath])



  useEffect(() => {

    if(wrapperRef.current){
      const Tabs = wrapperRef.current.getElementsByTagName('li');
      const Tab = currentTab !== null ? document.getElementById(currentTab) : null;

      if(Tab !== null && typeof Tab !== 'undefined'){
        Array.from(Tabs).forEach(element => element.classList.remove(style.active));

        Tab.classList.add(style.active);
      }
    }
  },[currentTab, slug])

  useEffect(() => {
    if(window){
      isDarkTheme === true ?document.querySelector('html')?.classList.add("isDarkTheme") : document.querySelector('html')?.classList.remove("isDarkTheme")
    }
  }, [isDarkTheme])

  function toggleTab(e: React.MouseEvent<HTMLLIElement, MouseEvent>){
    const element = e.currentTarget as any;
    const idTab = element.getAttribute('id');
    setCurrentTab(idTab)
  }


  function toggleTheme () {
    const themePrev = isDarkTheme;
    setIsDarkTheme(!isDarkTheme)

    const theme = !themePrev ? 'dark' : 'ligth';

    setCookie(null, 'EATER_THEME', theme,{
      path: '/',
      maxAge: 86400 * 4
    })
  };


  return (
    <header className={style.header}>

        <Container width='md'>
        <div className={style.content} ref={wrapperRef}>
          <div className="brand">
            <Link href="/">
              <h2>Blog</h2>
            </Link>
          </div>
          <nav className={style.navigation}>
            <ul className={style.navMenu}>
              <li className={style.menuItem} id="front-end" onClick={e => toggleTab(e)}>
                <Link href='/categorias/front-end' >
                  Front-end
                </Link>
              </li>
              <li className={style.menuItem} id="back-end" onClick={e => toggleTab(e)}>
                <Link href='/categorias/back-end'>
                  Back-end
                </Link>
              </li>
              <li className={style.menuItem} id="bugs" onClick={e => toggleTab(e)}>
                <Link href='/categorias/bugs'>
                  Bugs
                </Link>
              </li>
            </ul>
          </nav>

          <button className={style.toggleTheme} onClick={toggleTheme}>
            {isDarkTheme ? <IconMoon /> : <IconSun />}
          </button>
        </div>
        </Container>
    </header>
  )
};

export default Header;