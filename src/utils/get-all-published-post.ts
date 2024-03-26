import 'server-only'
import { notion } from "@/services/notion";
import { getPageMetaData } from "./get-page-meta-data";
import { INotionPost } from "@/types/notion-post";
import { IDomainPost } from "@/types/domain-post";
import { cache } from 'react';

const POST_BY_PAGE = parseInt(process.env.POST_BY_PAGE || '10', 10)
const POST_TYPE = process.env.NODE_ENV === "production" ? "Post" : "Teste"

interface IProps {
  filterByTags?: string[] | undefined,
  next_cursor?: null | string
}

interface IFilter {
  property: string,
  multi_select: {
    contains: string
  }
}

interface IGetAllPublishedPostReturn {
  has_more: boolean;
  next_cursor: string | null;
  posts: IDomainPost[]
}

export const getAllPublishedPost = cache(async ({
  filterByTags = [],
  next_cursor
}: IProps): Promise<IGetAllPublishedPostReturn> => {

  const filter = filterByTags ? filterByTags.map(tag => {
    return {
      property: "Tags",
      multi_select: {
        contains: tag
      }
    }
  }) : [{} as IFilter]

  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    page_size: POST_BY_PAGE,
    start_cursor: next_cursor ?? undefined,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Type",
          select: {
            equals: POST_TYPE
          }
        },
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

  const rawPosts = posts.results as unknown as INotionPost[];
  const postsList = rawPosts && rawPosts.length > 0 ? rawPosts.map((post) => {
    return getPageMetaData(post);
  }) : [];

  return {
    has_more: posts.has_more,
    next_cursor: posts.next_cursor,
    posts: postsList
  };
})