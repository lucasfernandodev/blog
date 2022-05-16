import type { NextApiRequest, NextApiResponse } from 'next'
import {getPublishedBlogPosts, getPublishedBlogPostsByFilter} from '../../../lib/notion';

export default async function handler(req :NextApiRequest, res :NextApiResponse){


  console.log('publish',req.query)

  // Busca Publicação por filtro
  if(req.query.filter){

    const queryFilter = req.query.filter as string;  // query do next
    const isCursor = queryFilter.includes("?cursor") ? queryFilter.split("?") : null; // verifica se existe cursor


    const filter = isCursor !== null ? isCursor[0] : queryFilter; // obtém o valor de filter

    // Obtém o valor do cursor caso existe se não undefined
    const cursor = isCursor !== null && isCursor[1].includes("cursor=") ? isCursor[1].replace("cursor=",'') : undefined;


    
    const publish = await getPublishedBlogPostsByFilter(filter, cursor);


    if(publish.results === null && publish.error.message !== null){
      return res.status(500).send(publish.error)
    }


    if(publish.results !== null && publish.results.length !== 0){
      return res.status(200).json({
        data: publish.results,
        cursor: publish.cursor ?? null
      })
    }
  }


  // Busca todas as publicações
  const publish = await getPublishedBlogPosts(req.query.cursor as string);

  if(publish.results === null && publish.error.message !== null){
    return res.status(500).send(publish.error)
  }

  return res.status(200).json({
    data: publish.results,
    cursor: publish.cursor
  })
}