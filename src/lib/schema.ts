import {
  pgTable,
  text,
  timestamp,
  serial,
  boolean,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("senderId")
    .references(() => users.id)
    .notNull(),
  recipientId: integer("recipientId")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 30 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  isDeleted: boolean("isDeleted").default(false),
});
