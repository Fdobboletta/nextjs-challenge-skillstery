import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  serial,
  boolean,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// Tables
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
  receiverId: integer("receiverId")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 30 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
  sentMessages: many(messages, { relationName: "senderId" }),
  receivedMessages: many(messages, { relationName: "receiverId" }),
}));

export const postsRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
  }),
}));
