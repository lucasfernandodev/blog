import 'server-only'
import { notion } from "@/services/notion";
import { getPageMetaData } from "./get-page-meta-data";
import { INotionPost } from "@/types/notion-post";
import { IDomainPost } from "@/types/domain-post";
import { cache } from 'react'; 
import { RetrivePagesQuery } from './helpers/retrive-pages-query';
import { tagMapper } from './tag-url-mapper';
import { env } from '../../env';

interface IProps {
  filterByTags?: string[] | undefined,
  next_cursor?: null | string,
  limit: number
}

interface IGetAllPublishedPostReturn { 
  has_more: boolean;
  next_cursor: string | null;
  posts: IDomainPost[]
}

export const getAllPublishedPost = cache(async ({
  filterByTags = [],
  next_cursor,
  limit
}: IProps): Promise<IGetAllPublishedPostReturn> => { 

  const notionQueries = new RetrivePagesQuery()

  const filter = filterByTags ? filterByTags.map(tagMapper.toDatabase) : []

  const posts = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID as string,
    page_size: limit,
    start_cursor: next_cursor ?? undefined,
    filter: {
      and: [
        ...notionQueries.getPages(),
        ...filter
      ]
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });


  // Não existe publicação no banco de dados
  if(!posts?.results) return {
    has_more: posts.has_more, 
    next_cursor: posts.next_cursor,
    posts: []
  }


  const postsList =  posts.results.map(
    post => getPageMetaData(post as unknown as INotionPost)
  );

  return {
    has_more: posts.has_more, 
    next_cursor: posts.next_cursor,
    posts: postsList
  };
})