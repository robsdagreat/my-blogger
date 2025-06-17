import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const category = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blog = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  published: boolean("published").notNull().default(false),
  authorId: text("author_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").references(() => category.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Types for TypeScript
export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;
export type Blog = typeof blog.$inferSelect;
export type NewBlog = typeof blog.$inferInsert; 