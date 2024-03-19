import { INotionPost, INotionTag } from "@/types/notion-post";
import { getToday } from "./get-today";


export const getPageMetaData = ({ id, properties }: INotionPost) => {
  const getTags = (tags: INotionTag[]) => {
    const allTags = tags.map((tag) => {
      return tag.name;
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
  };
}