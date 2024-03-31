import style from './style.module.css';
import { getAllPublishedPost } from "@/utils/get-all-published-post"
import { getSinglePost } from "@/utils/get-single-post";
import { notFound } from "next/navigation";
import { ButtonBack } from "@/components/client/ButtonBack";
import { Thumbnail } from "@/components/client/Thumbnail";
import { Content } from "@/components/Content";
import { Tag } from "@/components/client/Tag";
import { Metadata } from 'next';
import { ContentMeta } from '@/components/ContentMeta';
import { tagMapper } from '@/utils/tag-url-mapper';
import { Comments } from '@/components/client/Comments'

type MetaTagsProps = {
  params: {
    slug: string;
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 3600 * 12

export async function generateMetadata({ params }: MetaTagsProps): Promise<Metadata> {
  const post = await getSinglePost({slug: params?.slug as string})
  
  if(!post) return {}

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical: `https://blog.lucasfernando.tech/post/${post.metadata.slug}`
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: 'summary_large_image',
      images: post.metadata.thumbnail as string
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      images: post.metadata.thumbnail as string
    }
  }
}

export async function generateStaticParams() {
  let results = []
  let data = await getAllPublishedPost({});

  results = [...data.posts]

  while (data.has_more) {
    data = await getAllPublishedPost({ next_cursor: data.next_cursor })
    results = [...results, ...data.posts]
  }

  return results.map(({ slug }) => ({
    slug,
    fallback: "blocking",
  }))
}

type Props = {
  params: {
    slug: string;
  };
};

const BlogPost = async ({ params }: Props) => {
  const post = await getSinglePost({slug: params?.slug as string});

  if (!post) notFound()

  return (
    <div className={style.layout}>
      <section className={style.blogpost}>
        <div className={style.container_back}>
          <ButtonBack />
        </div>
        <Thumbnail src={post.metadata.thumbnail} alt={post.metadata.title} />
        <h1>{post.metadata?.title}</h1>
        <ContentMeta slug={post.metadata.slug} date={post.metadata.date} />

        <Content content={post.markdown?.parent} />
        <div className={style.container_tag}>
          {post.metadata.tags && post.metadata.tags.map(tag =>
            <Tag key={tag.value} slug={`/?tags=${tagMapper.toURL([tag.label])}`}>{tag.label}</Tag>
          )}
        </div>
      </section>

      <Comments />
    </div>
  )
}

export default BlogPost