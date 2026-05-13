import React from 'react';
import type { StatsBandData, StatsBandSettings } from './types';

export const StatsBand: React.FC<{ data: StatsBandData; settings: StatsBandSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
      } as React.CSSProperties}
      className="relative z-0 py-16 bg-[var(--local-bg)] border-y border-[var(--local-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--local-border)]">
          {data.items.map((item, idx) => (
            <div
              key={item.id || `stat-${idx}`}
              className="flex flex-col items-center text-center px-4"
              data-jp-item-id={item.id || `stat-${idx}`}
              data-jp-item-field="items"
            >
              <div className="font-display text-4xl md:text-5xl font-black text-[var(--local-text)] tracking-tighter mb-2">
                {item.value}
              </div>
              <div className="text-sm font-mono uppercase tracking-widest text-[var(--local-primary)] font-bold">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

