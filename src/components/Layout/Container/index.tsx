import { HTMLAttributes } from 'react';
import { WithChildren } from '../../../types/componentChildren';
import style from './style.module.css';

interface ContainerProps extends HTMLAttributes<Element>{
  width?: "sm" | "md" | 'full'; 
}

const Container = ({children, width, className = 'md'}: WithChildren<ContainerProps>) => {
  return (
    <main className={`${style.container} ${className}`} data-width={width}>
      {
        children
      }
    </main>
  )
};


export default Container;