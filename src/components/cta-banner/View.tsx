import React from 'react';
import { Button } from '@/components/ui/button';
import type { CtaBannerData, CtaBannerSettings } from './types';

export const CtaBanner: React.FC<{ data: CtaBannerData; settings: CtaBannerSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--primary)',
        '--local-text': 'var(--theme-colors-primary-foreground)',
        '--local-text-muted': 'color-mix(in oklch, var(--theme-colors-primary-foreground) 80%, transparent)',
        '--local-radius-xl': 'var(--theme-radius-xl)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-24 bg-[var(--background)] px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto bg-[var(--local-bg)] rounded-[var(--local-radius-xl)] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
          
          {data.description && (
            <p className="mt-6 text-xl text-[var(--local-text-muted)] leading-relaxed" data-jp-field="description">
              {data.description}
            </p>
          )}

          {data.primaryCta && (
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-[var(--local-radius-md)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--card)] font-bold px-10 h-14 text-lg">
                <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

