import Link from 'next/link';
import style from './style.module.css';
import Image from 'next/image';
import { ownerLinks } from '@/utils/owner-links';

export const Footer = async () => {
  return (
    <footer className={style.footer}>
      <div className={style.container_brand}>
        <Link href="/" className={style.brand}>
          <Image width={24} height={24} src="/logo.svg" alt="Blog - Lucas Fernando" />
        </Link>
        <span>Feito com <strong>❤️</strong> por <Link href={ownerLinks.portfolio}>Lucas Fernando</Link>.</span>
      </div>
    </footer>
  )
}