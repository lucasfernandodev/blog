import type { NextApiRequest, NextApiResponse } from 'next'
import {getPublishedBlogPosts, getPublishedBlogPostsByFilter} from '../../../lib/notion';

export default async function handler(req :NextApiRequest, res :NextApiResponse){

  // Busca Publicação por filtro
  if(req.query.filter){

    const publish = await getPublishedBlogPostsByFilter(req.query.filter as string);

    console.log('publish',publish)
    if(publish.results !== null && publish.results.length !== 0){
      return res.status(200).json({
        data: publish.results,
        cursor: publish.cursor ?? null
      })
    }

    return res.status(404).json({
      data: null,
    })
  }


  // Busca todas as publicações
  const publish = await getPublishedBlogPosts(req.query.cursor as string);

  return res.status(200).json({
    data: publish.results,
    cursor: publish.cursor
  })
}