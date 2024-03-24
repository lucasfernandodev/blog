import Link from 'next/link';
import style from './style.module.css';
import Image from 'next/image';
import IconInstagram from '@/assets/icons/instagram';
import IconGithub from '@/assets/icons/github';
import IconLinkedin from '@/assets/icons/linkedin';

export const Footer = async () => {
  return (
    <footer className={style.footer}>
      <div className={style.container_brand}>
        <Link href="/" className={style.brand}>
          <Image width={24} height={24} src="/logo.svg" alt="Blog - Lucas Fernando" />
        </Link>
        <span>Feito com <strong>❤️</strong> por Lucas Fernando.</span>
      </div>
      <ul className={style.container_social}>
        <li className={style.item}>
          <Link target='_blank' href="https://www.instagram.com/lucasfernandodev/">
            <IconInstagram />
          </Link>
        </li>
        <li className={style.item}>
          <Link target='_blank' href="https://github.com/lucasfernandodev">
            <IconGithub />
          </Link>
        </li>
        <li className={style.item}>
          <Link target='_blank' href="https://www.linkedin.com/in/frontlucasfernandodev">
            <IconLinkedin />
          </Link>
        </li>
      </ul>
    </footer>
  )
}