import Image from 'next/image';
import style from './style.module.css';
import IconSearch from '@/assets/icons/search';
import Link from 'next/link';

export const Header = () => {

  return (
    <header className={style.header}>
      <Link href="/" className={style.brand}>
        <Image width={24} height={24} src="/logo.svg" alt="Blog - Lucas Fernando" />
      </Link>
      <form action="#" className={style.form_search}>
        <input placeholder="Pesquisar..." type="search" />
        <button type="submit">
          <IconSearch />
        </button>
      </form>
    </header>
  )
}