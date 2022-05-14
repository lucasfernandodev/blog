import { notion, n2m } from "../../config/clientNotion";
import { BlogPost, Tag } from "../types/post";
import Slugify from "./slugfy";

export async function getPublishedBlogPosts(cursor?: undefined | string) {
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  let response = await notion.databases.query({
    database_id: database,
    start_cursor: cursor,
    page_size: 10,
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

  const posts = response.results.map((res) => {
    return pageToPostTransformer(res);
  });

  return {
    results: posts,
    cursor: response.next_cursor,
  };
}

export async function getPublishedBlogPostsByFilter(
  filter: string,
  cursor?: undefined | string
) {
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  let response = await notion.databases.query({
    database_id: database,
    start_cursor: cursor,
    page_size: 10,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Categories",
          "multi_select": {
            contains: filter,
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


  if(response.results !== null){

    console.log(response.results)
    const posts = response.results.map((res) => {
      return pageToPostTransformer(res);
    });
  
    return {
      results: posts,
      cursor: response.next_cursor,
    };
  }

  return {
    results: null,
    cursor: response.next_cursor,
  };
}

export async function getProperties() {
  const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  const retrieveDatabase = await notion.databases.retrieve({
    database_id: database,
  });

  const response: any = retrieveDatabase.properties.Categories;
  return response.multi_select.options.map((value: any) => {
    return {title: value.name,slug:Slugify(value.name)};
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

  function generateTagsSlugs (tag : Tag){
    const currentTag = tag;
    currentTag.slug = Slugify(tag.name);

    return currentTag
  }

  return {
    id: page.id,
    cover: cover,
    title: page.properties.Artigo.title[0].plain_text,
    tags: tags.map(tag => {return generateTagsSlugs(tag)}),
    description: page.properties.Description.rich_text[0].plain_text,
    date: page.properties.Updated.last_edited_time,
    slug: page.properties.Slug.url,
  };
}
