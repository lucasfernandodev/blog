import type { NextApiRequest, NextApiResponse } from 'next'
import {getSingleBlogPost} from '../../../lib/request';

export default async function handle(req :NextApiRequest, res :NextApiResponse){

  const publish = await getSingleBlogPost('blog-postations');

  console.log(publish)
  return res.status(200).json({
    hy: publish
  })
}