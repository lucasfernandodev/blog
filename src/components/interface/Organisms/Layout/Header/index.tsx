import Container from '../Container';
import style from './style.module.css';
import dynamic from 'next/dynamic';
import { Navigation } from './Navigation';
import { Menu } from 'src/lib/icons';
import { FC, useState } from 'react';
import Link from '@/infra/Link';

const ThemeToggle = dynamic(() => import('../../../Atons/ToggleTheme'), {
  ssr: false,
});

interface HeaderProps {
  tab: string;
}

const Header: FC<HeaderProps> = ({ tab }) => {
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
            <Menu aria-hidden={true} focusable='false' />
            <span className={style.hiddenText}>Menu</span>
          </button>

          <Link href='/'>
            <h2>Blog</h2>
          </Link>
          <Navigation tab={tab} visivility={isVisible} onClick={handleChange} />
          <div style={{ width: '34px', height: '34px' }}>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
