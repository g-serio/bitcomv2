// Layout: Hero=F (MINIMAL HERO), Features=C (TIMELINE)
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RepairProcessData, RepairProcessSettings } from './types';

export const RepairProcess: React.FC<{ data: RepairProcessData; settings: RepairProcessSettings }> = ({ data }) => {
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
        '--local-radius-md': 'var(--theme-radius-md)',
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

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[var(--local-border)]" />

          <div className="space-y-12">
            {data.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.id || `legacy-${idx}`}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                  data-jp-item-id={step.id || `legacy-${idx}`}
                  data-jp-item-field="steps"
                >
                  {/* Step Number Circle */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[var(--local-primary)] rounded-full flex items-center justify-center z-10">
                    <span className="font-mono font-bold text-white text-lg">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)] jp-animate-in">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="md:hidden w-10 h-10 bg-[var(--local-primary)] rounded-full flex items-center justify-center">
                            <span className="font-mono font-bold text-white">
                              {step.stepNumber}
                            </span>
                          </div>
                          {step.icon?.url && (
                            <div className="w-10 h-10 rounded-[var(--local-radius-md)] bg-[var(--local-accent)]/10 p-2 flex items-center justify-center">
                              <img src={step.icon.url} alt={step.icon.alt} className="w-6 h-6 object-contain" />
                            </div>
                          )}
                        </div>
                        <CardTitle className="font-display font-bold text-xl text-[var(--local-text)]">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[var(--local-text-muted)] leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
