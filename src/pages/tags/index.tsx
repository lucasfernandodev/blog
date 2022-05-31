import style from '../../../styles/pages/Tags.module.css';
import {GetStaticProps} from 'next';
import Layout from "../../components/Layout";
import { getProperties } from '../../lib/notion';
import Container from '../../components/Layout/Container';
import Link from '../../components/Utils/Link';

const Tags = ({tags}: {tags: any}) => {

  console.log(tags)
  return (
    <Layout
    hero={ {hide: true,}}
    title="Todas as tags"
    >
      <Container className={style.tags}>
      {tags && tags.map((tag: any) => (
        <div 
          className={style.card} 
          key={tag.name} 
          style={{
            borderBlock: `6px solid var(--color-${tag.color})`,
            borderInline: `1px solid var(--color-border)`
          }
        }>
          <h3>{tag.name}</h3>
          <Link href={`/tags/${tag.slug}`} className={style.button}>
            Ver publicações
          </Link>
        </div>
      ))}
      </Container>
     
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context: any) => {

  const tags: any =  await getProperties('Tags', 'multi_select');

  if (tags.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
     throw new Error(`Failed to fetch posts, received message ${tags.error.message}`)
  }

  return {
    props: {
      tags: tags.results,
    },
    revalidate: 86400
  };

 
};

export default Tags;