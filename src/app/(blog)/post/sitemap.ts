import { getAllPublishedPost } from "@/utils/get-all-published-post";
import { MetadataRoute } from "next"; 
import { env } from "../../../../env";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let results = []
  let data = await getAllPublishedPost({limit: 100});

  results = [...data.posts]

  while (data.has_more) {
    data = await getAllPublishedPost({ next_cursor: data.next_cursor, limit: 100 })
    results = [...results, ...data.posts]
  }

  return results.map(post => {
      return {
        url: `${env.BASE_URL}/post/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      }
    })
}