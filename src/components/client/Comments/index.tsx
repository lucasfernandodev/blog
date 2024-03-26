'use client';
import Giscus from '@giscus/react';
import React from 'react';

export const Comments = () => {
  return (
    <Giscus
      repo="lucasfernandodev/lucasfernandodev.github.io"
      repoId="MDEwOlJlcG9zaXRvcnk0MDI1NDcxMjQ="
      category="General"
      categoryId="DIC_kwDOF_5htM4CeO8T"
      mapping="url"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      lang="pt"
      loading="lazy"
      id="Comments"
      theme="dark_dimmed"
    />
  )
}