import { EditBlogForm } from '@/components/blogs/edit-blog-form';

export const metadata = {
  title: 'Edit Blog Post',
  description: 'Edit your blog post',
};

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <EditBlogForm slug={params.slug} />
    </div>
  );
} 