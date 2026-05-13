// Layout: Hero=F (MINIMAL HERO), Features=B (HORIZONTAL SCROLL)
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { TestimonialsBandData, TestimonialsBandSettings } from './types';

export const TestimonialsBand: React.FC<{ data: TestimonialsBandData; settings: TestimonialsBandSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-16 space-y-6">
          {data.label && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)]" data-jp-field="label">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.label}
            </div>
          )}
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-[var(--local-text-muted)] max-w-3xl mx-auto" data-jp-field="subtitle">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial, idx) => (
            <Card
              key={testimonial.id || `legacy-${idx}`}
              className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)] jp-animate-in"
              style={{ animationDelay: `${idx * 0.15}s` }}
              data-jp-item-id={testimonial.id || `legacy-${idx}`}
              data-jp-item-field="testimonials"
            >
              <CardContent className="p-6 space-y-4">
                {testimonial.rating && (
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="h-4 w-4 fill-[var(--local-primary)] text-[var(--local-primary)]" />
                    ))}
                  </div>
                )}
                <blockquote className="text-[var(--local-text-muted)] leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="text-sm font-medium text-[var(--local-text)]">
                  — {testimonial.author}
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
