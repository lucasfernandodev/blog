import style from '../../styles/pages/404.module.css';
import Layout from "../components/Layout";
import robot from '../../public/images/bgEffect.svg';
import Link from '../components/Utils/Link';

const Error404 = () => {
  return(
    <Layout
      title='Pagina não encontrada'
      hero={{
        hide: true,
      }}
    >

      <div className={style.wrapper}>
      <div className={style.containerAction}>
        <h1>Nenhuma pagina foi encontrada!</h1>
      <Link href="/" className={style.button}>
        Voltar ao inicio
      </Link>
      </div>
        <div className={style.containerIlustration}>
          <span className={style.stars}>
          <span className={style.sparkle}></span>
          <span className={style.sparkle2}></span>
          <span className={style.sparkle3}></span>

          </span>
          <img src={robot.src} alt="robot"/>
        </div>
      </div>
    </Layout>
  )
};

export default Error404;