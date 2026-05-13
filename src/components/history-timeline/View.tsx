import React from 'react';
import type { HistoryTimelineData, HistoryTimelineSettings } from './types';

export const HistoryTimelineComponent: React.FC<{ data: HistoryTimelineData; settings: HistoryTimelineSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--elevated)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)] border-y border-[var(--local-border)]"
    >
      <div className="max-w-[800px] mx-auto px-8">
        <div className="text-center mb-20">
          {data.label && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-primary)] mb-4" data-jp-field="label">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.label}
              <span className="w-5 h-px bg-[var(--local-primary)]" />
            </div>
          )}
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
        </div>

        <div className="relative border-l-2 border-[var(--local-border)] ml-4 md:ml-1/2 space-y-12 pb-8">
          {data.items.map((item, idx) => (
            <div 
              key={item.id || `legacy-${idx}`} 
              className="relative pl-8 md:pl-12"
              data-jp-item-id={item.id || `legacy-${idx}`}
              data-jp-item-field="items"
            >
              <div className="absolute w-4 h-4 rounded-full bg-[var(--local-primary)] -left-[9px] top-1.5 ring-4 ring-[var(--local-bg)]" />
              <div className="font-mono font-bold text-xl text-[var(--local-primary)] mb-2">{item.year}</div>
              <div className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-6 shadow-sm">
                <h3 className="font-display font-bold text-[1.2rem] text-[var(--local-text)] mb-2">{item.title}</h3>
                <p className="text-[var(--local-text-muted)] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

