import { useState, useEffect, useRef } from 'react';
import Link from '../../Utils/Link';
import Container from '../Container';
import style from './style.module.css';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import aeterLogo from '../../../../public/images/Icon.svg';
import Image from '../../Utils/Image';

const ThemeToggle = dynamic(() => import('../../ToggleTheme'), {
  ssr: false,
});


const Header = () => {
  const [currentTab, setCurrentTab] = useState<null | string>(null);
  const currentUrl = useRouter();
  const slug = currentUrl.query.slug;

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof slug !== 'undefined') {
      
      const tab: string[] = ['front-end', 'back-end', 'bugs'];

      const result = tab.find((tab) => tab === slug);

      if (typeof result !== 'undefined') {
        setCurrentTab(result);
      }
    }
  }, [slug]);

  useEffect(() => {
    if (wrapperRef.current && currentTab !== null) {
      const Tabs = wrapperRef.current.getElementsByTagName('li');
      const Tab =
        currentTab !== null ? document.getElementById(currentTab) : null;

      if (Tab !== null && typeof Tab !== 'undefined') {
        Array.from(Tabs).forEach((element) =>
          element.classList.remove(style.active)
        );

        Tab.classList.add(style.active);
      }
    }
  }, [currentTab, slug]);

  function toggleTab(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const element = e.currentTarget as any;
    const idTab = element.getAttribute('id');
    setCurrentTab(idTab);
  }

  return (
    <header className={style.header}>
      <Container width='md'>
        <div className={style.content} ref={wrapperRef}>
          <div className={style.brand}>
            <Link href='/'>
              <h2>
                <Image src={aeterLogo.src} alt='alter' />
              </h2>
            </Link>
          </div>
          <nav className={style.navigation}>
            <ul className={style.navMenu}>
              <li
                className={style.menuItem}
                id='front-end'
                onClick={(e) => toggleTab(e)}
              >
                <Link href='/tags/front-end'>Front-end</Link>
              </li>
              <li
                className={style.menuItem}
                id='back-end'
                onClick={(e) => toggleTab(e)}
              >
                <Link href='/tags/back-end'>Back-end</Link>
              </li>
              <li
                className={style.menuItem}
                id='bugs'
                onClick={(e) => toggleTab(e)}
              >
                <Link href='/tags/bugs'>Bugs</Link>
              </li>
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
