import style from '../../styles/pages/Home.module.css';
import {GetStaticProps, InferGetStaticPropsType} from "next";
import { NextPage } from "next"
import Layout from "../components/Layout";
import { useEffect, useState } from 'react';
import { BlogPost } from '../types/post';
import PostCards from '../components/PostCards';
import { server } from '../../config/server';

const Home: NextPage = ({posts}: InferGetStaticPropsType<typeof getStaticProps>) => {
    
    const [currentPosts, setCurrentPost] = useState<BlogPost[] | null>(null);
    const [loading, setLoading] = useState(false);

    console.log(posts)
    useEffect(() => {
      setCurrentPost(posts.data);
    }, [posts])


  return (
    <Layout>
      <div className={style.wrapper}>
       <div className={style.titleContent}> <h2>Postagens Recentes</h2></div>
       {currentPosts && <PostCards posts={currentPosts}/>}
       <div className={style.groupBtn}>
         <button type='button'>
          Ver mais publicações
         </button>
       </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps  = async (context) => {
  const request = await fetch(`${server}/api/blogs/`);
  const posts = await request.json()
  return {
      props: {
          posts:posts
      },
  }
}

export default Home;