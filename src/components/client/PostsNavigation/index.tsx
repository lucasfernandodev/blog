'use client';
import { IconNext } from '@/assets/icons/next';
import { IconPrev } from '@/assets/icons/prev';
import style from './style.module.css';
import { useRouter } from 'next/navigation';

interface PostsNavigationData {
  has_more: string | null,
  isPrev: boolean,
  page: number
}

export const PostsNavigation = ({ has_more,page, isPrev }: PostsNavigationData) => {
  const router = useRouter();

  function toPrevListPart(){
    if(isPrev){
      router.back()
    }
  }

  function toNextListPart(){
    if(has_more && page){
      router.push(`/?more=${has_more}&page=${page + 1}`)
    }
  }

  return (
    <div className={style.buttons}>
      <button onClick={toPrevListPart} data-hasprev={isPrev}><IconPrev /></button>
      <button onClick={toNextListPart} data-hasmore={!!has_more}><IconNext /></button>
    </div>
  )
}