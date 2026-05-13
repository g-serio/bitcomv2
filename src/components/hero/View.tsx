// Layout: Hero=A (SPLIT 60/40)
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor, ShieldCheck } from 'lucide-react';
import type { HeroData, HeroSettings } from './types';

export const Hero: React.FC<{ data: HeroData; settings: HeroSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-primary': 'var(--primary)',
        '--local-border': 'var(--border)',
      } as React.CSSProperties}
      className="relative z-0 overflow-hidden bg-[var(--local-bg)] py-20 lg:py-32"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--local-primary)]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          {data.label && (
            <div className="inline-flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--local-primary)]" data-jp-field="label">
               <span className="w-8 h-px bg-[var(--local-primary)]" />
               {data.label}
            </div>
          )}
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-semibold mb-8 tracking-tight italic">
            <span data-jp-field="title">{data.title}</span>
            {data.titleHighlight && (
              <em className="block not-italic text-[var(--local-primary)]" data-jp-field="titleHighlight">
                {data.titleHighlight}
              </em>
            )}
          </h1>
          <p className="text-lg lg:text-xl opacity-70 mb-10 max-w-xl leading-relaxed" data-jp-field="description">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {data.primaryCta && (
              <Button className="rounded-none bg-[var(--local-primary)] text-white px-8 py-6 text-base font-display italic">
                {data.primaryCta.label}
              </Button>
            )}
            {data.secondaryCta && (
              <Button variant="outline" className="rounded-none border-[var(--local-border)] px-8 py-6 text-base font-display">
                {data.secondaryCta.label}
              </Button>
            )}
          </div>

          <div className="mt-16 flex items-center gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-2"><Smartphone size={20} /> <span className="font-mono text-[10px] uppercase">Repairs</span></div>
            <div className="flex items-center gap-2"><Monitor size={20} /> <span className="font-mono text-[10px] uppercase">Computing</span></div>
            <div className="flex items-center gap-2"><ShieldCheck size={20} /> <span className="font-mono text-[10px] uppercase">Business</span></div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden border border-[var(--local-border)] bg-[var(--card)] p-4">
            {data.image?.url ? (
               <img src={data.image.url} alt={data.image.alt} className="w-full h-full object-cover grayscale" />
            ) : (
               <div className="w-full h-full bg-muted flex items-center justify-center opacity-20">
                 <Monitor className="w-20 h-20" />
               </div>
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[var(--local-primary)] text-white p-6 font-display italic text-2xl hidden md:block">
            Since 1996
          </div>
        </div>
      </div>
    </section>
  );
};

