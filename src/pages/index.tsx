import style from '../../styles/pages/Home.module.css';
import { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { BlogPost } from '../types/post';
import PostCards from '../components/PostCards';
import Link from '../components/Utils/Link';
import { getPublishedBlogPosts } from '../lib/notion';

interface HomeProps{
  posts: BlogPost[],
  cursor: string | null
}

const Home: NextPage<HomeProps> = ({ posts, cursor}) => {
  console.log(posts);

  const [currentPosts, setCurrentPost] = useState<BlogPost[] | null>(null);
  const [iscursor, setIsCursor] = useState<null | string>(null);

  useEffect(() => {
    setCurrentPost(posts);
    cursor !== null && setIsCursor(cursor);
  }, [posts, cursor]);

  return (
    <Layout>
      <div className={style.wrapper}>
        <div className={style.titleContent}>
          <h2>Postagens Recentes</h2>
        </div>

        {currentPosts === null && <p>Nenhuma publicação foi encontrada</p>}
        {currentPosts !== null && <PostCards posts={currentPosts} />}

        <div className={style.groupBtn}>
          {currentPosts !== null && iscursor !== null && (
            <Link href="/postagens">Ver mais publicações</Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {

  const posts = await getPublishedBlogPosts(undefined, ['tags', 'id']);

  if (posts.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received message ${posts.error.message}`
    );
  }

  return {
    props: {
      posts: posts.results,
      cursor: posts?.cursor ? posts.cursor : null,
    },
    revalidate: 86400,
  };
};

export default Home;
