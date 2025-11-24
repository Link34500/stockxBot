import { Collection } from "discord.js";
import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

type AnyClass<T = any> = new (...args: any[]) => T;

export async function getCollection<T>(
  iterPath: string
): Promise<Collection<string, T>> {
  const collection = new Collection<string, T>();

  for (const file of fs.readdirSync(iterPath)) {
    const filePath = path.join(iterPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      const subCollection = await getCollection<T>(filePath);
      for (const [key, value] of subCollection) {
        collection.set(key, value);
      }
      continue;
    }

    const module = await import(pathToFileURL(filePath).href);

    const Klass = module.default as AnyClass<T>;

    const moduleName = path.parse(file).name;
    collection.set(moduleName, new Klass());
  }

  return collection;
}
