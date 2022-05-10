import { notion, n2m } from "../../clientNotion";
import { BlogPost } from "../types/post";

export async function getPublishedBlogPosts(){
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? '';

  const response = await notion.databases.query({
    database_id: database,
    filter: {
        property: 'Published',
        checkbox: {
            equals: true
        }
    },
    sorts: [
        {
            property: 'Updated',
            direction: 'descending'
        }
    ]
});

return response.results.map(res => {
    return pageToPostTransformer(res);
})
}


export async function getSingleBlogPost(slug: string): Promise<any> {
  let post, markdown

  const database = process.env.NOTION_BLOG_DATABASE_ID ?? '';
  // list of blog posts
  const response = await notion.databases.query({
      database_id: database,
      filter: {
          property: 'Slug',
          formula: {
              string: {
                equals: slug // slug
              }
          },
          // add option for tags in the future
      },
      sorts: [
          {
              property: 'Updated',
              direction: 'descending'
          }
      ]
  });

  if (!response.results[0]) {
      throw 'No results available'
  }

  // grab page from notion
  const page = response.results[0];

  const mdBlocks = await n2m.pageToMarkdown(page.id)
  markdown = n2m.toMarkdownString(mdBlocks);
  post = pageToPostTransformer(page);

  return {
      post,
      markdown
  }
}

export function pageToPostTransformer(page: any): BlogPost {
  let cover = page.cover;
  switch (cover) {
      case 'file':
          cover = page.cover.file
          break;
      case 'external':
          cover = page.cover.external.url;
          break;
      default:
          // Add default cover image if you want...
          cover = ''
  }

  return {
      id: page.id,
      cover: cover,
      title: page.properties.Name.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Updated.last_edited_time,
      slug: page.properties.Slug.url
  }
}
