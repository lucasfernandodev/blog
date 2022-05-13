import {GetStaticPaths, NextPage,GetStaticProps} from 'next';

const Categorias: NextPage = () => {
  return <h1>Categorias</h1>
}


export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      markdown: null,
      post: null,
    },
  };
};

export async function getStaticPaths(){
  const request = await fetch('http://localhost:3000/api/blogs/categorys');

  const categories = await request.json();
  console.log("categories", categories)
  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = categories.data.map((category: any) => {
    return `/categorias/${category}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Categorias;