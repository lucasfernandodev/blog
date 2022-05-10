import { WithChildren } from '../../../types/componentChildren';
import style from './style.module.css';

interface ContainerProps{
  width?: "sm" | "md" | 'full'; 
}

const Container = ({children, width = 'md'}: WithChildren<ContainerProps>) => {
  return (
    <main className={style.container} data-width={width}>
      {
        children
      }
    </main>
  )
};


export default Container;