import style from './style.module.css';
import { getAllPublishedPost } from "@/utils/get-all-published-post"
import { getSinglePost } from "@/utils/get-single-post";
import { notFound } from "next/navigation";
import { ReportView } from './view';
import { ButtonBack } from "@/components/client/ButtonBack";
import { Thumbnail } from "@/components/client/Thumbnail";
import { Content } from "@/components/Content";
import { Tag } from "@/components/Tag";
import { Metadata } from 'next';
import { ContentMeta } from '@/components/ContentMeta';

type MetaTagsProps = {
  params: {
    slug: string;
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 60

export async function generateMetadata({ params }: MetaTagsProps): Promise<Metadata> {
  const { metadata } = await getSinglePost(params?.slug as string)

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description
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
  const post = await getSinglePost(params?.slug as string)
  if (!post) notFound()

  return (
    <div className={style.layout}>
      {params.slug && <ReportView slug={params.slug} />}
      <section className={style.blogpost}>
        <div className={style.container_back}>
          <ButtonBack />
        </div>
        <Thumbnail src={post.metadata.thumbnail} alt={post.metadata.title} />
        <h1>{post.metadata?.title}</h1>
        <ContentMeta slug={post.metadata.slug} date={post.metadata.date}/>

        <Content content={post.markdown?.parent} />
        <div className={style.container_tag}>
          {post.metadata.tags && post.metadata.tags.map(tag => <Tag key={tag.value}>{tag.label}</Tag>)}
        </div>
      </section>

      {post.metadata.Relationed && (
        <>
          <h2>Postagem relacionada</h2>
          {/* Add Related Post */}
        </>
      )}
    </div>
  )
}

export default BlogPost