'use client';

import React from 'react';

export const QuestionsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-slate-200 rounded-lg" />
              <div className="h-8 w-8 bg-slate-200 rounded-lg" />
            </div>
          </div>

          <div className="mb-4 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>

          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-slate-200 rounded-md" />
            <div className="h-6 w-20 bg-slate-200 rounded-md" />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-16 bg-slate-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/4 mb-2" />
            {Array.from({ length: 3 }).map((_, altIndex) => (
              <div key={altIndex} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded flex-1" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="h-3 w-32 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
