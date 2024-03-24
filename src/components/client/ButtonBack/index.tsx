'use client'
 
import style from './style.module.css';
import IconBack from '@/assets/icons/back';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const ButtonBack = () => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.back()
  }, [ router]);

  return (
    <div className={style.container_button}>
      <button onClick={onClick}>
        <span><IconBack /></span>
        <span>Voltar</span>
      </button>
    </div>
  )
}