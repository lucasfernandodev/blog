import { useRouter } from 'next/router';
import Link from '../../../Utils/Link';
import style from './style.module.css';

export function Navigation() {
  const { query } = useRouter();

  function toggleTab(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {}

  const routes = ['noticias', 'front-end', 'back-end'];

  return (
    <nav className={style.navigation}>
      <ul className={style.navMenu}>
        {routes.map((route) => {

          const className = [
            style.menuItem,
            query.slug == route ? style.active : '',
          ].join(' ');

          return (
            <li key={route} className={className} onClick={(e) => toggleTab(e)}>
              <Link href={`/tags/${route}`}>{route.replace('-', ' ')}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
