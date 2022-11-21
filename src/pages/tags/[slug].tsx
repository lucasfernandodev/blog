import { NextPage, GetStaticProps } from 'next';
import Layout from '@/Organisms/Layout';
import { getPageName } from '../../components/Utils/getPageName';
import { sitePreview } from '../../../site.config';
import { getProperties } from '@/services/notion/getProperties';
import { getPublishedBlogPostsByFilter } from '@/services/notion/getPublishedBlogPosts';
import { TemplateTags, TemplateTagsProps } from '@/Templates/Tag';

const Tag: NextPage<TemplateTagsProps> = (props) => {

  return (
    <Layout
      hero={{
        customCoverColor: `var(--color-${props.tag.color})`,
        title: props.tag.name,
        description: `Lista de artigos encontrados com a tag ${props.tag.name}`}}
      head={{
        title: getPageName(`Todas as publicações com a tag ${props.tag.name}`),
        description: `Veja uma lista com todas as postagens filtradas pela tag ${props.tag.name}`,
        image: sitePreview,
      }}
    >
      <TemplateTags {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tags: any = await getProperties('Tags');

  const currentTag = tags.results.find(
    (value: any) => value.slug === context.params?.slug
  );

  const response: any = await getPublishedBlogPostsByFilter(
    context.params?.slug as string,
    'Tags',
    undefined
  );

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
      cursor: response.cursor,
      post: response.results,
      tag: currentTag,
    },
    revalidate: 86400,
  };
};

export async function getStaticPaths() {
  const tags: any = await getProperties('Tags');

  const paths = tags.results.map((tag: any) => {
    return `/tags/${tag.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Tag;
