import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export const metadata = {
  title: 'Dashboard - Manage Blogs',
  description: 'Manage your blog posts',
};

export default function ManageBlogsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Manage Blog Posts</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>This is where you will manage your blog posts.</p>
        <p>Coming soon: a list of all blog posts with edit and delete options.</p>
      </div>
    </DashboardLayout>
  );
} 