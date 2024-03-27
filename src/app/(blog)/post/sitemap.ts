import { getAllPublishedPost } from "@/utils/get-all-published-post";
import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://blog.lucasfernando.tech';

  let results = []
  let data = await getAllPublishedPost({});

  results = [...data.posts]

  while (data.has_more) {
    data = await getAllPublishedPost({ next_cursor: data.next_cursor })
    results = [...results, ...data.posts]
  }

  return results.map(post => {
      return {
        url: `${BASE_URL}/post/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      }
    })
}