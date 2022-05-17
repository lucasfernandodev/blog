import type { NextApiRequest, NextApiResponse } from 'next'
import {getTags} from '../../../lib/notion';

export default async function handle(req :NextApiRequest, res :NextApiResponse){

  const publish = await getTags();
  console.log(publish)
  return res.status(200).json({
    data: publish,
  })
}