export type Tag = {
  color: string
  id: string
  name: string
  slug: string
}

export type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string,
}

export type BlogPostResponse = {
  results: BlogPost[],
  cursor: any,
  error: any,
}
