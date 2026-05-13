import React from 'react';
import * as Icons from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { InfoContactData, InfoContactSettings } from './types';

export const InfoContact: React.FC<{ data: InfoContactData; settings: InfoContactSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-10">
            <h2 className="font-display text-4xl font-bold text-[var(--foreground)]" data-jp-field="title">{data.title}</h2>
            <div className="space-y-6">
              {data.details.map((detail, i) => {
                const Icon = (Icons as any)[detail.icon || 'Phone'];
                return (
                  <div key={detail.id || i} className="flex gap-4 items-start" data-jp-item-id={detail.id || i} data-jp-item-field="details">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-[var(--muted-foreground)] mb-1">{detail.label}</div>
                      <div className="text-[var(--foreground)] font-medium">{detail.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-10">
            <h3 className="font-display text-2xl font-bold text-[var(--foreground)] mb-6">Orari di Apertura</h3>
            <div className="space-y-4">
              {data.hours.map((h, i) => (
                <div key={h.id || i} className="flex justify-between items-center" data-jp-item-id={h.id || i} data-jp-item-field="hours">
                  <span className="text-[var(--foreground)] font-medium">{h.days}</span>
                  <span className="text-[var(--muted-foreground)] font-mono text-sm">{h.hours}</span>
                </div>
              ))}
            </div>
            <Separator className="my-8 bg-[var(--border)]" />
            <div className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              <p className="font-bold text-[var(--foreground)] mb-2">Dove trovarci:</p>
              <p data-jp-field="address">{data.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
