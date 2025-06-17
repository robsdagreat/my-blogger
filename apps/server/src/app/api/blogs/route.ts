import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blog } from '@/db/schema/blogs';
import { desc } from 'drizzle-orm';
import { authClient } from '@/lib/auth-client';

// GET /api/blogs - Get all blogs
export async function GET() {
  const blogs = await db.select().from(blog).orderBy(desc(blog.createdAt));
  return NextResponse.json(blogs);
}

// POST /api/blogs - Create a new blog
export async function POST(request: Request) {
  const session = await authClient.getSession();
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await request.json();
  const newBlog = await db.insert(blog).values({
    ...data,
    authorId: session.user.id,
  }).returning();

  return NextResponse.json(newBlog[0]);
} 