import Link from '@/infra/Link';
import style from '@/stylePage/404.module.css';

export function TemplateCustom404() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Nenhuma pagina foi encontrada!</h1>
        <Link href='/' className={style.button}>
          Voltar ao inicio
        </Link>
      </div>
      <div className={style.containerIlustration}>
        <span className={style.stars}>
          <span className={[style.skl, style.sparkle].join(' ')}></span>
          <span className={[style.skl, style.sparkle2].join(' ')}></span>
          <span className={[style.skl, style.sparkle3].join(' ')}></span>
        </span>
        <div className={style.statusError}>404</div>
      </div>
    </div>
  );
}
