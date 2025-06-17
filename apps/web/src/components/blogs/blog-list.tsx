'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  } | null;
};

export function BlogList() {
  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => fetch('/api/blogs').then(res => res.json())
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading blogs. Please try again later.
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <article key={blog.id} className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">
              <Link 
                href={`/blogs/${blog.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {blog.title}
              </Link>
            </h2>
            {!blog.published && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Draft
              </span>
            )}
          </div>
          
          {blog.excerpt && (
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <span>By {blog.author.name}</span>
            <span className="mx-2">•</span>
            <span>{blog.category?.name || 'Uncategorized'}</span>
            <span className="mx-2">•</span>
            <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
          </div>
        </article>
      ))}
    </div>
  );
} 