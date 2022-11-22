import { GetStaticProps } from 'next';
import Layout from '@/Organisms/Layout';

import { sitePreview } from '../../../site.config';
import { getPageName } from '../../components/Utils/getPageName';
import { getPublishedBlogPosts } from '@/services/notion/getPublishedBlogPosts';
import {
  TemplatePostagens,
  TemplatePostagensProps,
} from '@/Templates/Postagens';

const Postagens = (props: TemplatePostagensProps) => {
  return (
    <Layout
      hero={{
        title: 'Publicações',
        description: 'Navegue por todos os artigos publicados até agora.',
        customCoverColor: 'var(--color-default)',
      }}
      head={{
        image: sitePreview,
        description:
          'Navegue por todos os artigos publicados no blog até agora',
        title: getPageName('Ver todas as publicações'),
      }}
    >
      <TemplatePostagens {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPublishedBlogPosts();

  if (posts.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received message ${posts.error.message}`
    );
  }

  return {
    props: {
      posts: posts,
    },
    revalidate: 86400,
  };
};

export default Postagens;
