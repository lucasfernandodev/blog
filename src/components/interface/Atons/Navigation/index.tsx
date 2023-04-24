import { useEffect, useState } from 'react';
import Link from '@/infra/Link';
import style from './style.module.css';
import { routes } from 'config/routes';

interface NavigationProps {
  show: boolean;
  tab: string;
  onClick: () => void;
}

export function Navigation({ show, onClick, tab }: NavigationProps) {
  let timer: any = null;
  const [isVisible, setIsVisible] = useState<boolean>(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  function closeNav() {
    timer = setTimeout(() => {
      onClick();
      clearTimeout(timer);
    }, 500);
  }

  const NavClassName = `${style.nav} ${isVisible ? style.visibled : ' '}`;

  const activeLink = (url: string, pathname: string) =>
    pathname === url ? style.active : '';

  return (
    <nav className={NavClassName} aria-label='menu' data-show={isVisible}>
      <div className={style.curtain} onClick={closeNav}></div>
      <ul className={style.menu}>
        {routes.map(({ title, slug }) => {
          const className = [style.menuItem, activeLink(slug, tab)].join(' ');

          return (
            <li key={slug} className={className}>
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
