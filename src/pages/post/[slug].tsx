import style from "./style.module.css";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Container from "../../components/Layout/Container";
import Link from "../../components/Utils/Link";
import { DateIs } from "../../components/Utils/DateIs";
import ButtonRollingToTop from "../../components/ButtonRollingToTop";
import { getPublishedBlogPosts, getSingleBlogPost } from "../../lib/notion";
import RenderMarkdown from "../../components/RenderMarkdown";

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [publish, setPublish] = useState<string | null>(null);
  const [isButtonTotopShow, setIsButtonTotopShow] = useState(false);
  const [buttonBottomFixed, setButtonBottomFixed] = useState<number>(20);

  useEffect(() => {
    setPublish(markdown);
  }, [markdown]);

  useEffect(() => {
    const body = document.querySelector("body");
    let timer: any = null;

    function debounce() {
      clearTimeout(timer);
      timer = setTimeout(() => {

        const doc = document.documentElement;

        doc.scrollTop > 200
        ? setIsButtonTotopShow(true)
        : setIsButtonTotopShow(false);


        const scrollbarPosition =
          (100 * doc.scrollTop) / (doc.scrollHeight - doc.clientHeight);

        if (scrollbarPosition >= 97) {
          setButtonBottomFixed(80);
        }

        if(scrollbarPosition < 97){
          setButtonBottomFixed(20);
        }

      }, 300);

    }

    const scrolling = (event: WheelEvent) => {
      debounce();
    };

    // Add Event
    if (body) {
      document.documentElement.addEventListener("wheel", scrolling);
    }


    // Removing Event
    return () => {
      clearTimeout(timer);
      document.documentElement && document.documentElement.removeEventListener("wheel", scrolling);
    };
  }, []);

  return (
    <Layout
      hero={{
        bg: post && post.cover,
        type: "image",
      }}
      cover={post && post.cover}
      description={post && post.description}
      title={post && post.title}
      type="article"
      titleComplet={true}
    >
      <Container width="sm" className={style.pagePost}>
        <div className={style.contentTitle}>
          <h1 className={style.title}>{post.title}</h1>
        </div>
        <div className={style.postInfo}>
          <span><span>Escrito por</span> <Link href="#">Lucas Fernando</Link></span> •{" "}
          <span>{<DateIs date={post.date} />}</span>
        </div>

        {publish !== null && <RenderMarkdown markdown={markdown} stylePage={style}/>}

        {isButtonTotopShow && (
          <ButtonRollingToTop bottomFixed={buttonBottomFixed} />
        )}
      </Container>
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

  if (typeof p.results.markdown !== "undefined") {
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
