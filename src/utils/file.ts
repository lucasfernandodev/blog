import * as fs from 'fs';
import { put,list } from "@vercel/blob";
import { env } from '../../env';

const FILE_PATH = 'posts-size.txt';

/**
 * Escreve um número no arquivo.
 * @param num O número a ser escrito.
 */
async function writeNumber(num: number): Promise<void> {
  fs.writeFileSync(FILE_PATH, num.toString(), 'utf8');
  await put('storage/posts-size.txt', num.toString(), { access: 'public', token: env.BLOB_READ_WRITE_TOKEN })
}

/**
 * Lê o número do arquivo. Se o arquivo não existir, retorna null.
 * @returns O número lido ou null se o arquivo não existir.
 */
async function readNumber(): Promise<number | null> {
  const response = await list();
  const fileInfo = response.blobs[0];
  const file = await (await fetch(fileInfo.downloadUrl)).text()
  return parseFloat(file);
}

export const postsSize = {
  get: async () => {
    return await readNumber() || 0
  },
  set: async (n: number) => {
    await writeNumber(n)
  }
}