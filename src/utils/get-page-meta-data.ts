import 'server-only'
import { INotionPost, INotionTag } from "@/types/notion-post";
import { getToday } from "./get-today";
import { cache } from 'react';


export const getPageMetaData = cache(({ id, properties }: INotionPost) => {
  const getTags = (tags: INotionTag[]) => {
    const allTags = tags.map((tag) => {
      return {
        label: tag.name,
        value: tag.name.toLowerCase().trim().replaceAll(" ","_")
      };
    });

    return allTags;
  };


  return {
    id: id,
    title: properties.Title.title[0].plain_text,
    tags: getTags(properties.Tags.multi_select),
    description: properties.Description.rich_text[0]?.plain_text || 'Description is empty',
    date: getToday(properties.Date.last_edited_time),
    slug: properties.Slug.rich_text[0]?.plain_text || 'Slug is empty',
    thumbnail: properties.Thumbnail.rich_text[0]?.plain_text || null,
    Relationed: properties.Relationed.rich_text[0]?.plain_text || null
  };
})