// app/dashboard/loading.tsx
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Skeleton */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Skeleton className="h-8 w-48" />
          <div className="ml-auto hidden md:block">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <aside className="w-full md:w-64 bg-white p-5 rounded-lg shadow-sm hidden md:block">
            <div className="mb-6">
              <Skeleton className="h-7 w-32 mb-4" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="mb-6">
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="px-2">
                <Skeleton className="h-5 w-full" />
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="space-y-2">
                {Array(6).fill(null).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-16 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1">
            {/* Mobile Search Skeleton */}
            <div className="relative mb-4 md:hidden">
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Search Info Skeleton */}
            <div className="mb-6">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Product Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(null).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-3" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-9 w-28" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}