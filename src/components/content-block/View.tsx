// Layout: Hero=E (MAGAZINE), Features=A (BENTO)
import React from 'react';
import { Button } from '@/components/ui/button';
import type { ContentBlockData, ContentBlockSettings } from './types';

export const ContentBlock: React.FC<{ data: ContentBlockData; settings: ContentBlockSettings }> = ({ data }) => {
  const isCentered = data.layout === 'centered' || !data.layout;
  const isImageLeft = data.layout === 'image-left';

  if (isCentered) {
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
          '--local-radius-lg': 'var(--theme-radius-lg)',
          '--local-radius-md': 'var(--theme-radius-md)',
        } as React.CSSProperties}
        className="relative z-0 py-28 bg-[var(--local-bg)]"
      >
        <div className="max-w-[800px] mx-auto px-8 text-center space-y-8">
          {data.label && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)]" data-jp-field="label">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.label}
            </div>
          )}

          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>

          {data.blockImage?.url && (
            <div className="relative mx-auto max-w-2xl">
              <img
                src={data.blockImage.url}
                alt={data.blockImage.alt}
                className="w-full h-[300px] object-cover rounded-[var(--local-radius-lg)] border border-[var(--local-border)]"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-[var(--local-text-muted)] leading-relaxed" data-jp-field="content">
            {data.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 last:mb-0">{paragraph}</p>
            ))}
          </div>

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
      </section>
    );
  }

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
        '--local-radius-lg': 'var(--theme-radius-lg)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isImageLeft ? '' : 'lg:grid-flow-col-dense'}`}>
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

            <div className="text-lg text-[var(--local-text-muted)] leading-relaxed space-y-4" data-jp-field="content">
              {data.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

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

          <div className={`${isImageLeft ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
            {data.blockImage?.url && (
              <img
                src={data.blockImage.url}
                alt={data.blockImage.alt}
                className="w-full h-[400px] object-cover rounded-[var(--local-radius-lg)] border border-[var(--local-border)]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
