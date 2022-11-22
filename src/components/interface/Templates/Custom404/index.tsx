import Link from '@/infra/Link';
import style from '@/stylePage/404.module.css';

export function TemplateCustom404() {
  return (
    <div className={style.wrapper}>
      <div className={style.containerAction}>
        <h1>Nenhuma pagina foi encontrada!</h1>
        <Link href='/' className={style.button}>
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
  );
}
