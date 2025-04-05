// app/page.tsx
import SearchChatbox from '@/components/dashboard/searchChatBox';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-slate-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="pt-16 pb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Find What You Need</h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Search our catalog or ask questions to discover products that match your needs
          </p>
        </div>
        <SearchChatbox />
      </div>
    </main>
  );
}