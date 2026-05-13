import React from 'react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import type { PageHeroData, PageHeroSettings } from './types';

export const PageHero: React.FC<{ data: PageHeroData; settings: PageHeroSettings }> = ({ data }) => {
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
        '--local-radius-md': 'var(--theme-radius-md)',
        '--local-accent-soft': 'color-mix(in oklch, var(--primary) 8%, transparent)',
      } as React.CSSProperties}
      className="relative z-0 py-20 bg-[var(--local-accent-soft)] border-b border-[var(--local-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Breadcrumbs */}
        {data.breadcrumbs && data.breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              {data.breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href} className="text-[var(--local-text-muted)] hover:text-[var(--local-text)]">
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-[var(--local-text)]">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {idx < (data.breadcrumbs?.length ?? 0) - 1 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <div className="max-w-4xl">
          {data.eyebrow && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] mb-6" data-jp-field="eyebrow">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.eyebrow}
            </div>
          )}
          
          <h1 className="font-display font-black text-[clamp(3rem,6vw,5.5rem)] leading-[1.0] tracking-tight text-[var(--local-text)] mb-6" data-jp-field="title">
            {data.title}
          </h1>
          
          {data.description && (
            <p className="text-xl text-[var(--local-text-muted)] leading-relaxed mb-8 max-w-2xl" data-jp-field="description">
              {data.description}
            </p>
          )}

          {data.cta && (
            <Button
              asChild
              variant="default"
              size="lg"
              className="rounded-[var(--local-radius-md)] bg-[var(--local-primary)] text-[var(--local-primary-foreground)] hover:opacity-90"
            >
              <a href={data.cta.href} data-jp-field="cta.label">
                {data.cta.label}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
