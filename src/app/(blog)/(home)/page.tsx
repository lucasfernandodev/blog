import style from './style.module.css';
import { Modal } from '@/components/client/Modal';
import { getAllPublishedPost } from '@/utils/get-all-published-post';
import { PostCard } from '@/components/PostCard';
import { getDatabaseProperties } from '@/utils/get-database-properties';
import { ButtonFilter } from '@/components/client/ButtonFilter';
import { tagMapper } from '@/utils/tag-url-mapper';
import Link from 'next/link';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export async function generateStaticParams() {
  const { posts } = await getAllPublishedPost({});

  return posts.map(({ slug }) => ({
    slug,
    fallback: false,
  }))
}

const HomePage = async ({ searchParams }: SearchParamProps) => {
  const show = searchParams?.show;
  const paramsTags = searchParams?.tags || null;
  const filterValues = paramsTags ? tagMapper.toLabel(paramsTags) : undefined

  const { posts, has_more } = await getAllPublishedPost({
    filterByTags: filterValues
  });

  const { tags } = await getDatabaseProperties()

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.section_header}>
          <h2>Postagens Recentes</h2>
          {posts.length > 0 || paramsTags ? <ButtonFilter /> : ''}
        </div>

        <div className={style.container}>
          {posts && !paramsTags && posts.length === 0 && <p>Não exite publicações.</p>}
          {posts && paramsTags && posts.length === 0 && <p>Não existe nenhuma publicação com essas tags.</p>}
          {posts && posts.length > 0 && posts.map(({ title, description, id, slug, date }) => (
            <PostCard
              key={id}
              title={title}
              description={description}
              date={date}
              url={`/post/${slug}`}
            />))}
        </div>
        {
          has_more === true && (
            <div className={style.container_show_all_publications}>
              <Link href="/all">Mostrar todas as publicações</Link>
            </div>
          )
        }
      </div>
      {show && <Modal tags={tags} />}
    </>
  )
}

export default HomePage