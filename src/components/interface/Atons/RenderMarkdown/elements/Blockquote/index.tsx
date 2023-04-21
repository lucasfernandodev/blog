import style from './style.module.css';

const Blockquote = ({ children }: any) => {
  return <blockquote className={style.blockquote}>{children}</blockquote>;
};

export { Blockquote };
