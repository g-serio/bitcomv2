import React from 'react';
import { Link } from 'react-router-dom';
import type { CtaBandData, CtaBandSettings } from './types';
import { ArrowRight } from 'lucide-react';
import { isInAppPathHref } from '@/lib/isInAppPathHref'; // ADR-002

export const CtaBandComponent: React.FC<{ data: CtaBandData; settings: CtaBandSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--primary)',
        '--local-text': 'var(--primary-foreground)',
        '--local-text-muted': 'color-mix(in oklch, var(--primary-foreground) 80%, transparent)',
        '--local-border': 'var(--primary-dark)',
        '--local-surface': 'var(--primary-dark)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-24 bg-[var(--local-bg)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[image:linear-gradient(var(--local-surface)_1px,transparent_1px),linear-gradient(90deg,var(--local-surface)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      
      <div className="max-w-[800px] mx-auto px-8 relative text-center">
        <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] tracking-tight text-[var(--local-text)] mb-6" data-jp-field="title">
          {data.title}
        </h2>
        {data.description && (
          <p className="text-xl text-[var(--local-text-muted)] mb-10 max-w-2xl mx-auto" data-jp-field="description">
            {data.description}
          </p>
        )}
        {(() => {
          const ctaClass = "inline-flex items-center gap-2 px-8 py-4 rounded-[var(--local-radius-md)] bg-[var(--local-text)] text-[var(--local-bg)] font-bold text-lg hover:scale-105 transition-transform";
          const inner = <>{data.cta.label}<ArrowRight className="w-5 h-5" /></>;
          return isInAppPathHref(data.cta.href) ? (
            <Link to={data.cta.href} className={ctaClass}>{inner}</Link>
          ) : (
            <a href={data.cta.href} className={ctaClass}>{inner}</a>
          );
        })()}
      </div>
    </section>
  );
};

