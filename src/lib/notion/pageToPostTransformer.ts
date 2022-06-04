import { BlogPost, Tag } from '../../types/post';
import Slugify from '../slugfy';

function generateTagsSlugs(tag: Tag) {
  const currentTag = tag;
  currentTag.slug = Slugify(tag.name);
  return currentTag;
}

export type excludeType = (keyof BlogPost);

function pageToPostTransformer(page: any, exclude?: excludeType[] | null) {

  if(exclude && exclude?.length > 7){
    return null;
  }

  const coverDefault = '/assets/defaultHeroPost.svg';
  const pageCover = page.properties.cover.url;
  const cover = pageCover ? pageCover : coverDefault;

  const tags: Tag[] = page.properties.Tags.multi_select;

  const objectPost: BlogPost = {
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

  exclude && exclude.map(key => objectPost[key] !== 'undefined' && delete objectPost[key]);

  return objectPost;
}

export default pageToPostTransformer;