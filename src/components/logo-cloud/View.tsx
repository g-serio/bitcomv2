import React from 'react';
import { Beacon } from '@/components/ui/svgs/beacon';
import { Bolt } from '@/components/ui/svgs/bolt';
import { Cisco } from '@/components/ui/svgs/cisco';
import { Hulu } from '@/components/ui/svgs/hulu';
import { OpenAIFull } from '@/components/ui/svgs/open-ai';
import { Primevideo } from '@/components/ui/svgs/prime';
import { Stripe } from '@/components/ui/svgs/stripe';
import { Supabase } from '@/components/ui/svgs/supabase';
import type { LogoCloudData, LogoCloudSettings } from './types';

const BrandMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  beacon: Beacon,
  bolt: Bolt,
  cisco: Cisco,
  hulu: Hulu,
  openai: OpenAIFull,
  prime: Primevideo,
  stripe: Stripe,
  supabase: Supabase,
};

export const LogoCloudComponent: React.FC<{ data: LogoCloudData; settings: LogoCloudSettings }> = ({ data }) => {
  const items = data.items ?? [];
  const tint = data.tint ?? 'mono';
  const isMono = tint !== 'brand';
  const tintClass = isMono ? 'logo-mono' : '';

  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-border': 'var(--border)',
      } as React.CSSProperties}
      className="relative z-0 py-16 bg-[var(--local-bg)]"
    >
      <div className="mx-auto max-w-5xl px-6">
        {(data.label || data.title) && (
          <div className="mb-12 text-center">
            {data.label && (
              <div
                className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-primary)] mb-3"
                data-jp-field="label"
              >
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}
            {data.title && (
              <h2
                className="font-display font-semibold text-[clamp(1.4rem,2.4vw,1.8rem)] text-[var(--local-text)]"
                data-jp-field="title"
              >
                {data.title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 sm:gap-y-0 divide-dashed sm:divide-x sm:border-x border-[var(--local-border)] sm:divide-[var(--local-border)]">
          {items.map((item, idx) => {
            const key = item.id || `legacy-${idx}`;
            const height = item.height ?? 24;
            const BrandSvg = item.brand ? BrandMap[item.brand] : undefined;
            const ariaLabel = item.alt || item.image?.alt || item.brand;

            return (
              <div
                key={key}
                className="flex items-center justify-center px-4 py-6"
                data-jp-item-id={key}
                data-jp-item-field="items"
              >
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={ariaLabel || ''}
                    className={tintClass}
                    style={{ height: `${height}px`, width: 'auto' }}
                  />
                ) : BrandSvg ? (
                  <BrandSvg
                    height={height}
                    width="auto"
                    className={tintClass}
                    aria-label={ariaLabel}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
