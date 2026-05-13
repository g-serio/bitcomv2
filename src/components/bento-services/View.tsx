// Layout: Features=A (BENTO)
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import type { BentoServicesData, BentoServicesSettings } from './types';

export const BentoServices: React.FC<{ data: BentoServicesData; settings: BentoServicesSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16 flex flex-col gap-4">
          {data.label && <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]" data-jp-field="label">{data.label}</span>}
          <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--foreground)]" data-jp-field="title">{data.title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = (Icons as any)[item.icon || 'Cpu'];
            return (
              <Card 
                key={item.id || i} 
                className={`group relative overflow-hidden border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--primary)]/50 ${item.isLarge ? 'md:col-span-2' : ''}`}
                data-jp-item-id={item.id || i}
                data-jp-item-field="items"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
                      <Icon size={24} />
                    </div>
                    {item.tag && <Badge variant="secondary" className="bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)]">{item.tag}</Badge>}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--foreground)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
