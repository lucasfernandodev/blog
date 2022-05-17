import style from './style.module.css';
import {NextPage, GetStaticProps}from 'next';
import { server } from '../../../config/server';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/post';
import Layout from '../../components/Layout';
import Container from '../../components/Layout/Container';
import PostCards from '../../components/PostCards';
import Loading from '../../components/Loading';


interface tags{
  post:BlogPost[],
  tag: {
    name: string,
    slug: string,
    color: string,
  },
  cursor?: string | null | undefined
}

const Tags: NextPage<tags> = ({post,cursor,tag}) => {

  const [postsList, setPostsList]=useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    post === null ? setPostsList(null) : setPostsList(post);
    cursor && setCursorCurrent(cursor)
  }, [post, cursor])

  console.log(postsList);

  async function getMorePosts(){
    setLoading(true)
    const request = await fetch(`${server}/api/blogs?filter=${tag.slug}?filtercolumn=Tags?cursor=${cursor}`);
   

    if(request.status === 200){
      const response = await request.json();
      postsList !== null && setPostsList([...postsList,...response.data])
      setCursorCurrent(response.cursor)
    }

    setLoading(false)
  }

  return (
    <Layout hero={{
      type: "color",
      bg: `var(--color-${tag.color})`,
      title: tag.name,
      description: post!== null ? `Lista de artigos encontrados com a tag ${tag.name}.`:null
    }}
    title={tag.name}
    >

      <Container width='sm'>
        <div className={style.wrapper}>

        {postsList === null && loading === false && <p>Não existe nenhuma publicação nessa tag.</p>}

        {
          postsList !== null && <PostCards posts={postsList} widthStyle="long"/>
        }

        {
          cursorCurrent !== null &&
           <div className={style.loadMore}>
             <button onClick={getMorePosts}>
               {loading ?<Loading /> : 'ver mais' }
              </button>
           </div>
        }

        </div>
       
      </Container>
    </Layout>

  )
};


export const getStaticProps: GetStaticProps = async (context) => {

  const requestTag = await fetch(`${server}/api/blogs/tags`);
  const tags = await requestTag.json();
  const currentTag = tags.data.find((value: any) => value.slug === context.params?.slug)

 try {
  const request = await fetch(`${server}/api/blogs?filter=${context.params?.slug}?filtercolumn=Tags`);
  const response = await request.json();


  return {
    props: {
      cursor: response.cursor,
      post: response.data,
      tag: currentTag
    },
  };

 } catch (error) {

    return {
      props: {
        cursor: null,
        post: null,
        tag: currentTag
      },
    };
 }
};


export async function getStaticPaths(){
  const request = await fetch(`${server}/api/blogs/tags`);

  const tags = await request.json();
  
  const paths = tags.data.map((tag: any) => {
    return `/tags/${tag.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}


export default Tags;