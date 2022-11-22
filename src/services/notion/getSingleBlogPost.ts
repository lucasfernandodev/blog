import { database, n2m, notion } from '../../../config/clientNotion';
import pageToPostTransformer, { excludeType } from './pageToPostTransformer';
import { res } from './util';

export async function getSingleBlogPost(
  slug: string,
  exclude?: excludeType[]
): Promise<any> {
  let post, markdown;
  // list of blog posts
  const response = await notion.databases.query({
    database_id: database,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug, // slug
        },
      },
      // add option for tags in the future
    },
    sorts: [
      {
        property: 'Updated',
        direction: 'descending',
      },
    ],
  });

  if (!response.results[0]) {
    res.error = {
      message: 'No results available',
    };

    return res;
  }

  // grab page from notion
  const page = response.results[0];

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  markdown = n2m.toMarkdownString(mdBlocks);
  post = pageToPostTransformer(page, exclude ? exclude : null);

  res.results = {
    post,
    markdown,
  };

  return res;
}
