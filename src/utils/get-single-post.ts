import 'server-only'
import { notion } from "@/services/notion";
import { getPageMetaData } from "./get-page-meta-data";
import { NotionToMarkdown } from "notion-to-md";
import { INotionPost } from "@/types/notion-post";
import { cache } from 'react';
import { textSpanIntersectsWithPosition } from 'typescript';

const n2m = new NotionToMarkdown({ notionClient: notion });

interface IProps {
  slug: string;
  draft?: boolean
}

export const getSinglePost = cache(async ({
  slug,
  draft = false,
}: IProps) => {

  const postType = process.env.NODE_ENV === 'development' ? 'Teste' : 'Post'

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
          property: "Status",
          status: {
            equals: draft ? 'Draft' : 'Published',
          },
        },
        {
          property: "Type",
          select: {
            equals: postType
          }
        }
      ]
    }
  });


  const page = response.results[0] as unknown as INotionPost;

  if (page) {
    const metadata = getPageMetaData(page);

    const codeBlock = (text: string, language?: string, caption?: string) => {
      if (language === "plain text") language = "text";
      const top = '```' +language
      const bottom = '```'
      return top+'\n'+text+`[caption=${caption}]`+'\n'+bottom;
    };


    n2m.setCustomTransformer("code", async (block) => {
      const { code } = block as any;
      if (code.caption && code.caption.length > 0) {
        const transform = codeBlock(code.rich_text[0].plain_text.trim(), code.language, code.caption[0].plain_text)
        console.log("codeBlock", code, transform)
        return transform
      }

      return false;
    })

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      metadata,
      markdown: mdString,
    }
  }

  return undefined
})