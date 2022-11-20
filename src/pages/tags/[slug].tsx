import style from './style.module.css';
import { NextPage, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/post';
import Layout from '../../components/Layout';
import Container from '../../components/Layout/Container';
import PostCards from '../../components/PostCards';
import Loading from '../../components/Loading';
import { getProperties } from '../../lib/notion/getProperties';
import { getPublishedBlogPostsByFilter } from '../../lib/notion/getPublishedBlogPosts';
import { getPageName } from '../../components/Utils/getPageName';
import { sitePreview } from '../../../site.config';

interface tags {
  post: BlogPost[];
  tag: {
    name: string;
    slug: string;
    color: string;
  };
  cursor?: string | null | undefined;
}

const Tag: NextPage<tags> = ({ post, cursor, tag }) => {
  const [postsList, setPostsList] = useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    post === null ? setPostsList(null) : setPostsList(post);
    cursor && setCursorCurrent(cursor);
  }, [post, cursor]);

  async function getMorePosts() {
    setLoading(true);
    const request = await fetch(
      `/api/blogs?filter=${tag.slug}?filtercolumn=Tags?cursor=${cursor}`
    );

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
        customCoverColor: `var(--color-${tag.color})`,
        title: tag.name,
        description:
          post && `Lista de artigos encontrados com a tag ${tag.name}.`,
      }}
      head={{
        title: getPageName(`Todas as publicações com a tag ${tag.name}`),
        description: `Veja uma lista com todas as postagens filtradas pela tag ${tag.name}`,
        image: sitePreview,
      }}
    >
      <Container width='sm'>
        <div className={style.wrapper}>
          {postsList === null && loading === false && (
            <p>Não existe nenhuma publicação nessa tag.</p>
          )}

          {postsList !== null && (
            <PostCards posts={postsList} widthStyle='long' />
          )}

          {cursorCurrent !== null && (
            <div className={style.loadMore}>
              <button onClick={getMorePosts}>
                {loading ? <Loading /> : 'ver mais'}
              </button>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tags: any = await getProperties('Tags');

  const currentTag = tags.results.find(
    (value: any) => value.slug === context.params?.slug
  );

  const response: any = await getPublishedBlogPostsByFilter(
    context.params?.slug as string,
    'Tags',
    undefined
  );

  if (tags.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received message ${tags.error.message}`
    );
  }

  return {
    props: {
      cursor: response.cursor,
      post: response.results,
      tag: currentTag,
    },
    revalidate: 86400,
  };
};

export async function getStaticPaths() {
  const tags: any = await getProperties('Tags');

  const paths = tags.results.map((tag: any) => {
    return `/tags/${tag.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Tag;
