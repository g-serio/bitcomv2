// Layout: Hero=A (SPLIT 60/40), Features=B (HORIZONTAL SCROLL)
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { ServiceDetailData, ServiceDetailSettings } from './types';

export const ServiceDetail: React.FC<{ data: ServiceDetailData; settings: ServiceDetailSettings }> = ({ data }) => {
  const isImageLeft = data.layout === 'image-left';

  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-primary-foreground': 'var(--primary-foreground)',
        '--local-accent': 'var(--accent)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isImageLeft ? '' : 'lg:grid-flow-col-dense'}`}>
          {/* Text Content */}
          <div className={`space-y-8 ${isImageLeft ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
            {data.label && (
              <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)]" data-jp-field="label">
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}

            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
              {data.title}
            </h2>

            <p className="text-lg text-[var(--local-text-muted)] leading-relaxed" data-jp-field="description">
              {data.description}
            </p>

            {data.features && data.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[var(--local-text)]">Caratteristiche:</h3>
                <div className="space-y-3">
                  {data.features.map((feature, idx) => (
                    <div
                      key={feature.id || `legacy-${idx}`}
                      className="flex items-start gap-3"
                      data-jp-item-id={feature.id || `legacy-${idx}`}
                      data-jp-item-field="features"
                    >
                      <Check className="h-5 w-5 text-[var(--local-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--local-text-muted)]">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.primaryCta && (
              <div>
                <a href={data.primaryCta.href}>
                  <Button variant="default" className="bg-[var(--local-primary)] text-[var(--local-primary-foreground)] rounded-[var(--local-radius-md)] px-6 py-3">
                    {data.primaryCta.label}
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* Image */}
          <div className={`${isImageLeft ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
            {data.serviceImage?.url && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--local-primary)]/10 to-[var(--local-accent)]/10 rounded-[var(--local-radius-lg)] blur-xl transform scale-105" />
                <img
                  src={data.serviceImage.url}
                  alt={data.serviceImage.alt}
                  className="relative w-full h-[400px] object-cover rounded-[var(--local-radius-lg)] border border-[var(--local-border)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
