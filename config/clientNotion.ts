import {Client} from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({auth: process.env.NOTION_ACCESS_TOKEN});
const n2m = new NotionToMarkdown({notionClient: notion});

export {notion,n2m}