import style from './style.module.css';
import { getAllPublishedPost } from "@/utils/get-all-published-post"
import { getSinglePost } from "@/utils/get-single-post";
import { notFound } from "next/navigation";
import { Thumbnail } from "@/components/client/Thumbnail";
import { Metadata } from 'next';
import { postsSize } from '@/utils/file';
import Image from 'next/image';
import Link from 'next/link';
import { RenderContent } from '@/components/render-content';
import { ownerLinks } from '@/utils/owner-links';
import { env } from '../../../../../env';

type MetaTagsProps = {
  params: {
    slug: string;
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const dynamic = 'force-static';

export const revalidate = 3600 * 12;


export async function generateMetadata({ params }: MetaTagsProps): Promise<Metadata> {
  const post = await getSinglePost({ slug: params?.slug as string })

  if (!post) return {}

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical: `${env.BASE_URL}/${post.metadata.slug}`
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
    },
  }
}

export async function generateStaticParams() {
  let results = []
  let data = await getAllPublishedPost({
    limit: 100
  });

  results = [...data.posts]

  while (data.has_more) {
    data = await getAllPublishedPost({
      next_cursor: data.next_cursor,
      limit: 100
    })
    results = [...results, ...data.posts]
  }

  await postsSize.set(results.length)

  return results.map(({ slug }) => {
    return {
      slug: slug,
      fallback: false,
    }
  })
}

type Props = {
  params: {
    slug: string;
  };
};




const BlogPost = async ({ params }: Props) => {
  const post = await getSinglePost({ slug: params?.slug as string });

  if (!post) notFound()

  return (

    <div className={style.layout}>

      <section className={style.blogpost}>
        <Thumbnail src={post.metadata.thumbnail} alt={post.metadata.title} />

        <div className={style.meta}>
          <h1>{post.metadata?.title}</h1>
          <p>{post.metadata.date}</p>
        </div>

        <RenderContent content={post.markdown?.parent} />
      </section>

      <div className={style.container_author}>
        <div className={style.wrapper}>
          <div className={style.author_image}>
            <Image width={64} height={64} src="/logo.svg" alt="autor" />
          </div>
          <div className={style.author_info}>
            <h3>Lucas Fernando</h3>
            <p>Desenvolvedor web front-end. Em busca de um design final para qualquer coisa.</p>
            <Link href={ownerLinks.portfolio}>Conhecer Autor</Link>
          </div>
        </div>
      </div>

      <section className={style.section} id={style.more}>
        <p>Gostou desse Artigo? <Link className={style.donation} href={ownerLinks.donate}>Deixe uma dica</Link>.</p>
        <Link className={style.btnOthersPublications} href="/">
          Outras Publicações
        </Link>
      </section>
    </div>
  )
}

export default BlogPost