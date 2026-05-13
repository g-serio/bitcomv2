// Layout: Features=B (HORIZONTAL SCROLL)
import React from 'react';
import type { ReviewsCarouselData, ReviewsCarouselSettings } from './types';

export const ReviewsCarousel: React.FC<{ data: ReviewsCarouselData; settings: ReviewsCarouselSettings }> = ({ data }) => {
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
      className="relative z-0 py-24 bg-[var(--local-bg)] border-y border-[var(--local-border)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {data.label && (
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--local-primary)] mb-4" data-jp-field="label">
                {data.label}
              </div>
            )}
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--local-text)]" data-jp-field="title">
              {data.title}
            </h2>
          </div>
          <div className="flex gap-1 text-[var(--local-primary)]">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            ))}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-12 px-6 lg:px-8 gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {data.items.map((item, idx) => (
          <div
            key={item.id || `rev-${idx}`}
            className="snap-start shrink-0 w-[320px] md:w-[400px] rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--background)] p-8 shadow-sm"
            data-jp-item-id={item.id || `rev-${idx}`}
            data-jp-item-field="items"
          >
            <p className="text-lg text-[var(--local-text)] font-medium italic mb-6 leading-relaxed">
              "{item.quote}"
            </p>
            <div className="font-display font-bold text-[var(--local-text-muted)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--local-border)] flex items-center justify-center text-xs font-mono text-[var(--local-text)]">
                {item.author.charAt(0)}
              </div>
              {item.author}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

