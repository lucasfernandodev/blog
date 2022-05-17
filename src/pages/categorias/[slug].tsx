import style from "../../../styles/pages/Categorias.module.css";

import { NextPage, GetStaticProps } from "next";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import Container from "../../components/Layout/Container";
import PostCards from "../../components/PostCards";
import { BlogPost } from "../../types/post";
import Loading from "../../components/Loading";
import { server } from "../../../config/server";

interface categories {
  post: BlogPost[] | null;
  category: {
    name: string;
    slug: string;
  };
  cursor?: string | null | undefined;
}

const Categorias: NextPage<categories> = ({ post, cursor, category }) => {
  const [postsList, setPostsList] = useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPostsList(post);
    cursor && setCursorCurrent(cursor);
    setLoading(false);
  }, [post, cursor]);

  console.log(postsList);

  async function getMorePosts() {
    setLoading(true);
    const request = await fetch(
      `${server}/api/blogs?filter=${category.slug}?filtercolumn=Categories?cursor=${cursor}`
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
        type: "color",
        bg: "var(--color-purple)",
        title: category.name,
        description:
          post !== null
            ? `Lista de artigos encontrados com a tag ${category.name}.`
            : null,
      }}
      title={category.name}
    >
      <Container width="sm">
        <div className={style.wrapper}>
          {postsList === null && loading === false && (
            <p>Não existe nenhuma publicação nessa tag.</p>
          )}

          {postsList !== null && (
            <PostCards posts={postsList} widthStyle="long" />
          )}

          {cursorCurrent !== null && (
            <div className={style.loadMore}>
              <button onClick={getMorePosts}>
                {loading ? <Loading /> : "ver mais"}
              </button>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const request = await fetch(
    `${server}/api/blogs?filter=${context.params?.slug}?filtercolumn=Categories`
  );

  const response = await request.json();

  const requestCategory = await fetch(`${server}/api/blogs/categories`);
  const categories = await requestCategory.json();

  const currentCategory = categories.data.find(
    (value: any) => value.slug === context.params?.slug
  );

  console.log(`Status:${request.status}`)

  return {
    props: {
      cursor: response.cursor,
      post: response.data,
      category: currentCategory,
    },
  };
};

export async function getStaticPaths() {
  const request = await fetch(`${server}/api/blogs/categories`);

  const categories = await request.json();

  const paths = categories.data.map((category: any) => {
    return `/categorias/${category.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Categorias;
