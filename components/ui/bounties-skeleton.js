import React from 'react';

export default function BountiesSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="relative">
          <div className="space-x-4">
            <div className="bg-gray-200 dark:bg-[#333] w-65 h-40 animate-pulse rounded-md" />
          </div>
          <div className="space-y-1">
            <div className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
              <div className="bg-gray-200 dark:bg-[#333] w-20 h-5 animate-pulse rounded-md" />
            </div>
            <div className="block text-sm font-medium text-gray-500 pointer-events-none">
              <div className="bg-gray-200 dark:bg-[#333] w-40 h-4 animate-pulse rounded-md" />
            </div>
            <div className="block text-sm font-medium text-gray-500 pointer-events-none">
              <div className="bg-gray-200 dark:bg-[#333] w-40 h-4 animate-pulse rounded-md" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
