import {NextPage,GetStaticProps} from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Container from '../../components/Layout/Container';
import PostCards from '../../components/PostCards';
import { BlogPost } from '../../types/post';


interface categories{
  post:BlogPost[],
  category: {
    title: string,
    slug: string
  },
}

const Categorias: NextPage<categories> = ({post,category}) => {

  const [postsList, setPostsList]=useState<BlogPost[] | null>(null);
  console.log(post)
  useEffect(() => {
    setPostsList(post)
  }, [post])

  console.log(postsList)
  return (
    <Layout hero={{
      type: "color",
      bg: "#24563f",
      title: category.title,
    }}>
      <Container width='sm'>
        {
          postsList !== null && <PostCards posts={postsList} widthStyle="long"/>
        }
      </Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {

  const request = await fetch(`http://localhost:3000/api/blogs?filter=${context.params?.slug}`)
  
  const requestCategory = await fetch('http://localhost:3000/api/blogs/categories');

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
  const request = await fetch('http://localhost:3000/api/blogs/categories');

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