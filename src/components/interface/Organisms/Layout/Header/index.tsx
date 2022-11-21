import Link from '@/infra/Link';
import Container from '../Container';
import style from './style.module.css';
import dynamic from 'next/dynamic';
import { Navigation } from './Navigation';

const ThemeToggle = dynamic(() => import('../../../Atons/ToggleTheme'), {
  ssr: false,
});

const Header = () => {
  return (
    <header className={style.header}>
      <Container width='md'>
        <div className={style.content}>
          <div className={style.brand}>
            <Link href='/'>
              <h2>Blog</h2>
            </Link>
          </div>
          <Navigation />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
