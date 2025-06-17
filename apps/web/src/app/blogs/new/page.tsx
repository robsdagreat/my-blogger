import { NewBlogForm } from '@/components/blogs/new-blog-form';

export const metadata = {
  title: 'New Blog Post | My Blogger',
  description: 'Create a new blog post',
};

export default function NewBlogPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
        <NewBlogForm />
      </div>
    </div>
  );
} 