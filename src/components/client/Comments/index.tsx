'use client';
import Giscus from '@giscus/react';
import React, { useState } from 'react';
import style from './style.module.css';

const Wrapper = () => {
  return (
   <div className={style.comments}>
     <Giscus
      repo="lucasfernandodev/blog"
      repoId="R_kgDOHT0P4Q"
      category="[INSIRA O NOME DA CATEGORIA AQUI]"
      categoryId="[INSIRA O ID DA CATEGORIA AQUI]"
      mapping="url"
      strict="1"
      reactions-enabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark_dimmed"
      lang="pt"
    />
   </div>
  )
}
export const Comments = () => {
  const [comment, setComment] = useState(false);

  const showComments = () => {
    setComment(true)
  }

  if(!comment){
    return <button onClick={showComments} className={style.button_loading}>Carregar comentários</button>
  }

  if(comment){
    return <Wrapper />
  }
}