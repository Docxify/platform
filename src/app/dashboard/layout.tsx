import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-x-auto">
        <main className="p-6 space-y-6 w-full">{children}</main>
      </div>
    </div>
  );
}