import React from 'react';
import type { ServicesGridData, ServicesGridSettings } from './types';
import { Laptop, Smartphone, Printer, Network, Code, ShieldCheck } from 'lucide-react';

const IconMap: Record<string, React.ReactNode> = {
  laptop: <Laptop className="w-8 h-8" />,
  smartphone: <Smartphone className="w-8 h-8" />,
  printer: <Printer className="w-8 h-8" />,
  network: <Network className="w-8 h-8" />,
  code: <Code className="w-8 h-8" />,
  shield: <ShieldCheck className="w-8 h-8" />,
};

export const ServicesGridComponent: React.FC<{ data: ServicesGridData; settings: ServicesGridSettings }> = ({ data }) => {
  const intro = data.subtitle ?? data.description;
  const introField = data.subtitle ? 'subtitle' : 'description';
  const items = data.services ?? data.items ?? [];
  const itemsField = data.services ? 'services' : 'items';

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
        <div className="max-w-2xl mb-16">
          {data.label && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-primary)] mb-4" data-jp-field="label">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.label}
            </div>
          )}
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)] mb-6" data-jp-field="title">
            {data.title}
          </h2>
          {intro && (
            <p className="text-xl text-[var(--local-text-muted)]" data-jp-field={introField}>
              {intro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id || `legacy-${idx}`}
              className="group rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-8 transition-all hover:border-[var(--local-primary)] hover:shadow-lg"
              data-jp-item-id={item.id || `legacy-${idx}`}
              data-jp-item-field={itemsField}
            >
              {item.icon ? (
                <div className="w-16 h-16 rounded-2xl bg-[var(--local-primary)]/10 text-[var(--local-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {IconMap[item.icon] || <Laptop className="w-8 h-8" />}
                </div>
              ) : item.category ? (
                <div className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--local-primary)] mb-6">
                  <span className="w-4 h-px bg-[var(--local-primary)]" />
                  {item.category}
                </div>
              ) : null}
              <h3 className="font-display font-bold text-[1.2rem] leading-tight tracking-tight text-[var(--local-text)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--local-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
