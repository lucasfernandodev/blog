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

  function handleNavigate(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (slug) {
      router.push(slug)
    }

    rest.onClick && rest.onClick(ev)
  }

  return (
    <button {...rest} onClick={handleNavigate} className={[style.tag, rest.className].join(" ")}>
      {children}
    </button>
  )
}