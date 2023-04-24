import { useRouter } from 'next/router';
import Link from '@/infra/Link';
import style from './style.module.css';
import { useEffect, useState } from 'react';

interface NavigationProps {
  visivility: boolean;
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

export function Navigation({ visivility, onClick }: NavigationProps) {
  let timer: any = null;
  const { asPath } = useRouter();
  const [isVisible, setIsVisible] = useState<any>(visivility);

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

  return (
    <nav className={NavClassName} aria-label='menu'>
      <div className={style['nav-curtain']} onClick={closeNav}></div>
      <ul id='main-menu' className={style.navMenu}>
        {routes.map((route) => {
          const className = [
            style.menuItem,
            asPath == route.slug ? style.active : '',
          ].join(' ');

          return (
            <li key={route.title} className={className}>
              <Link href={route.slug} onClick={closeNav} prefetch={false}>
                {route.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
