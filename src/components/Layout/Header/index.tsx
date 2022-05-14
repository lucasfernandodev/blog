import { IconMoon, IconSun } from '@tabler/icons';
import { useState } from 'react';
import Link from '../../Utils/Link';
import Container from '../Container';
import style from './style.module.css';

const Header = () => {

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  function toggleTheme () {
    setIsDarkTheme(!isDarkTheme)
    
    document.querySelector('html')?.classList.toggle("isDarkTheme")
  };


  return (
    <header className={style.header}>

        <Container width='md'>
        <div className={style.content}>
          <div className="brand">
            <h2>Blog</h2>
          </div>
          <nav className={style.navigation}>
            <ul className={style.navMenu}>
              <li className={style.menuItem}>
                <Link href='/categorias/front-end' >
                  Front-end
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link href='/categorias/back-end' >
                  Back-end
                </Link>
              </li>
              <li className={style.menuItem}>
                <Link href='/categorias/bugs' >
                  Bugs
                </Link>
              </li>
            </ul>
          </nav>

          <button className={style.toggleTheme} onClick={toggleTheme}>
            {isDarkTheme ? <IconMoon /> : <IconSun />}
          </button>
        </div>
        </Container>
    </header>
  )
};

export default Header;