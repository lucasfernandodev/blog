import type { NextApiRequest, NextApiResponse } from 'next';
import {getSingleBlogPost} from '../../../lib/notion';

export default async function handle(req :NextApiRequest, res :NextApiResponse){


  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  const slug = req.body.slug;



  try {
    const publish = await getSingleBlogPost(slug);

    return res.status(200).json({
      data: publish
    });

  } catch (error: any) {
    console.log(`Error in /api/blogs/post.ts: ${error}`);

    return res.status(200).json({
      data: {
        markdown: null,
        post: null,
        error: {
          message: error.message
        }
      }
    });
  }
}