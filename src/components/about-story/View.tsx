import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { AboutStoryData, AboutStorySettings } from './types';

export const AboutStory: React.FC<{ data: AboutStoryData; settings: AboutStorySettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-radius-md': 'var(--theme-radius-md)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div className="space-y-8 jp-animate-in">
            {data.eyebrow && (
              <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] mb-4" data-jp-field="eyebrow">
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.eyebrow}
              </div>
            )}
            
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
              {data.title}
            </h2>
            
            <p className="text-xl text-[var(--local-text-muted)] leading-relaxed" data-jp-field="description">
              {data.description}
            </p>

            {data.image?.url && (
              <div className="rounded-[var(--local-radius-lg)] overflow-hidden bg-[var(--local-surface)] border border-[var(--local-border)]">
                <img
                  src={data.image.url}
                  alt={data.image.alt}
                  className="w-full h-80 object-cover"
                />
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-8 jp-animate-in jp-d2">
            {data.milestones.map((milestone, idx) => (
              <Card
                key={milestone.id || `legacy-${idx}`}
                className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)] relative"
                data-jp-item-id={milestone.id || `legacy-${idx}`}
                data-jp-item-field="milestones"
              >
                {/* Timeline line */}
                {idx < data.milestones.length - 1 && (
                  <div className="absolute left-8 top-20 w-px h-16 bg-[var(--local-border)]" />
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--local-primary)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {milestone.year}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-[var(--local-text)] mb-2">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-[var(--local-text-muted)] leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
