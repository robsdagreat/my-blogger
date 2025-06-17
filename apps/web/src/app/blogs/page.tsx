import { BlogList } from '@/components/blogs/blog-list';

export const metadata = {
  title: 'Blogs | My Blogger',
  description: 'Read our latest blog posts',
};

export default function BlogsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <BlogList />
      </div>
    </div>
  );
} 