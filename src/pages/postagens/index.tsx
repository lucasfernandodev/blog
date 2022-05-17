import style from './style.module.css';
import {GetStaticProps} from 'next'
import { useEffect, useState } from 'react';
import { server } from '../../../config/server';
import { BlogPost } from '../../types/post';
import Layout from '../../components/Layout';
import PostCards from '../../components/PostCards';
import Loading from '../../components/Loading';

const Postagens = ({posts}: {posts: {data: BlogPost[], cursor: string}}) => {

  const [postsList, setPostsList]=useState<BlogPost[] | null>(null);
  const [cursorCurrent, setCursorCurrent] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPostsList(posts.data)
    posts.cursor && setCursorCurrent(posts.cursor)

  }, [posts])

  async function getMorePosts(){
    setLoading(true)
    const request = await fetch(`${server}/api/blogs?cursor=${cursorCurrent}`);
   

    if(request.status === 200){
      const response = await request.json();
      postsList !== null && setPostsList([...postsList,...response.data])
      setCursorCurrent(response.cursor)
    }

    setLoading(false)
  }

  return (
    <Layout
      hero={{
        title: "Publicações",
        description: "Navegue por todos os artigos publicados até agora.",
        type: "color",
        bg: "var(--color-default)",
      }}
      title="Publicações"
    >
      <div className={style.posts}>

      {
          postsList === null && loading === false && <p>Nenhuma publicação encontrada.</p>
        }
        {
          postsList && <PostCards posts={postsList} widthStyle="long"/>
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
    </Layout>
  )
};

export const getStaticProps: GetStaticProps  = async (context) => {
  const request = await fetch(`${server}/api/blogs/`);
  const posts = await request.json()
  return {
      props: {
          posts:posts
      },
  }
}

export default Postagens;