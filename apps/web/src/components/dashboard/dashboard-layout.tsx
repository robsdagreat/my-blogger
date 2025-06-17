'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className={clsx(
              'block px-3 py-2 rounded-md text-sm font-medium',
              pathname === '/dashboard'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            )}
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/blogs"
            className={clsx(
              'block px-3 py-2 rounded-md text-sm font-medium',
              pathname.startsWith('/dashboard/blogs')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            )}
          >
            Manage Blogs
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
} 