import style from '../../../styles/pages/Categorias.module.css';

import {NextPage,GetStaticProps} from 'next';
import { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import Container from '../../components/Layout/Container';
import PostCards from '../../components/PostCards';
import { BlogPost } from '../../types/post';
import Loading from '../../components/Loading';
import { server } from '../../../config/server';


interface categories{
  post:BlogPost[],
  category: {
    name: string,
    slug: string
  },
  cursor?: string | null | undefined
}

const Categorias: NextPage<categories> = ({post,cursor,category}) => {

  const [postsList, setPostsList]=useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPostsList(post)
    cursor && setCursorCurrent(cursor)
  }, [post, cursor])


  async function getMorePosts(){
    setLoading(true)
    const request = await fetch(`${server}/api/blogs?filter=${category.slug}?cursor=${cursor}`);
   

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
      bg: "var(--color-purple)",
      title: category.name,
      description: post!== null ? `Existem no momento ${post.length} publicações nessa categoria.`:null
    }}>

      <Container width='sm'>
        <div className={style.wrapper}>

        {postsList === null && <p>Não existe nenhuma publicação nessa tag.</p>}

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
}


export const getStaticProps: GetStaticProps = async (context) => {

  const request = await fetch(`${server}/api/blogs?filter=${context.params?.slug}`)
  
  const requestCategory = await fetch(`${server}/api/blogs/categories`);

  const categories = await requestCategory.json();

  const currentCategory = categories.data.find((value: any) => value.slug === context.params?.slug)

  if(request.status === 404){
      
    return {
      props: {
        post: null,
        category: currentCategory
      },
    };
  }

  
  if (request.status === 200) {

    try {
      const response = await request.json();

      return {
        props: {
          cursor: response.cursor,
          post: response.data,
          category: currentCategory
        },
      };
    } catch (error) {
      console.log("ERROR", error)
    }
  
  }

  return {
    props: {
      post: null,
    },
  };
};

export async function getStaticPaths(){
  const request = await fetch(`${server}/api/blogs/categories`);

  const categories = await request.json();
  
  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = categories.data.map((category: any) => {
    return `/categorias/${category.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Categorias;