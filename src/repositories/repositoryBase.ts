import fs from 'fs';

export default abstract class RepositoryBase<T extends { id: number }> {
  protected parseJsonFile(filename: string): Map<number, T> {
    const data = fs.readFileSync(filename, { encoding: 'utf-8' });

    const json = JSON.parse(data) as T[];
    const map = new Map<number, T>();

    for (const element of json) {
      map.set(element.id, element);
    }

    return map;
  }

  protected writeToFile(data: Array<T>, filename: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(filename, JSON.stringify(data, null, 2), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
