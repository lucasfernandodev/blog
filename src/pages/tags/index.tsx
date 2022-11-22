import { GetStaticProps } from 'next';
import Layout from '@/Organisms/Layout';
import { getPageName } from '../../components/Utils/getPageName';
import { sitePreview } from '../../../site.config';
import { getProperties } from '@/services/notion/getProperties';
import { TemplateListTags, TemplateListTagsProps } from '@/Templates/ListTags';
import { storage } from '@/services/db';
import { Tag } from '@/types/post';

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
  const isTagsRegister = await storage.size();

  if (isTagsRegister === 0) {
    const response: any = await getProperties('Tags');

    if (response.error) {
      // If there is a server error, you might want to
      // throw an error instead of returning so that the cache is not updated
      // until the next successful request.
      throw new Error(
        `Failed to fetch posts, received message ${response.error.message}`
      );
    }

    const tags = response.results as Tag[];

    tags.map(async (tag) => {
      await storage.set(tag.slug, tag);
    });

    return {
      props: {
        tags: tags,
      },
      revalidate: 86400,
    };
  } else {
    const tags = await storage.all();
    return {
      props: {
        tags: tags,
      },
      revalidate: 86400,
    };
  }
};

export default Tags;
