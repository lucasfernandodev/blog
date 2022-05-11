import type { NextApiRequest, NextApiResponse } from 'next'
import {getPublishedBlogPosts} from '../../../lib/notion';

export default async function handle(req :NextApiRequest, res :NextApiResponse){

  const publish = await getPublishedBlogPosts(req.query.cursor as string);

  return res.status(200).json({
    data: publish.results,
    cursor: publish.cursor
  })
}