import { GetStaticProps, NextPage } from 'next';
import Layout from '@/Organisms/Layout';

import {
  siteDescription,
  siteNameCompleted,
  sitePreview,
} from '../../site.config';
import { getPublishedBlogPosts } from '@/services/notion/getPublishedBlogPosts';
import { TemplateHomepage, TemplateHomepageProps } from '@/Templates/Homepage';

const Home: NextPage<TemplateHomepageProps> = (props) => {
  const heroTitle = 'Uma infinidade de artigos relacionados à tech.';

  return (
    <Layout
      head={{
        image: sitePreview,
        description: siteDescription,
        title: siteNameCompleted,
      }}
      hero={{
        title: heroTitle,
        description: siteDescription,
      }}
    >
      <TemplateHomepage {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPublishedBlogPosts(undefined, ['tags', 'id']);

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
      posts: posts.results,
      cursor: posts?.cursor ? posts.cursor : null,
    },
    revalidate: 86400,
  };
};

export default Home;
