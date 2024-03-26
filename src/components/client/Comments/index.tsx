'use client';
import Giscus from '@giscus/react';
import React from 'react';

export const Comments = () => {
  return (
    <Giscus
    id="comments"
    repo="lucasfernandodev/lucasfernandodev.github.io"
    repoId="MDEwOlJlcG9zaXRvcnk0MDI1NDcxMjQ=="
    category="General"
    categoryId="DIC_kwDOF_5htM4CeO8T-hVS"
    mapping="url"
    strict='1'
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme="dark"
    lang="ept"
    loading="lazy"
  />
  )
}