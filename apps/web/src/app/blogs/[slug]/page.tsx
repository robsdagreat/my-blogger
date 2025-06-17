import { notFound } from 'next/navigation';

async function getBlog(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs?slug=${slug}`);
  if (!res.ok) return null;
  const blogs = await res.json();
  // API returns an array, find the one with the matching slug
  return Array.isArray(blogs) ? blogs.find((b: any) => b.slug === slug) : null;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  if (!blog) return notFound();

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>By {blog.author?.name || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{blog.category?.name || 'Uncategorized'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <article className="prose prose-lg max-w-none">
          {blog.content}
        </article>
      </div>
    </div>
  );
} 