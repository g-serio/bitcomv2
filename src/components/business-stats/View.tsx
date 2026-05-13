// Layout: Hero=F (MINIMAL HERO), Features=A (BENTO)
import React from 'react';
import type { BusinessStatsData, BusinessStatsSettings } from './types';

export const BusinessStats: React.FC<{ data: BusinessStatsData; settings: BusinessStatsSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--muted)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': 'var(--border)',
      } as React.CSSProperties}
      className="relative z-0 py-20 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16 space-y-4">
            {data.label && (
              <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)]" data-jp-field="label">
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}
            {data.title && (
              <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-[var(--local-text-muted)] max-w-3xl mx-auto" data-jp-field="subtitle">
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {data.stats.map((stat, idx) => (
            <div
              key={stat.id || `legacy-${idx}`}
              className="text-center space-y-2"
              data-jp-item-id={stat.id || `legacy-${idx}`}
              data-jp-item-field="stats"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display font-black text-4xl lg:text-5xl text-[var(--local-primary)]">
                  {stat.number}
                </span>
                {stat.suffix && (
                  <span className="font-display font-bold text-xl text-[var(--local-accent)]">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-[var(--local-text-muted)] uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
