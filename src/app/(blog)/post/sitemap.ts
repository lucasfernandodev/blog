import { getAllPublishedPost } from "@/utils/get-all-published-post";
import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://blog.lucasfernando.tech';

  const { posts } = await getAllPublishedPost({});

  return posts.map(post => {
      return {
        url: `${BASE_URL}/post/${post.slug}`,
        lastModified: post.date,
        changeFrequency: 'weekly',
        priority: 0.5,
      }
    })
}