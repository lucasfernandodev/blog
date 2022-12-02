import style from './style.module.css';

export function Description({ children }: { children: React.ReactNode }) {
  return <p className={style.description}>{children}</p>;
}
