import Comments from '@/Atons/Comments';
import RenderMarkdown from '@/Atons/RenderMarkdown';
import Container from '@/Organisms/Layout/Container';
import { BlogPost } from '@/types/post';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import style from './style.module.css';
import { Author } from '@/Atons/Author';

const ButtonRollingToTop = dynamic(
  () => import('../../Atons/ButtonRollingToTop')
);

const DateIs = dynamic(() => import('../../../Utils/DateIs'));

export interface TemplateBlogPostProps {
  markdown: any;
  post: BlogPost;
}

export function TemplateBlogPost({ markdown, post }: TemplateBlogPostProps) {
  const [publish, setPublish] = useState<string | null>(null);

  useEffect(() => {
    setPublish(markdown);
  }, [markdown]);

  return (
    <>
      <Container width='sm' className={style.page}>
        <div>
          <h1 className={style.title}>{post.title}</h1>
        </div>
        <div className={style.postInfo}>
          <span>
            <span>Escrito por</span> <Author />
          </span>{' '}
          • <span>{<DateIs date={post.date} />}</span>
        </div>

        {publish && <RenderMarkdown markdown={markdown} stylePage={style} />}
        <ButtonRollingToTop />
      </Container>
      <hr className={style.divider} />
      <Comments title={post.title} />
    </>
  );
}
