import { NextPage } from 'next';
import Layout from '@/Organisms/Layout';
import { getPageName } from '../../components/Utils/getPageName';
import { category, sitePreview } from '../../../site.config';
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
  const isPost = props.post === null || props.post.length === 0 ? false : true;

  const defaultHeroDescription = `Lista de artigos encontrados com a tag ${props.tag.name}`;
  const defaultHeadDescription = `Veja uma lista com todas as postagens filtradas pela tag ${props.tag.name}`;

  return (
    <Layout
      hero={{
        customCoverColor: `var(--color-${props.tag.color})`,
        title: props.tag.name,
        description: category[props.tag.slug] || defaultHeroDescription,
        height: 60,
      }}
      head={{
        title: getPageName(`Todas as publicações com a tag ${props.tag.name}`),
        description: defaultHeadDescription,
        image: sitePreview,
        googleIndex: isPost,
      }}
    >
      <TemplateTags {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  let TrueSlug = slug;
  const storageSize = await storage.size();

  if (storageSize === 0) {
    const tags = await getProperties('Tags');

    tags.results.map(async (tag: any) => {
      if (tag.slug === slug) {
        TrueSlug = tag.name;
      }
      await storage.set(tag.slug, tag);
    });

    const currentTag = await storage.get(slug);

    const response: any = await getPublishedBlogPostsByFilter(
      TrueSlug,
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

    if (
      slug !== 'back-end' &&
      (response.results === null || response.results.length === 0)
    ) {
      return {
        notFound: true,
      };
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

    const currentTag = (await storage.get(slug)) as any;

    const response: any = await getPublishedBlogPostsByFilter(
      currentTag.name,
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

    if (
      slug !== 'back-end' &&
      (response.results === null || response.results.post === 0)
    ) {
      return {
        notFound: true,
      };
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
