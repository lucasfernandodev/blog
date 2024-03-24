'use client'
import style from './style.module.css';
import Link from 'next/link';
import { Tags } from '../Tags';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { tagMapper } from '@/utils/tag-url-mapper';

interface IProps {
  tags: {
    label: string;
    value: string;
  }[]
}

export const Modal = ({ tags }: IProps) => {

  const urlParams = useSearchParams();
  const urlTags = urlParams.get('tags');
  const activeTags = urlTags ? tagMapper.toLabel(urlTags) : []

  const [params, setParams] = useState<string[]>(activeTags);

  const addTags = (tag: string) => {
    setParams(prev => ([...prev, tag]))
  }

  const removeTags = (tag: string) => {
    const _params = params
    const [label] = tagMapper.toLabel(tag)
    const targetITem = _params.findIndex(param => label === param);
 
    if (targetITem !== -1) {

      _params.splice(targetITem, 1);
      setParams(prev => ([..._params]))
    }
  }

  return (
    <div className={style.modal}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h2>Selecionar Tópicos</h2>
        </div>
        <div className={style.content}>
          <Tags addTag={addTags} removeTag={removeTags} tags={tags} />
        </div>
        <div className={style.footer}>
          <Link data-type="close" className={style.button} href="/">
            Cancelar
          </Link>
          <Link href={{
            pathname: "/",
            query: `tags=${tagMapper.toURL(params)}`
          }}
            data-type="confirm" className={style.button}>
            Filtrar
          </Link>
        </div>
      </div>
    </div>
  )
}