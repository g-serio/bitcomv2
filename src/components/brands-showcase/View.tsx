// Layout: Hero=F (MINIMAL HERO), Features=B (HORIZONTAL SCROLL)
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BrandsShowcaseData, BrandsShowcaseSettings } from './types';

export const BrandsShowcase: React.FC<{ data: BrandsShowcaseData; settings: BrandsShowcaseSettings }> = ({ data }) => {
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
        '--local-surface-muted': 'var(--muted)',
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {data.brands.map((brand, idx) => (
            <Card
              key={brand.id || `legacy-${idx}`}
              className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)] p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-md transition-shadow jp-animate-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
              data-jp-item-id={brand.id || `legacy-${idx}`}
              data-jp-item-field="brands"
            >
              <CardContent className="p-0 flex flex-col items-center space-y-3">
                {brand.logo?.url ? (
                  <img
                    src={brand.logo.url}
                    alt={brand.logo.alt}
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <div className="h-12 w-16 bg-[var(--local-surface-muted)] rounded flex items-center justify-center">
                    <span className="text-xs font-mono text-[var(--local-text-muted)]">{brand.name.substring(0, 3).toUpperCase()}</span>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--local-text)]">{brand.name}</p>
                  {brand.category && (
                    <Badge variant="secondary" className="mt-2 bg-[var(--local-accent)]/10 text-[var(--local-accent)] border-[var(--local-accent)]/20 text-xs">
                      {brand.category}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
