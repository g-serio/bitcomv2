// Layout: Hero=F (MINIMAL HERO), Features=A (BENTO)
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';
import type { HoursLocationData, HoursLocationSettings } from './types';

export const HoursLocation: React.FC<{ data: HoursLocationData; settings: HoursLocationSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--muted)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
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

        <div className="max-w-2xl mx-auto">
          <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-display font-bold text-[var(--local-text)]">
                <Clock className="h-6 w-6 text-[var(--local-primary)]" />
                Orari di Apertura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {data.schedule.map((item, idx) => (
                  <div
                    key={item.id || `legacy-${idx}`}
                    className={`flex justify-between items-center py-2 px-4 rounded-lg ${item.isClosed ? 'bg-[var(--local-bg)] opacity-60' : 'bg-[var(--local-bg)]'}`}
                    data-jp-item-id={item.id || `legacy-${idx}`}
                    data-jp-item-field="schedule"
                  >
                    <span className="font-medium text-[var(--local-text)] flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[var(--local-primary)]" />
                      {item.day}
                    </span>
                    <span className={`font-mono text-sm ${item.isClosed ? 'text-[var(--local-text-muted)]' : 'text-[var(--local-primary)]'}`}>
                      {item.isClosed ? 'Chiuso' : item.hours}
                    </span>
                  </div>
                ))}
              </div>

              {data.specialNote && (
                <div className="mt-6 p-4 bg-[var(--local-bg)] rounded-lg border-l-4 border-[var(--local-accent)]">
                  <p className="text-sm text-[var(--local-text-muted)] leading-relaxed" data-jp-field="specialNote">
                    {data.specialNote}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
