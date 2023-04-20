import { BlogPost } from '@/types/post';
import { useEffect, useState } from 'react';
import style from './style.module.css';
import Loading from '@/Atons/Loading';
import PostCards from '@/Molecules/PostCardCollection';

export interface TemplatePostagensProps {
  posts: {
    results: BlogPost[];
    cursor: string;
  };
}

export function TemplatePostagens({ posts }: TemplatePostagensProps) {
  const [postsList, setPostsList] = useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPostsList(posts.results);
    posts.cursor && setCursorCurrent(posts.cursor);
  }, [posts]);

  async function getMorePosts() {
    setLoading(true);
    const request = await fetch(`/api/blogs?cursor=${cursorCurrent}`);

    if (request.status === 200) {
      const response = await request.json();
      postsList !== null && setPostsList([...postsList, ...response.data]);
      setCursorCurrent(response.cursor);
    }

    setLoading(false);
  }

  return (
    <div className={style.posts}>
      {postsList === null && loading === false && (
        <p>Nenhuma publicação encontrada.</p>
      )}

      {postsList && <PostCards posts={postsList} widthStyle='long' />}

      {cursorCurrent !== null && (
        <div className={style.loadMore}>
          <button onClick={getMorePosts}>
            {loading ? <Loading /> : 'ver mais'}
          </button>
        </div>
      )}
    </div>
  );
}
