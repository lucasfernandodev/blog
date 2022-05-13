import type { NextApiRequest, NextApiResponse } from 'next'
import {getProperties} from '../../../lib/notion';

export default async function handle(req :NextApiRequest, res :NextApiResponse){

  const publish = await getProperties();

  return res.status(200).json({
    data: publish,
  })
}