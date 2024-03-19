import Image from 'next/image';
import style from './style.module.css';
import IconMoon from '@/assets/icons/moon';
import IconSearch from '@/assets/icons/search';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.brand}>
        <Image width={24} height={24} src="/logo.svg" alt="Blog - Lucas Fernando" />
      </div>
      <form action="#" className={style.form_search}>
        <input placeholder="Pesquisar..." type="search" />
        <button type="submit">
          <IconSearch />
        </button>
      </form>
      <button className={style.toggleTheme}>
        <IconMoon />
      </button>
    </header>
  )
}