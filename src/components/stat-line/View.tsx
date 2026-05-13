import React from 'react';
import type { StatLineData, StatLineSettings } from './types';

export const StatLine: React.FC<{ data: StatLineData; settings: StatLineSettings }> = ({ data }) => {
  return (
    <div className="bg-[var(--primary)] py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.items.map((stat, i) => (
            <div key={stat.id || i} className="text-center" data-jp-item-id={stat.id || i} data-jp-item-field="items">
              <div className="font-display text-4xl font-black text-[var(--primary-foreground)] mb-1">{stat.value}</div>
              <div className="text-[var(--primary-foreground)]/70 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
