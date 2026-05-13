import React from 'react';
import type { BusinessSolutionsData, BusinessSolutionsSettings } from './types';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Building2 } from 'lucide-react';

export const BusinessSolutionsComponent: React.FC<{ data: BusinessSolutionsData; settings: BusinessSolutionsSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="sticky top-32">
             <div className="w-16 h-16 rounded-2xl bg-[var(--local-primary)]/10 text-[var(--local-primary)] flex items-center justify-center mb-8">
                <Building2 className="w-8 h-8" />
             </div>
             {data.label && (
                <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-primary)] mb-4" data-jp-field="label">
                  <span className="w-5 h-px bg-[var(--local-primary)]" />
                  {data.label}
                </div>
              )}
              <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)] mb-6" data-jp-field="title">
                {data.title}
              </h2>
              <p className="text-xl text-[var(--local-text-muted)] leading-relaxed" data-jp-field="description">
                {data.description}
              </p>
          </div>

          <div className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-8">
            <Accordion type="single" collapsible className="w-full" defaultValue={data.items[0]?.id || 'legacy-0'}>
              {data.items.map((item, idx) => (
                <AccordionItem 
                  key={item.id || `legacy-${idx}`} 
                  value={item.id || `legacy-${idx}`}
                  className="border-b-[var(--local-border)] last:border-0"
                >
                  <AccordionTrigger className="font-display font-bold text-lg text-[var(--local-text)] hover:text-[var(--local-primary)] py-6 text-left">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--local-text-muted)] leading-relaxed pb-6 text-base">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
};

