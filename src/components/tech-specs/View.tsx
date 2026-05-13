import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { TechSpecsData, TechSpecsSettings } from './types';

export const TechSpecs: React.FC<{ data: TechSpecsData; settings: TechSpecsSettings }> = ({ data }) => {
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
        {/* Header */}
        <div className="text-center mb-16 jp-animate-in">
          {data.eyebrow && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] mb-4" data-jp-field="eyebrow">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.eyebrow}
            </div>
          )}
          
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)] mb-6" data-jp-field="title">
            {data.title}
          </h2>
          
          {data.description && (
            <p className="text-xl text-[var(--local-text-muted)] max-w-3xl mx-auto" data-jp-field="description">
              {data.description}
            </p>
          )}
        </div>

        {/* Specs Tabs */}
        <Tabs defaultValue="0" className="jp-animate-in jp-d2">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-[var(--local-surface)] border border-[var(--local-border)]">
            {data.categories.map((category, idx) => (
              <TabsTrigger
                key={category.id || `legacy-${idx}`}
                value={idx.toString()}
                className="data-[state=active]:bg-[var(--local-primary)] data-[state=active]:text-[var(--local-primary-foreground)]"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.categories.map((category, idx) => (
            <TabsContent
              key={category.id || `legacy-${idx}`}
              value={idx.toString()}
              data-jp-item-id={category.id || `legacy-${idx}`}
              data-jp-item-field="categories"
            >
              <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)]">
                <CardHeader>
                  <CardTitle className="font-display text-xl font-bold text-[var(--local-text)]">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex justify-between items-center py-3 border-b border-[var(--local-border)] last:border-b-0"
                      >
                        <span className="text-[var(--local-text-muted)] font-medium">
                          {item.name}
                        </span>
                        <span className="text-[var(--local-text)] font-semibold">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
