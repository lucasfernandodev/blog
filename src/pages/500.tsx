import style from '../../styles/pages/404.module.css';
import Layout from "../components/Layout";
import Link from '../components/Utils/Link';

const Custom500 = () => {
  return(
    <Layout
      title='Oops! Ocorreu um erro!'
      hero={{
        hide: true,
      }}
    >

      <div className={style.wrapper}>
      <div className={style.containerAction}>
        <h1>Oops! Ocorreu um erro!</h1>
        <p>Fiquei tranquilo, estamos cientes e trabalhando na correção.</p>
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

        </div>
      </div>
    </Layout>
  )
};

export default Custom500;