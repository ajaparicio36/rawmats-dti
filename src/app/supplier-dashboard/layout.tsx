import Sidebar from '@/components/supplier-dashboard/Sidebar';
import Header from '@/components/supplier-dashboard/Header';

export default function SupplierDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
