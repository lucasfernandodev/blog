import Comments from '@/Atons/Comments';
import RenderMarkdown from '@/Atons/RenderMarkdown';
import Link from '@/infra/Link';
import Container from '@/Organisms/Layout/Container';
import { BlogPost } from '@/types/post';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DateIs } from 'src/components/Utils/DateIs';
import style from './style.module.css';

const ButtonRollingToTop = dynamic(
  () => import('../../Atons/ButtonRollingToTop')
);

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
        <div className={style.contentTitle}>
          <h1 className={style.title}>{post.title}</h1>
        </div>
        <div className={style.postInfo}>
          <span>
            <span>Escrito por</span>{' '}
            <Link href='https://github.com/lucasfernandodev'>
              Lucas Fernando
            </Link>
          </span>{' '}
          • <span>{<DateIs date={post.date} />}</span>
        </div>

        {publish !== null && (
          <RenderMarkdown markdown={markdown} stylePage={style} />
        )}
        <ButtonRollingToTop />
      </Container>
      <hr className={style.divider} />
      <Comments title={post.title} />
    </>
  );
}
