import { useState, useEffect, useRef } from 'react';
import Link from '../../Utils/Link';
import Container from '../Container';
import style from './style.module.css';
import {useRouter} from 'next/router';
import dynamic from "next/dynamic" ; 

const ThemeToggle = dynamic (() => import ( "../../ToggleTheme" ) , {    
  ssr : false, 
} ) ;

import aeterLogo from '../../../../public/images/Icon.svg';

const Header = () => {

 
  const [currentTab, setCurrentTab] = useState<null | string>(null)
  const currentUrl = useRouter();
  const {slug} = currentUrl.query;

  const wrapperRef = useRef<HTMLDivElement>(null)


  

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


  function toggleTab(e: React.MouseEvent<HTMLLIElement, MouseEvent>){
    const element = e.currentTarget as any;
    const idTab = element.getAttribute('id');
    setCurrentTab(idTab)
  }


  return (
    <header className={style.header}>

        <Container width='md'>
        <div className={style.content} ref={wrapperRef}>
          <div className={style.brand}>
            <Link href="/">
              <h2><img src={aeterLogo.src} alt="aeter"/></h2>
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

        <ThemeToggle />
        </div>
        </Container>
    </header>
  )
};

export default Header;