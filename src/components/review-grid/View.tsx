import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ReviewGridData, ReviewGridSettings } from './types';

export const ReviewGrid: React.FC<{ data: ReviewGridData; settings: ReviewGridSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--secondary)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-display text-3xl font-bold text-center mb-16 text-[var(--foreground)]" data-jp-field="title">{data.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <div 
              key={item.id || i} 
              className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-sm"
              data-jp-item-id={item.id || i}
              data-jp-item-field="items"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {Array.from({length: item.stars}).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-[var(--foreground)] italic mb-8">"{item.body}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-[var(--border)]">
                  <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold">
                    {item.author.substring(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="font-display font-bold text-sm text-[var(--foreground)]">{item.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
