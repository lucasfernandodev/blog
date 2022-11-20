import style from './style.module.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Container from '../../components/Layout/Container';
import Link from '../../components/Utils/Link';
import { DateIs } from '../../components/Utils/DateIs';
import dynamic from 'next/dynamic';
import RenderMarkdown from '../../components/RenderMarkdown';
import { getPublishedBlogPosts } from '../../lib/notion/getPublishedBlogPosts';
import { getSingleBlogPost } from '../../lib/notion/getSingleBlogPost';
import Comments from '../../components/interface/Comments';

const ButtonRollingToTop = dynamic(
  () => import('../../components/interface/ButtonRollingToTop')
);

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [publish, setPublish] = useState<string | null>(null);

  useEffect(() => {
    setPublish(markdown);
  }, [markdown]);

  return (
    <Layout
      hero={{
        image: post.cover,
        alt: post.title,
      }}
      cover={post && post.cover}
      description={post && post.description}
      title={post && post.title}
      type='article'
      titleComplet={true}
    >
      <Container width='sm' className={style.page}>
        <div className={style.contentTitle}>
          <h1 className={style.title}>{post.title}</h1>
        </div>
        <div className={style.postInfo}>
          <span>
            <span>Escrito por</span> <Link href='https://github.com/lucasfernandodev'>Lucas Fernando</Link>
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
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const p = await getSingleBlogPost(context.params?.slug as string);

  if (p.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received message ${p.error.message}`
    );
  }

  if (typeof p.results.markdown !== 'undefined') {
    return {
      props: {
        markdown: p.results.markdown,
        post: p.results.post,
      },
      revalidate: 86400,
    };
  }

  return {
    notFound: true,
  };
};

export async function getStaticPaths() {
  const posts: any = await getPublishedBlogPosts();

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.

  const paths = posts.results.map((post: any) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
