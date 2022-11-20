import style from '../../styles/pages/404.module.css';
import Layout from '../components/Layout';
import Link from '../components/Utils/Link';

const Custom404 = () => {
  return(
    <Layout
      title='Pagina não encontrada'
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
          <div className={style.statusError}>404</div>
        </div>
      </div>
    </Layout>
  );
};

export default Custom404;