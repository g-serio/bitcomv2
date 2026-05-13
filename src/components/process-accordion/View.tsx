// Layout: Features=D (ACCORDION)
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import type { ProcessAccordionData, ProcessAccordionSettings } from './types';

export const ProcessAccordion: React.FC<{ data: ProcessAccordionData; settings: ProcessAccordionSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-24 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="sticky top-32">
          {data.label && (
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--local-primary)] mb-4" data-jp-field="label">
              {data.label}
            </div>
          )}
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
          {data.description && (
            <p className="mt-6 text-lg text-[var(--local-text-muted)] leading-relaxed" data-jp-field="description">
              {data.description}
            </p>
          )}
        </div>

        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {data.items.map((item, idx) => (
              <AccordionItem
                key={item.id || `acc-${idx}`}
                value={`item-${idx}`}
                className="rounded-[var(--local-radius-md)] border border-[var(--local-border)] bg-[var(--card)] px-6"
                data-jp-item-id={item.id || `acc-${idx}`}
                data-jp-item-field="items"
              >
                <AccordionTrigger className="font-display text-lg font-bold text-[var(--local-text)] hover:no-underline hover:text-[var(--local-primary)] py-6 text-left">
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[var(--local-text-muted)]">0{idx + 1}</span>
                    {item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[var(--local-text-muted)] leading-relaxed pb-6 pl-9">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

