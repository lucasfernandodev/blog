import { z } from "zod";

const parseEnv = z.object({
  BASE_URL: z.string().url(),
  DRAFT_SECREATE: z.string(),
  NOTION_TOKEN: z.string(),
  POST_BY_PAGE: z.coerce.number().default(10),
  NODE_ENV: z.string(),
  NOTION_DATABASE_ID: z.string(),
})

export const env = parseEnv.parse(process.env)