import Image from 'next/image';
import style from './style.module.css';
import Link from 'next/link';
import IconGithub from '@/assets/icons/github';
import IconLinkedin from '@/assets/icons/linkedin';
import IconInstagram from '@/assets/icons/instagram';
import { ownerLinks } from '@/utils/owner-links';

export const Header = () => {
  return (
    <header className={style.header}>
      <Link href="/" className={style.brand}>
        <Image width={24} height={24} src="/logo.svg" alt="Blog - Lucas Fernando" />
        <span>Blog</span>
      </Link>

      <ul className={style['menu-social']}>
        <li>
          <Link target='_blank' href={ownerLinks.github}><IconGithub /></Link>
        </li>
        <li>
          <Link target='_blank' href={ownerLinks.linkedin}><IconLinkedin /></Link>
        </li>
        <li>
          <Link target='_blank' href={ownerLinks.instagram}><IconInstagram /></Link>
        </li>
      </ul>
    </header>
  )
}