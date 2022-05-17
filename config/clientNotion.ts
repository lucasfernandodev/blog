import {Client} from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({auth: process.env.NOTION_ACCESS_TOKEN});
const n2m = new NotionToMarkdown({notionClient: notion});
const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

export {notion , n2m, database}