import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export const metadata = {
  title: 'Dashboard - Analytics',
  description: 'Dashboard analytics for your blog',
};

export default function DashboardAnalyticsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Analytics Overview</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>This is where your dashboard analytics will be displayed.</p>
        <p>Coming soon: charts for posts per category, recent activity, etc.</p>
      </div>
    </DashboardLayout>
  );
}
