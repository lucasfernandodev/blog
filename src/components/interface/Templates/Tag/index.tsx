import style from './style.module.css';
import Container from '@/Organisms/Layout/Container';
import { useEffect, useState } from 'react';
import { BlogPost, Tag } from '@/types/post';
import PostCards from '@/Molecules/PostCards';
import Loading from '@/Atons/Loading';

export interface TemplateTagsProps {
  post: BlogPost[];
  tag: Tag;
  cursor?: string | null | undefined;
}

export function TemplateTags({ post, cursor, tag }: TemplateTagsProps) {
  const [postsList, setPostsList] = useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    post === null ? setPostsList(null) : setPostsList(post);
    cursor && setCursorCurrent(cursor);
  }, [post, cursor]);

  async function getMorePosts() {
    setLoading(true);

    const url = `/api/blogs?filter=${tag.slug}?filtercolumn=Tags?cursor=${cursor}`;
    const request = await fetch(url);

    if (request.status === 200) {
      const response = await request.json();
      postsList !== null && setPostsList([...postsList, ...response.data]);
      setCursorCurrent(response.cursor);
    }

    setLoading(false);
  }

  return (
    <Container width='sm'>
      <div className={style.wrapper}>
        {postsList === null && loading === false && (
          <p>Não existe nenhuma publicação nessa tag.</p>
        )}

        {postsList !== null && (
          <PostCards posts={postsList} widthStyle='long' />
        )}

        {cursorCurrent !== null && (
          <div className={style.containerButton}>
            <button onClick={getMorePosts}>
              {loading ? <Loading /> : 'ver mais'}
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
