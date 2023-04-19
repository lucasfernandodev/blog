import Link from '@/infra/Link';
import style from './style.module.css';
export const Author = () => {
  return (
    <Link className={style.author} href='https://github.com/lucasfernandodev/'>
      Lucas Fernando
    </Link>
  );
};
