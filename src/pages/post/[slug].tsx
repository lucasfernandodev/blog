import style from "./style.module.css";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Container from "../../components/Layout/Container";
import Link from "../../components/Utils/Link";
import { DateIs } from "../../components/Utils/DateIs";
import CodeBlock from "../../components/Utils/CodeBlock";
import {server} from '../../../config/server';

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [publish, setPublish] = useState<string | null>(null);

  useEffect(() => {
    setPublish(markdown);
  }, [markdown]);

  return (
    <Layout hero={{ bg: post.cover, type: "image" }}>
      <Container width="sm" className={style.pagePost}>
        <div className={style.contentTitle}>
          <h1>{post.title}</h1>
        </div>
        <div className={style.postInfo}>
          <span>Escrito por</span> <Link href="#">Lucas Fernando</Link> •{" "}
          <span>{<DateIs date={post.date} />}</span>
        </div>
        {publish !== null && (
          <ReactMarkdown
            components={{
              code: CodeBlock as any,
            }}
          >
            {markdown}
          </ReactMarkdown>
        )}
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const request = await fetch(`${server}/api/blogs/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug: context.params?.slug }),
  });

  if (request.status === 200) {
    console.log(request);
    const p = await request.json();

    return {
      props: {
        markdown: p.data.markdown,
        post: p.data.post,
      },
    };
  }
  // @ts-ignore

  return {
    props: {
      markdown: null,
      post: null,
    },
  };
};

export async function getStaticPaths() {
  const request = await fetch(`${server}/api/blogs`);

  const posts = await request.json();

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = posts.data.map((post: any) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
