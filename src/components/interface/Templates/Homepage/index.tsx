import Link from '@/infra/Link';
import PostCards from '@/Molecules/PostCards';
import style from '@/stylePage/Home.module.css';
import { BlogPost } from '@/types/post';
import { useEffect, useState } from 'react';

export interface TemplateHomepageProps {
  posts: BlogPost[];
  cursor: string | null;
}

export function TemplateHomepage({ posts, cursor }: TemplateHomepageProps) {
  const [currentPosts, setCurrentPost] = useState<BlogPost[] | null>(null);
  const [isCursor, setIsCursor] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPost(posts);
    cursor !== null && setIsCursor(cursor);
  }, [posts, cursor]);

  return (
    <div className={style.wrapper}>
      <div className={style.heading}>
        <h2>Postagens Recentes</h2>
      </div>

      {!currentPosts && <p>Nenhuma publicação foi encontrada.</p>}
      {currentPosts && <PostCards posts={currentPosts} />}

      {currentPosts !== null && isCursor !== null && (
        <div className={style.groupBtn}>
          <Link href='/postagens'>Ver todas as publicações</Link>
        </div>
      )}
    </div>
  );
}
