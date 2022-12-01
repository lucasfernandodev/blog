import Link from '@/infra/Link';
import Container from '../Container';
import style from './style.module.css';
import dynamic from 'next/dynamic';
import { Navigation } from './Navigation';
import { Menu } from 'src/lib/icons';
import { useState } from 'react';

const ThemeToggle = dynamic(() => import('../../../Atons/ToggleTheme'), {
  ssr: false,
});

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleChange() {
    setIsVisible(!isVisible);
  }

  return (
    <header className={style.header}>
      <Container width='md'>
        <div className={style.content}>
          <button
            onClick={handleChange}
            aria-controls='main-menu'
            aria-expanded={isVisible}
            className={style.toggle}
          >
            <Menu aria-hidden='true' focusable='false' />
          </button>
          <div className={style.brand}>
            <Link href='/'>
              <h2>Blog</h2>
            </Link>
          </div>
          <Navigation visivility={isVisible} onClick={handleChange} />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
