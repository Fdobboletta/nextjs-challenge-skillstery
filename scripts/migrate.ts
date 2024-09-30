import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "@/lib/db";

const main = async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
};

main();
