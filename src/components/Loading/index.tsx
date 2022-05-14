import style from './style.module.css';

interface LoadingProps{
  maxWidth?: number, 
}

const Loading = ({maxWidth}: LoadingProps) => {
  return (
    <div className={style.loading} style={{
      maxWidth: maxWidth ? `${maxWidth}px` : 'unset',
      maxHeight: maxWidth ? `${maxWidth}px` : 'unset',
    }}>
      <span className={style.spin}></span>
    </div>
  )
};

export default Loading;