import 'server-only'
import { notion } from "@/services/notion";
import { getPageMetaData } from "./get-page-meta-data";
import { NotionToMarkdown } from "notion-to-md";
import { INotionPost } from "@/types/notion-post";
import { cache } from 'react';

const n2m = new NotionToMarkdown({ notionClient: notion });

interface IProps {
  slug: string;
  mode?: 'Post' | 'Draft' | 'Teste';
}

export const getSinglePost = cache(async ({
  slug,
  mode = process.env.NODE_ENV === 'development' ? 'Teste' : 'Post'
}: IProps) => {


  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      and: [
        {
          property: "Slug",
          formula: {
            string: {
              equals: slug,
            },
          },
        },
        {
          property: "Type",
          select: {
            equals: mode
          }
        }
      ]
    }
  });


  const page = response.results[0] as unknown as INotionPost;

  if(page){
    const metadata = getPageMetaData(page);
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);
  
    return {
      metadata,
      markdown: mdString,
    }
  }

  return undefined
})