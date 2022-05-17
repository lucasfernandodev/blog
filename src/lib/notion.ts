import { notion, n2m } from "../../config/clientNotion";
import { BlogPost, Tag } from "../types/post";
import Slugify from "./slugfy";

export async function getPublishedBlogPosts(cursor?: undefined | string) {
  try {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

    let response = await notion.databases.query({
      database_id: database,
      start_cursor: cursor,
      page_size: 5,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Updated",
          direction: "descending",
        },
      ],
    });


    if(response.results.length === 0){
      return {
        results: null,
        cursor: response.next_cursor,
        error: {
          message: null
        },
      };
    }

    const posts = response.results.map((res) => {
      return pageToPostTransformer(res);
    });

    return {
      results: posts,
      cursor: response.next_cursor,
      error: {
        message: null
      },
    };
  } catch (error: any) {
    console.log("Error getPublishedBlogPosts:", error);

    return {
      results: null,
      cursor: null,
      error: error.message,
    };
  }
}

export async function getPublishedBlogPostsByFilter(
  filter: string,
  filterColumn: string,
  cursor?: undefined | string
) {
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  try {

    const retrieveDatabase = await notion.databases.retrieve({
      database_id: database,
    });

    const responseColumn: any = retrieveDatabase.properties[filterColumn];

    const result = responseColumn.multi_select.options.map((column: any) => {
      return { name: column.name, slug: Slugify(column.name) };
    });

   
    const isColumn = result.findIndex((column: any) => column.slug === filter);

    if(isColumn === -1){
      return {
        results: null,
        cursor: null,
        error: {
          message: "Url invalido",
        }
      };
    }
    
    let response = await notion.databases.query({
      database_id: database,
      start_cursor: cursor,
      page_size: 5,
      filter: {
        and: [
          {
            property: "Published",
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
          property: "Updated",
          direction: "descending",
        },
      ],
    });


    const posts = response.results.map((res) => {
      return pageToPostTransformer(res);
    });


    if(response.results.length === 0){
      return {
        results: null,
        cursor: response.next_cursor,
        error: {
          message: null
        }
      };
    }

    return {
      results: posts,
      cursor: response.next_cursor,
      error: null
    };

  } catch (error: any) {

    console.log("Error getPublishedBlogPostsByFilter:", error);

    return {
      results: null,
      cursor: null,
      error: error.message,
    };
  }
}

export async function getCategories() {
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  const retrieveDatabase = await notion.databases.retrieve({
    database_id: database,
  });

  const response: any = retrieveDatabase.properties.Categories;
  return response.multi_select.options.map((value: any) => {
    return { name: value.name, slug: Slugify(value.name) };
  });
}

export async function getTags() {
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  const retrieveDatabase = await notion.databases.retrieve({
    database_id: database,
  });

  const response: any = retrieveDatabase.properties.Tags;
  return response.multi_select.options.map((value: any) => {
    return {
      name: value.name,
      slug: Slugify(value.name),
      color: value.color,
    };
  });
}

export async function getSingleBlogPost(slug: string): Promise<any> {
  let post, markdown;

  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";
  // list of blog posts
  const response = await notion.databases.query({
    database_id: database,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug, // slug
        },
      },
      // add option for tags in the future
    },
    sorts: [
      {
        property: "Updated",
        direction: "descending",
      },
    ],
  });
  console.log("response.results", response);

  if (!response.results[0]) {
    throw "No results available";
  }

  // grab page from notion
  const page = response.results[0];

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  markdown = n2m.toMarkdownString(mdBlocks);
  post = pageToPostTransformer(page);

  return {
    post,
    markdown,
  };
}

export function pageToPostTransformer(page: any): BlogPost {
  let cover = page.properties.cover.url;
  const tags: Tag[] = page.properties.Tags.multi_select;

  function generateTagsSlugs(tag: Tag) {
    const currentTag = tag;
    currentTag.slug = Slugify(tag.name);

    return currentTag;
  }

  return {
    id: page.id,
    cover: cover,
    title: page.properties.Artigo.title[0].plain_text,
    tags: tags.map((tag) => {
      return generateTagsSlugs(tag);
    }),
    description: page.properties.Description.rich_text[0].plain_text,
    date: page.properties.Updated.last_edited_time,
    slug: page.properties.Slug.url,
  };
}
