CREATE TABLE IF NOT EXISTS "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL UNIQUE,
  "slug" text NOT NULL UNIQUE,
  "description" text,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "blogs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "content" text NOT NULL,
  "excerpt" text,
  "published" boolean NOT NULL DEFAULT false,
  "author_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "category_id" uuid REFERENCES "categories"("id") ON DELETE SET NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Insert some default categories
INSERT INTO "categories" ("name", "slug", "description") VALUES
  ('Technology', 'technology', 'Posts about programming, software, and tech news'),
  ('Lifestyle', 'lifestyle', 'Posts about daily life, habits, and personal development'),
  ('Work', 'work', 'Posts about career, productivity, and professional growth')
ON CONFLICT (slug) DO NOTHING; 