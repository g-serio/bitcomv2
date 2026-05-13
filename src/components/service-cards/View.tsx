import React from 'react';
import type { ServiceCardsData, ServiceCardsSettings } from './types';

export const ServiceCards: React.FC<{ data: ServiceCardsData; settings: ServiceCardsSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--card)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-24 bg-[var(--local-bg)] border-y border-[var(--local-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.label && (
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--local-primary)] mb-4 block" data-jp-field="label">
              {data.label}
            </span>
          )}
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => (
            <div
              key={item.id || `srv-${idx}`}
              className="group flex flex-col rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--background)] p-8 shadow-sm transition-all hover:shadow-md hover:border-[var(--local-primary)]/40"
              data-jp-item-id={item.id || `srv-${idx}`}
              data-jp-item-field="items"
            >
              {item.tag && (
                <div className="mb-6 inline-flex w-fit items-center rounded-sm bg-[var(--local-primary)]/10 px-2.5 py-1 text-xs font-mono font-semibold text-[var(--local-primary)]">
                  {item.tag}
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-[var(--local-text)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--local-text-muted)] leading-relaxed flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

