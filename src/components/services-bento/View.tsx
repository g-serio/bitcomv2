// Layout: Features=A (BENTO GRID)
import React from 'react';
import * as Icons from 'lucide-react';
import type { ServicesBentoData, ServicesBentoSettings } from './types';

export const ServicesBento: React.FC<{ data: ServicesBentoData; settings: ServicesBentoSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-surface': 'var(--card)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
      } as React.CSSProperties}
      className="relative z-0 bg-[var(--local-bg)] py-24"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-16">
          {data.label && <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40" data-jp-field="label">{data.label}</span>}
          <h2 className="font-display text-5xl font-semibold mt-4 italic tracking-tight" data-jp-field="title">{data.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.items.map((item, i) => {
            const Icon = (Icons as any)[item.icon] || Icons.HelpCircle;
            const isLarge = item.size === 'large';
            return (
              <div
                key={item.id || i}
                data-jp-item-id={item.id}
                data-jp-item-field="items"
                className={`group p-8 border border-[var(--local-border)] bg-[var(--local-surface)] hover:border-[var(--local-primary)] transition-all flex flex-col justify-between ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Icon className="w-8 h-8 text-[var(--local-primary)] mb-8" />
                <div>
                  <h3 className="font-display text-2xl font-medium mb-3 italic">{item.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

