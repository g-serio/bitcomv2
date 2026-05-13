// Layout: Hero=A (SPLIT 60/40), Features=A (BENTO)
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TechHeroData, TechHeroSettings } from './types';

export const TechHero: React.FC<{ data: TechHeroData; settings: TechHeroSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-primary-foreground': 'var(--primary-foreground)',
        '--local-accent': 'var(--accent)',
        '--local-accent-soft': 'color-mix(in oklch, var(--accent) 12%, transparent)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-radius-md': 'var(--theme-radius-md)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_50%_0%,var(--local-accent-soft),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[image:linear-gradient(var(--local-accent-soft)_1px,transparent_1px),linear-gradient(90deg,var(--local-accent-soft)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_25%,transparent_75%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Text Content - 3 columns */}
          <div className="lg:col-span-3 space-y-8 jp-animate-in">
            {data.label && (
              <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] jp-d1" data-jp-field="label">
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}

            <div className="space-y-6">
              <h1 className="font-display font-black text-[clamp(3rem,6vw,5.5rem)] leading-[1.0] tracking-tight text-[var(--local-text)] jp-d2" data-jp-field="title">
                {data.title}
                {data.titleHighlight && (
                  <> <em className="not-italic bg-gradient-to-br from-[var(--local-accent)] to-[var(--local-primary)] bg-clip-text text-transparent" data-jp-field="titleHighlight">
                    {data.titleHighlight}
                  </em></>
                )}
              </h1>

              <p className="text-xl text-[var(--local-text-muted)] leading-relaxed max-w-2xl jp-d3" data-jp-field="subtitle">
                {data.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 jp-d4">
              {data.primaryCta && (
                <a href={data.primaryCta.href}>
                  <Button variant="default" className="bg-[var(--local-primary)] text-[var(--local-primary-foreground)] rounded-[var(--local-radius-md)] px-6 py-3">
                    {data.primaryCta.label}
                  </Button>
                </a>
              )}
              {data.secondaryCta && (
                <a href={data.secondaryCta.href}>
                  <Button variant="outline" className="border-[var(--local-border)] text-[var(--local-text)] rounded-[var(--local-radius-md)] px-6 py-3">
                    {data.secondaryCta.label}
                  </Button>
                </a>
              )}
            </div>

            {data.yearsFounded && (
              <div className="flex items-center gap-4 pt-8 jp-d4">
                <Badge variant="secondary" className="bg-[var(--local-accent-soft)] border border-[var(--local-border)] px-4 py-2 rounded-full text-[0.70rem] font-mono font-semibold text-[var(--local-accent)] tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--local-primary)] jp-pulse-dot mr-2" />
                  Dal {data.yearsFounded}
                </Badge>
                {data.experienceText && (
                  <span className="text-sm text-[var(--local-text-muted)]" data-jp-field="experienceText">
                    {data.experienceText}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Image - 2 columns */}
          <div className="lg:col-span-2 jp-animate-in jp-d3">
            {data.heroImage?.url && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--local-primary)]/20 to-[var(--local-accent)]/20 rounded-[var(--local-radius-lg)] blur-2xl transform scale-110" />
                <img
                  src={data.heroImage.url}
                  alt={data.heroImage.alt}
                  className="relative w-full h-[500px] object-cover rounded-[var(--local-radius-lg)] border border-[var(--local-border)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
