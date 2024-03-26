import 'server-only'
import { notion } from "@/services/notion"
import { INotionTag } from "@/types/notion-post";
import { cache } from 'react';

export const getDatabaseProperties = cache(async () => {
  const getTags = (tags: INotionTag[]) => {
    const allTags = tags.map((tag) => {
      return {
        label: tag.name,
        value: tag.name.toLowerCase().trim().replaceAll(" ","_")
      };
    });

    return allTags;
  };

  const results= await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID as string })
  const rawTags = results.properties.Tags as unknown as any;

  if(rawTags?.multi_select){
    return {
      tags: getTags(rawTags?.multi_select?.options)
    }
  }
  
  return {
    tags: []
  }
})