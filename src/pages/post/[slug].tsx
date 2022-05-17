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
import ButtonRollingToTop from "../../components/ButtonRollingToTop";


const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [publish, setPublish] = useState<string | null>(null);
  const [isButtonTotopShow, setIsButtonTotopShow] = useState(false);

  useEffect(() => {
    setPublish(markdown);
  }, [markdown]);


  useEffect(() => {
    const body = document.querySelector('body');
    let timer: any = null;

    function debounce(){
      clearTimeout(timer);

      timer = setTimeout(() => {
          window.scrollY > 200 ? setIsButtonTotopShow(true): setIsButtonTotopShow(false)
      }, 350)
    }

    const scrolling = (event: WheelEvent) => {
      debounce()
    }
    
    if(body){
      body.addEventListener('wheel', scrolling);
    }

    return () => {
      clearTimeout(timer);
      body && body.removeEventListener('wheel', scrolling)
    }
  }, [])

  const ParagraphRenderer = ({ children }: any) => {
    const hasImage = !!children.find(
      (child: any) => typeof child === 'object' && child.key && !!child.key.match(/code/g)
    )
    return hasImage ? <div className={style.paragraph}>{children}</div> : <p>{children}</p>
  }

  return (
    <Layout 
      hero={{ 
        bg: post && post.cover,
        type: "image" 
      }}
      
      thumbnail={post && post.cover}
      description={post && post.description}
      title={post && post.title}
    >
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
              p: ParagraphRenderer
            }}
          >
            {markdown}
          </ReactMarkdown>
        )}

        {
          isButtonTotopShow && <ButtonRollingToTop />
        }
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
