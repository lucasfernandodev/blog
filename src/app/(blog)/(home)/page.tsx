import style from './style.module.css';
import { getAllPublishedPost } from '@/utils/get-all-published-post';
import { getDatabaseProperties } from '@/utils/get-database-properties';
import { tagMapper } from '@/utils/tag-url-mapper'; 
import { Select } from '@/components/client/Select'; 
import { postsSize } from '@/utils/file'; 
import { parseNumber } from '@/utils/parse-number';
import { ListCardPosts } from '@/components/list-card-posts';
import { env } from '../../../../env';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};


const QTD_POSTS_PER_PAGE = env.POST_BY_PAGE;

const HomePage = async ({ searchParams }: SearchParamProps) => {

  const tag = searchParams?.filter || null;
  const moreIdCursor = searchParams?.more
  const page = parseNumber(searchParams?.page)
  const mappedTags = tag ? tagMapper.toLabel(tag) : undefined

  const { posts, next_cursor } = await getAllPublishedPost({
    limit: QTD_POSTS_PER_PAGE,
    filterByTags: mappedTags,
    next_cursor: moreIdCursor
  });

  const { tags } = await getDatabaseProperties()

  return (
    <>
      <section className={style.section} id={style.selectContent}>
        <h3>Selecionar Conteúdos</h3>
        <Select data={tags} value={mappedTags ? mappedTags[0] : '-'} />
      </section>


      <ListCardPosts 
       posts={posts}
       tags={mappedTags}
       config={{
        isPrevPage: !!moreIdCursor,
        queryCursor: next_cursor,
        page: page,
        posts_per_page: QTD_POSTS_PER_PAGE,
        posts_size: await postsSize.get() || 0
       }}
      />
    </>
  )
}

export default HomePage