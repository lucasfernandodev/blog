import * as fs from 'fs';

const FILE_PATH = 'posts-size.txt';

/**
 * Escreve um número no arquivo.
 * @param num O número a ser escrito.
 */
function writeNumber(num: number): void {
    fs.writeFileSync(FILE_PATH, num.toString(), 'utf8');
}

/**
 * Lê o número do arquivo. Se o arquivo não existir, retorna null.
 * @returns O número lido ou null se o arquivo não existir.
 */
function readNumber(): number | null {
    if (!fs.existsSync(FILE_PATH)) {
        return null;
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return parseFloat(data);
}

export const postsSize  = {
  get: () => {
    return readNumber() || 0
  },
  set: (n: number) =>{
    writeNumber(n)
  }
}