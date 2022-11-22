const db = new Map();

export const storage = {
  async get<T>(key: string): Promise<T>{
    return db.get(key);
  },
  async set<T>(key: string, value: T): Promise<void>{
    db.set(key, value);
  },
  async size(): Promise<number>{
    return db.size;
  },
  async all(): Promise<[]>{
    const arr = [] as any;
    for (const row of db) {  
      arr.push(row[1]);
    }
    return arr;
  }
};