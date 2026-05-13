import React from 'react';
import type { ReviewsSliderData, ReviewsSliderSettings } from './types';
import { Star } from 'lucide-react';

export const ReviewsSliderComponent: React.FC<{ data: ReviewsSliderData; settings: ReviewsSliderSettings }> = ({ data }) => {
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
      className="relative z-0 py-28 bg-[var(--local-bg)] border-y border-[var(--local-border)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, idx) => (
             <div 
                key={item.id || `legacy-${idx}`}
                className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-8 flex flex-col h-full"
                data-jp-item-id={item.id || `legacy-${idx}`}
                data-jp-item-field="items"
             >
                <div className="flex gap-1 mb-4 text-[#F59E0B]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <blockquote className="text-[var(--local-text)] font-medium leading-relaxed mb-6 flex-1 text-lg">
                  "{item.text}"
                </blockquote>
                <div className="font-display font-bold text-sm text-[var(--local-text-muted)] uppercase tracking-wider">
                  — {item.author}
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

