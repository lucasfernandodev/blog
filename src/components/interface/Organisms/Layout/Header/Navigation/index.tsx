import Link from '@/infra/Link';
import style from './style.module.css';
import { useEffect, useState } from 'react';

interface NavigationProps {
  visivility: boolean;
  tab: string;
  onClick: () => void;
}

const routes = [
  {
    title: 'Front-end',
    slug: '/tags/front-end',
  },
  {
    title: 'Back-end',
    slug: '/tags/back-end',
  },
  {
    title: 'Noticias',
    slug: '/tags/noticias',
  },
  {
    title: 'UI',
    slug: '/tags/ui',
  },
  {
    title: 'UX',
    slug: '/tags/ux',
  },
];

export function Navigation({ visivility, onClick, tab }: NavigationProps) {
  let timer: any = null;
  const [isVisible, setIsVisible] = useState<boolean>(visivility);

  useEffect(() => {
    setIsVisible(visivility);
  }, [visivility]);

  function closeNav() {
    timer = setTimeout(() => {
      onClick();
      clearTimeout(timer);
    }, 500);
  }

  const NavClassName = `${style.navigation} ${
    isVisible ? style.visibled : ' '
  }`;

  const activeLink = (url: string, pathname: string) =>
    pathname === url ? style.active : '';

  return (
    <nav className={NavClassName} aria-label='menu'>
      <div className={style['nav-curtain']} onClick={closeNav}></div>
      <ul id='main-menu' className={style.navMenu}>
        {routes.map(({ title, slug }) => {
          const className = [style.menuItem, activeLink(slug, tab)].join(' ');

          return (
            <li key={title} className={className}>
              <Link href={slug} onClick={closeNav} prefetch={false}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
