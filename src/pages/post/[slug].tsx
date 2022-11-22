import { GetStaticProps } from 'next';
import Layout, { LayoutHeadProps } from '@/Organisms/Layout';
import { getPageName } from '../../components/Utils/getPageName';
import { BlogPost } from '@/types/post';
import { getPublishedBlogPosts } from '@/services/notion/getPublishedBlogPosts';
import { getSingleBlogPost } from '@/services/notion/getSingleBlogPost';
import { TemplateBlogPost, TemplateBlogPostProps } from '@/Templates/BlogPost';

const Post = (props: TemplateBlogPostProps) => {
  const { post } = props;

  const tags = post.tags.map((tag) => tag.name);

  const head: LayoutHeadProps = {
    title: getPageName(post.title),
    description: post.description,
    image: post.cover,
    type: 'article',
    article: {
      autor: 'Lucas Fernando',
      section: 'technology',
      tag: tags.join(','),
      published_time: post.date,
    },
  };

  return (
    <Layout
      hero={{
        image: post.cover,
        alt: post.title,
      }}
      head={head}
    >
      <TemplateBlogPost {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const p = await getSingleBlogPost(context.params?.slug as string);

  if (p.error) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received message ${p.error.message}`
    );
  }

  if (typeof p.results.markdown !== 'undefined') {
    return {
      props: {
        markdown: p.results.markdown,
        post: p.results.post as BlogPost,
      },
      revalidate: 86400,
    };
  }

  return {
    notFound: true,
  };
};

export async function getStaticPaths() {
  const posts: any = await getPublishedBlogPosts();
  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.

  const paths = posts.results.map((post: any) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
