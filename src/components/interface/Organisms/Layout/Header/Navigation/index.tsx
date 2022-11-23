import { useRouter } from 'next/router';
import Link from '@/infra/Link';
import style from './style.module.css';
import { useEffect, useState } from 'react';

interface NavigationProps{
  visivility: boolean,
  onClick: () => void
}

export function Navigation({visivility,onClick}: NavigationProps) {
  const { query } = useRouter();
  const [isVisible, setIsVisible] = useState<any>(visivility);
  const routes = ['noticias', 'front-end', 'back-end'];
  
  useEffect(() => {
    setIsVisible(visivility);
  }, [visivility]);

  function closeNav(){
    let timer: any = null;
    timer = setTimeout(() => {
      onClick();
      clearTimeout(timer);
    }, 500);
  }


  const className = `${style.navigation} ${isVisible ? style.visibled : ' '}`;

  return (
    <nav className={className} role="navigation" aria-label="menu">
      <div className={style['nav-curtain']} onClick={closeNav}></div>
      <ul id="main-menu" className={style.navMenu}>
        {routes.map((route) => {
          const className = [
            style.menuItem,
            query.slug == route ? style.active : '',
          ].join(' ');

          return (
            <li key={route} className={className}>
              <Link href={`/tags/${route}`}
                onClick={closeNav}
              >
                {route.replace('-', ' ')}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
