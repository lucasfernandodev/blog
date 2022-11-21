import { GetStaticProps } from 'next';
import Layout from '@/Organisms/Layout';
import { getPageName } from '../../components/Utils/getPageName';
import { sitePreview } from '../../../site.config';
import { getProperties } from '@/services/notion/getProperties';
import { TemplateListTags, TemplateListTagsProps } from '@/Templates/ListTags';

const Tags = (props: TemplateListTagsProps) => {
  return (
    <Layout
      head={{
        title: getPageName('Todas as tags'),
        description: 'Lista com todas as tags publicadas até agora.',
        image: sitePreview,
      }}
    >
      <TemplateListTags {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tags: any = await getProperties('Tags');

  if (tags.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received message ${tags.error.message}`
    );
  }

  return {
    props: {
      tags: tags.results,
    },
    revalidate: 86400,
  };
};

export default Tags;
