// Layout: Hero=A (SPLIT 60/40)
import React from 'react';
import { Button } from '@/components/ui/button';
import type { HeroSplitData, HeroSplitSettings } from './types';

export const HeroSplit: React.FC<{ data: HeroSplitData; settings: HeroSplitSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-primary-foreground': 'var(--theme-colors-primary-foreground)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-20 lg:py-32 bg-[var(--local-bg)] overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,var(--local-primary)_0%,transparent_60%)] opacity-[0.05] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col items-start jp-animate-in">
          {data.label && (
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-mono font-medium text-[var(--local-primary)] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--local-primary)] jp-pulse-dot" />
              <span data-jp-field="label">{data.label}</span>
            </div>
          )}
          
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h1>
          
          {data.description && (
            <p className="mt-8 text-lg md:text-xl text-[var(--local-text-muted)] leading-relaxed max-w-2xl" data-jp-field="description">
              {data.description}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {data.primaryCta && (
              <Button asChild size="lg" className="rounded-[var(--local-radius-md)] bg-[var(--local-primary)] text-[var(--local-primary-foreground)] font-semibold px-8 h-12">
                <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
              </Button>
            )}
            {data.secondaryCta && (
              <Button asChild variant="outline" size="lg" className="rounded-[var(--local-radius-md)] font-semibold px-8 h-12 border-[var(--border)] text-[var(--local-text)] hover:bg-[var(--card)]">
                <a href={data.secondaryCta.href}>{data.secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </div>

        {data.image?.url && (
          <div className="lg:col-span-5 relative jp-animate-in jp-d2">
            <div className="aspect-[4/5] rounded-[var(--local-radius-lg)] overflow-hidden border border-[var(--border)] shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--local-bg)]/40 to-transparent z-10" />
              <img 
                src={data.image.url} 
                alt={data.image.alt || 'Immagine principale'} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

