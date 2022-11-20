import style from './style.module.css';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/post';
import Layout from '../../components/Layout';
import PostCards from '../../components/PostCards';
import Loading from '../../components/Loading';
import { getPublishedBlogPosts } from '../../lib/notion/getPublishedBlogPosts';

interface postagensProps{
  posts: {
    results: BlogPost[];
    cursor: string
  }
}

const Postagens = ({  posts, }: postagensProps) => {
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
    <Layout
      hero={{
        title: 'Publicações',
        description: 'Navegue por todos os artigos publicados até agora.',
        customCoverColor: 'var(--color-default)',
      }}
      title="Publicações"
    >
      <div className={style.posts}>
        {postsList === null && loading === false && (
          <p>Nenhuma publicação encontrada.</p>
        )}
        {postsList && <PostCards posts={postsList} widthStyle="long" />}

        {cursorCurrent !== null && (
          <div className={style.loadMore}>
            <button onClick={getMorePosts}>
              {loading ? <Loading /> : 'ver mais'}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {

  const posts = await getPublishedBlogPosts();

  if (posts.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received message ${posts.error.message}`);
  }

  return {
    props: {
      posts: posts,
    },
    revalidate: 86400
  };
};

export default Postagens;
