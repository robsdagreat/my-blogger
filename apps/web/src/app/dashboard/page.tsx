import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // TODO: Replace with Better Auth session check
  // For now, just render the dashboard
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome!
        </h2>
        <p className="text-gray-600">Email: (user email here)</p>
      </div>
    </div>
  );
}
