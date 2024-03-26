import Link from 'next/link';
import style from '../styles/Error404.module.css';
import Image from 'next/image';
import errorImage from '/public/fantasma.png';

export default function NotFound() {
  return (
    <main className={style.main}>
      <section className={style.container}>
        <div className={style.image}>
          <Image width={errorImage.width} height={errorImage.height} src={errorImage} alt="Fantasma!!!" />
        </div>
        <div className={style.content}>
          <h2>Esta página é um fantasma!</h2>
          <p>Oops! Você encontrou um fantasma digital. Estamos trabalhando para trazê-lo de volta. </p>
          <Link href="/">Ir para pagina inicial</Link>
        </div>
      </section>
    </main>
  )
}