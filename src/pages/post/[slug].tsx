import {GetStaticProps,InferGetStaticPropsType} from 'next';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


const Post = ({markdown, post}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [publish, setPublish] = useState<string | null>(null)

  useEffect(() => {
    setPublish(markdown)
  },[markdown])
  return (
    <>
    
    {publish !== null && <ReactMarkdown>{publish}</ReactMarkdown>}
    </>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  
  const request = await fetch(`http://localhost:3000/api/blogs/post`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({slug: context.params?.slug})
  }); 


  if(request.status === 200){
    console.log(request)
    const p = await request.json();

    return {
      props: {
          markdown: p.data.markdown,
          post: p.data.post
      },
  }
  }
  // @ts-ignore
  
    return {
      props: {
          markdown: null,
          post: null
      },
  }
}

export async function getStaticPaths() {
  const request = await fetch('http://localhost:3000/api/blogs');

  const posts = await request.json();

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = posts.data.map((post: any) => {
      return `/post/${post.slug}`
  })

  return {
      paths,
      fallback: false,
  }
}

export default Post;