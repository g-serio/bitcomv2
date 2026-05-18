import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { isInAppPathHref } from '@/lib/isInAppPathHref'; // ADR-002
import type { FooterData, FooterSettings } from './types';

export const Footer: React.FC<{ data: FooterData; settings: FooterSettings }> = ({ data }) => {
  const navItems = Array.isArray(data.menu) ? data.menu : [];

  return (
    <footer
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
      } as React.CSSProperties}
      className="relative z-0 border-t border-[var(--local-border)] bg-[var(--local-bg)] py-20"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 
              className="text-2xl font-black tracking-tight text-[var(--local-text)] mb-4"
              style={{ fontFamily: 'var(--theme-font-wordmark, var(--font-primary))', fontWeight: 'var(--theme-weight-wordmark, 700)', letterSpacing: 'var(--theme-tracking-wordmark, -0.05em)' }}
              data-jp-field="brandText"
            >
              {data.brandText}
            </h3>
            <div className="text-[var(--local-text-muted)] space-y-2 text-sm">
              <p data-jp-field="address">{data.address}</p>
              <p data-jp-field="phone">Tel: {data.phone}</p>
              <p data-jp-field="email">Email: {data.email}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-[var(--local-text)] mb-4">Orari</h4>
            <div className="text-[var(--local-text-muted)] space-y-2 text-sm">
              <p data-jp-field="hours1">{data.hours1}</p>
              <p data-jp-field="hours2">{data.hours2}</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-[var(--local-text)] mb-4">Link</h4>
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const linkClass = "text-sm text-[var(--local-text-muted)] hover:text-[var(--local-primary)] transition-colors";
                return isInAppPathHref(item.href) ? (
                  <Link key={item.href + '-' + idx} to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.href + '-' + idx} href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="bg-[var(--local-border)]" />
        
        <div className="mt-8 text-center text-sm text-[var(--local-text-muted)]" data-jp-field="copyright">
          {data.copyright}
        </div>
      </div>
    </footer>
  );
};

