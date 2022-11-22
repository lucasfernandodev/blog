import { NextPage } from 'next';
import Layout from '@/Organisms/Layout';
import { getPageName } from '../../components/Utils/getPageName';
import { sitePreview } from '../../../site.config';
import { GetStaticProps } from 'next';
import { getProperties } from '@/services/notion/getProperties';
import { getPublishedBlogPostsByFilter } from '@/services/notion/getPublishedBlogPosts';
import { storage } from '@/services/db';
import { TemplateTags, TemplateTagsProps } from '@/Templates/Tag';

import { Tag } from '@/types/post';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Tag: NextPage<TemplateTagsProps> = (props) => {
  return (
    <Layout
      hero={{
        customCoverColor: '',
        title: props.tag.name,
        description: `Lista de artigos encontrados com a tag ${props.tag.name}`,
      }}
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
  const { slug } = context.params as IParams;

  const storageSize = await storage.size();

  if (storageSize === 0) {

    const tags = await getProperties('Tags');

    tags.results.map(async (tag: any) => {
      await storage.set(tag.slug, tag);
    });

    const currentTag = await storage.get(slug);

    const response: any = await getPublishedBlogPostsByFilter(
      slug,
      'Tags',
      undefined
    );

    if (tags.error) {
      // If there is a server error, you might want to
      // throw an error instead of returning so that the cache is not updated
      // until the next successful request.
      throw new Error(
        `Failed to fetch tags, received message ${tags.error.message}`
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
  } else {
    const getRegisters = await storage.all();

    const currentTag = await storage.get(slug);

    const response: any = await getPublishedBlogPostsByFilter(
      slug,
      'Tags',
      undefined
    );

    if (!getRegisters) {
      // If there is a server error, you might want to
      // throw an error instead of returning so that the cache is not updated
      // until the next successful request.
      throw new Error(
        `Object with tags in memory is undefined or clear${getRegisters}`
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
  }
};

export async function getStaticPaths() {
  const isStorigeRegister = await storage.size();

  if (isStorigeRegister === 0) {
    console.log('Storage is clean');
    const response: any = await getProperties('Tags');
    const tags = response.results as Tag[];

    tags.map(async (tag) => {
      await storage.set(tag.slug, tag);
    });

    const paths = tags.map((tag: any) => {
      return `/tags/${tag.slug}`;
    });

    return {
      paths,
      fallback: false,
    };
  } else {
    const getRegisters = await storage.all();

    if (!getRegisters)
      throw new Error(
        `Object with tags in memory is undefined or clear${getRegisters}`
      );

    const paths = getRegisters.map((tag: any) => {
      return `/tags/${tag.slug}`;
    });

    return {
      paths,
      fallback: false,
    };
  }
}

export default Tag;
