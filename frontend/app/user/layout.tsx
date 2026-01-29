import Sidebar from '../components/Sidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-auto w-full">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
