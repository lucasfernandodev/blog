import { notion, n2m, database } from '../../config/clientNotion';
import pageToPostTransformer, { excludeType } from './notion/pageToPostTransformer';
import Slugify from './slugfy';

type cursor = undefined | string;

interface responseProps {
  results: unknown | null;
  cursor: cursor | null;
  error: null | {
    message: string;
  };
}

const res: responseProps = {
  results: null,
  cursor: undefined,
  error: null,
};

export async function getPublishedBlogPosts(cursor?: cursor, exclude?: excludeType[],) {
  try {
    let response = await notion.databases.query({
      database_id: database,
      start_cursor: cursor,
      page_size: 5,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });

    if (
      typeof response.results !== 'undefined' &&
      response.results.length !== 0
    ) {
      const posts = response.results.map((res) => {
        return pageToPostTransformer(res, exclude ? exclude : null);
      });

      res.results = posts;
      res.cursor = response.next_cursor;
      return res;
    }

    return res;
  } catch (error: any) {
    console.log('Error getPublishedBlogPosts:', error);

    res.error = error.message;
    return res;
  }
}

export async function getPublishedBlogPostsByFilter(
  filter: string,
  filterColumn: string,
  cursor: cursor,
  exclude?: excludeType[],
) {
  try {
    const retrieveDatabase = await notion.databases.retrieve({
      database_id: database,
    });

    const responseColumn: any = retrieveDatabase.properties[filterColumn];

    const result = responseColumn.multi_select.options.map((column: any) => {
      return { name: column.name, slug: Slugify(column.name) };
    });

    const isColumn = result.findIndex((column: any) => column.slug === filter);

    if (isColumn === -1) {
      return {
        results: null,
        cursor: null,
        error: {
          message: 'Url invalido',
        },
      };
    }

    let response = await notion.databases.query({
      database_id: database,
      start_cursor: cursor,
      page_size: 5,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: filterColumn,
            multi_select: {
              contains: result[isColumn].name,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });

    console.log('getPublishedBlogPostsByFilter', response);

    const posts = response.results.map((res) => {
      return pageToPostTransformer(res, exclude ? exclude : null);
    });

    if (response.results.length === 0) {
      return {
        results: null,
        cursor: response.next_cursor,
        error: {
          message: null,
        },
      };
    }

    return {
      results: posts,
      cursor: response.next_cursor,
      error: null,
    };
  } catch (error: any) {
    console.log('Error getPublishedBlogPostsByFilter:', error);

    return {
      results: null,
      cursor: null,
      error: error.message,
    };
  }
}

export async function getProperties(Name: string) {

  const retrieveDatabase = await notion.databases.retrieve({
    database_id: database,
  });

  const response = retrieveDatabase.properties[Name];

  if (typeof response.type === 'undefined' || response.type === null) {
    res.error = {
      message: 'Propriedade não encontrada',
    };
    return res;
  }

  if (response.type === 'multi_select') {
    res.results = response.multi_select.options.map((value: any) => {
      return {
        name: value.name,
        slug: Slugify(value.name),
        color: value.color,
      };
    });

    return res;
  } else {
    res.results = response;
    return res;
  }
}

export async function getSingleBlogPost(slug: string, exclude?: excludeType[]): Promise<any> {
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
  console.log('response.results', response);

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
  post = pageToPostTransformer(page, exclude ? exclude: null);

  res.results = {
    post,
    markdown,
  };

  return res;
}