import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("image").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
