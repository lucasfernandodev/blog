import type { NextApiRequest, NextApiResponse } from 'next'
import {getSingleBlogPost} from '../../../lib/notion';

export default async function handle(req :NextApiRequest, res :NextApiResponse){

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const slug = req.body.slug

  const publish = await getSingleBlogPost(slug);

  return res.status(200).json({
    data: publish
  })

}