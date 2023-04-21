import { BlogPost, Tag } from '../../types/post';
import Slugify from '../../lib/slugfy';

function generateTagsSlugs(tag: Tag) {
  return {
    name: tag.name,
    slug: Slugify(tag.name),
    color: tag.color,
  };
}

export type excludeType = (keyof BlogPost);

function pageToPostTransformer(page: any, exclude?: excludeType[] | null) {

  if (exclude && exclude?.length > 7) {
    return null;
  }

  const coverDefault = 'https://res.cloudinary.com/lucasfernandodev/image/upload/v1653322546/blog/Cover_default_fyuwgl.svg';
  const pageCover = page.properties.cover.url;
  const cover = pageCover ? pageCover : coverDefault;

  const tags: Tag[] = page.properties.Tags.multi_select.map((t: Tag) => generateTagsSlugs(t));

  const objectPost: BlogPost = {
    id: page.id,
    cover: cover,
    title: page.properties.Artigo.title[0].plain_text,
    tags: tags,
    description: page.properties.Description.rich_text[0].plain_text,
    date: page.properties.Updated.last_edited_time,
    slug: page.properties.Slug.url,
    timeago: page.properties.timeago.formula.string,
  };

  exclude && exclude.map(key => objectPost[key] !== 'undefined' && delete objectPost[key]);

  return objectPost;
}

export default pageToPostTransformer;
