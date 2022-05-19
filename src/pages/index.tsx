import style from '../../styles/pages/Home.module.css';
import {GetStaticProps, InferGetStaticPropsType} from "next";
import { NextPage } from "next"
import Layout from "../components/Layout";
import { useEffect, useState } from 'react';
import { BlogPost } from '../types/post';
import PostCards from '../components/PostCards';
import { server } from '../../config/server';
import Link from '../components/Utils/Link';
import { getPublishedBlogPosts } from '../lib/notion';

const Home: NextPage = ({posts, cursor}: InferGetStaticPropsType<typeof getStaticProps>) => {
    
    const [currentPosts, setCurrentPost] = useState<BlogPost[] | null>(null);
    const [iscursor, setIsCursor] = useState<null | string>(null);

    console.log(posts)
    useEffect(() => {
      setCurrentPost(posts);
      cursor !== null && setIsCursor(cursor)
    }, [posts, cursor])



    
  return (
    <Layout title={null}>
      <div className={style.wrapper}>
       <div className={style.titleContent}> 
        <h2>Postagens Recentes</h2>
       </div>

       {currentPosts === null && <p>Nenhuma publicação foi encontrada</p>}
       {currentPosts !== null && <PostCards posts={currentPosts}/>}
       <div className={style.groupBtn}>

        {currentPosts !== null && iscursor !== null && <Link href="/postagens">
          Ver mais publicações
         </Link>}
       </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps  = async (context) => {
  const posts = await getPublishedBlogPosts();

  return {
      props: {
          posts: posts.results,
          cursor: posts?.cursor ? posts.cursor : null
      },
  }
}

export default Home;