import { HTMLAttributes } from "react"
import style from './style.module.css';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
export const Tag = ({ children, ...rest }: IProps) => {
  return (
    <button className={style.tag} {...rest}>
      {children}
    </button>
  )
}