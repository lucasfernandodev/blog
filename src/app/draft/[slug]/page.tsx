import { AutoDisconnectDraftMode } from "@/components/client/AutoDisconnectDraftMode";
import { getSinglePost } from "@/utils/get-single-post";
import { draftMode } from "next/headers"
import { notFound } from "next/navigation";
import style from './style.module.css';
import { Thumbnail } from "@/components/client/Thumbnail";
import { ContentMeta } from "@/components/ContentMeta";
import { Content } from "@/components/Content";
import { Tag } from "@/components/client/Tag";
import { MdStringObject } from "notion-to-md/build/types";
import { tagMapper } from "@/utils/tag-url-mapper";
import { Footer } from '@/components/layout/Footer';
import { HeaderDraft } from "@/components/layout/HeaderDraft";

interface IPOST {
  metadata: {
    id: string;
    title: string;
    tags: {
      label: string;
      value: string;
    }[];
    description: string;
    date: string;
    slug: string;
    thumbnail: string | null;
  };
  markdown: MdStringObject;
}

const getDate = async (slug: string): Promise<IPOST> => {
  const { isEnabled } = draftMode();

  if (isEnabled) {
    const post = await getSinglePost({slug, draft: true})
    if(post) return post;
  }

  return {} as IPOST
}

type MetaTagsProps = {
  params: {
    slug: string;
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function DraftPage({ params }: MetaTagsProps) {

  if (!params?.slug) return notFound();

  const post = await getDate(params.slug)

  if (!post || !post.metadata || !post.metadata?.title) return notFound();




  return (
    <>
    <HeaderDraft />
      <div className={style.layout}>
        <AutoDisconnectDraftMode />
        <section className={style.blogpost}>
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
      </div>
      <Footer />
    </>
  )
}