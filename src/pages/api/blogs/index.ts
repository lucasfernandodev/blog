import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPublishedBlogPosts,
  getPublishedBlogPostsByFilter,
} from "../../../lib/notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Busca Publicação por filtro
  if (req.query.filter) {
    const query = req.query.filter as string; // query do next
    const querySplit = query.split("?");

    const filterBy = querySplit[0];

    const isColumn = querySplit.findIndex((value) =>
      value.includes("filtercolumn=")
    );
    const filterColumn =
      isColumn !== -1
        ? querySplit[isColumn].replace("filtercolumn=", "")
        : null;

    const isCursor = querySplit.findIndex((value) => value.includes("cursor="));
    const cursor =
      isCursor !== -1 ? querySplit[isCursor].replace("cursor=", "") : undefined;

    if (filterColumn === null || filterBy.length === 0) {
      return res.status(400).send("dados invalidos");
    }

    const publish = await getPublishedBlogPostsByFilter(
      filterBy,
      filterColumn,
      cursor
    );


    if (publish.results === null && publish.error.message !== null) {
      return res.status(500).json({
        data: null,
        cursor: null,
        error: publish.error.message,
      });
    }

    if (publish.results === null && publish.error.message === null) {
      return res.status(200).json({
        data: publish.results,
        cursor: publish.cursor,
        error: null
      });
    }

    return res.status(200).json({
      data: publish.results,
      cursor: publish.cursor ?? null,
    });
  }



  // Busca todas as publicações
  const publish = await getPublishedBlogPosts(req.query.cursor as string);

  if (publish.results === null && publish.error.message !== null) {
    return res.status(500).send(publish.error);
  }

  if (publish.results === null && publish.error.message === null) {
    return res.status(200).json({
      data: publish.results,
      cursor: publish.cursor,
      error: null
    });
  }

  return res.status(200).json({
    data: publish.results,
    cursor: publish.cursor,
  });
}
