import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import type { ProSolutionsData, ProSolutionsSettings } from './types';

export const ProSolutions: React.FC<{ data: ProSolutionsData; settings: ProSolutionsSettings }> = ({ data }) => {
  return (
    <section className="bg-[var(--secondary)] py-24 border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6" data-jp-field="title">{data.title}</h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-8" data-jp-field="description">{data.description}</p>
            {data.cta && (
              <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]" asChild>
                <a href={data.cta.href}>{data.cta.label}</a>
              </Button>
            )}
          </div>
          <div className="grid gap-4">
            {data.solutions.map((item, i) => (
              <div 
                key={item.id || i} 
                className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
                data-jp-item-id={item.id || i}
                data-jp-item-field="solutions"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--primary)]" />
                <div>
                  <h4 className="font-display font-bold text-[var(--foreground)] mb-1">{item.title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
