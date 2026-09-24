import * as SQLite from "expo-sqlite";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
};

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const IMAGE_BASE =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDb() {
  if (!dbPromise) dbPromise = SQLite.openDatabaseAsync("little-lemon.db");
  return dbPromise;
}

export async function initMenu() {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      name TEXT PRIMARY KEY NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      imageUrl TEXT NOT NULL
    );
  `);

  const row = await db.getFirstAsync<{ total: number }>(
    "SELECT COUNT(*) AS total FROM menu"
  );

  if ((row?.total ?? 0) > 0) return;

  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Menu download failed.");
  const json = await response.json();

  await db.withTransactionAsync(async () => {
    for (const item of json.menu) {
      await db.runAsync(
        `INSERT OR REPLACE INTO menu
          (name, description, price, category, imageUrl)
         VALUES (?, ?, ?, ?, ?)`,
        item.name,
        item.description,
        Number(item.price),
        item.category,
        `${IMAGE_BASE}/${item.image}`
      );
    }
  });
}

export async function getCategories() {
  const db = await getDb();
  const rows = await db.getAllAsync<{ category: string }>(
    "SELECT DISTINCT category FROM menu ORDER BY category"
  );

  const order = ["starters", "mains", "desserts"];
  return rows
    .map((x) => x.category)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export async function queryMenu(search: string, categories: string[]) {
  const db = await getDb();
  const conditions: string[] = [];
  const params: string[] = [];

  const cleanSearch = search.trim();
  if (cleanSearch) {
    conditions.push("LOWER(name) LIKE LOWER(?)");
    params.push(`%${cleanSearch}%`);
  }

  if (categories.length) {
    conditions.push(`category IN (${categories.map(() => "?").join(",")})`);
    params.push(...categories);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return db.getAllAsync<MenuItem>(
    `SELECT name, description, price, category, imageUrl
     FROM menu ${where}
     ORDER BY name`,
    params
  );
}
