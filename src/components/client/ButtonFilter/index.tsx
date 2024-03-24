'use client'

import Link from 'next/link';
import style from './style.module.css';
import IconFilter from '@/assets/icons/filter';
import { MouseEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import IconX from '@/assets/icons/x';
import { useRouter } from 'next/navigation';

export const ButtonFilter = () => {

  const route = useRouter();
  const query = useSearchParams();
  const tags = query.get('tags');

  const pathname = tags ? `/?show=true&tags=${tags.split(" ").join("+")}` : "/?show=true"

  function clearTagsList(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    route.push("/")
  }

  return (
    <Link data-active={!!tags} className={style.btn_filter} href={pathname}>
      <IconFilter />
      <span>Tópicos</span>
      <span className={style.qtd}>{tags && tags.split(" ").length}</span>
      <div className={style.container_controller}>
        <span className={style.divider}></span>
        <button onClick={clearTagsList} className={style.clearList}>
          <IconX />
        </button>
      </div>
    </Link>
  )
}