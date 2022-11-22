import { database, notion } from '../../../config/clientNotion';
import { cursor } from '../../types/notion';
import pageToPostTransformer, { excludeType } from './pageToPostTransformer';
import { res } from './util';

export async function getPublishedBlogPosts(
  cursor?: cursor,
  exclude?: excludeType[]
) {
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
  exclude?: excludeType[]
) {
  try {

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
              contains: filter,
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
