import style from './style.module.css';
import {NextPage, GetStaticProps}from 'next';
import { server } from '../../../config/server';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/post';
import Layout from '../../components/Layout';
import Container from '../../components/Layout/Container';
import PostCards from '../../components/PostCards';
import Loading from '../../components/Loading';
import { getProperties, getPublishedBlogPostsByFilter } from '../../lib/notion';


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

 try {

  const tags: any =  await getProperties('Tags', 'multi_select');

  const currentTag = tags.results.find((value: any) => value.slug === context.params?.slug)

  const response: any = await getPublishedBlogPostsByFilter(context.params?.slug as string, 'Tags' ,undefined);


  return {
    props: {
      cursor: response.cursor,
      post: response.results,
      tag: currentTag
    },
  };

 } catch (error) {

    return {
      props: {
        cursor: null,
        post: null,
        tag: null
      },
    };
 }
};


export async function getStaticPaths(){

  const tags: any =  await getProperties('Tags', 'multi_select')

  const paths = tags.results.map((tag: any) => {
    return `/tags/${tag.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}


export default Tags;