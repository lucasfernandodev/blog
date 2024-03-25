"use client"
import { HTMLAttributes } from "react"
import style from './style.module.css';
import { useRouter } from "next/navigation";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  slug?: string;
}

export const Tag = ({ children, slug, ...rest }: IProps) => {

  const router = useRouter()

  function handleNavigate() {
    if (slug) {
      router.push(slug)
    }
  }

  return (
    <button onClick={handleNavigate} className={style.tag} {...rest}>
      {children}
    </button>
  )
}