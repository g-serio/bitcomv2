// Layout: Hero=B (BENTO GRID), Features=A (BENTO)
import React from 'react';
import type { BentoFeaturesData, BentoFeaturesSettings } from './types';

export const BentoFeatures: React.FC<{ data: BentoFeaturesData; settings: BentoFeaturesSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-card': 'var(--card)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-24 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          {data.label && (
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--local-primary)] mb-4" data-jp-field="label">
              {data.label}
            </div>
          )}
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, idx) => {
            const spanClass = item.span === '2' ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';
            return (
              <div
                key={item.id || `bento-${idx}`}
                className={`group relative overflow-hidden rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-card)] p-8 transition-all hover:border-[var(--local-primary)]/50 ${spanClass}`}
                data-jp-item-id={item.id || `bento-${idx}`}
                data-jp-item-field="items"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20 text-[var(--local-primary)]">
                   <div className="w-16 h-16 rounded-full border-4 border-current" />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--local-text)] mb-3 relative z-10">
                  {item.title}
                </h3>
                <p className="text-[var(--local-text-muted)] leading-relaxed relative z-10">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

