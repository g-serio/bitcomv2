import React from 'react';
import type { HeroBentoData, HeroBentoSettings } from './types';
import { MapPin, MonitorSmartphone, Server, ArrowRight } from 'lucide-react';

export const HeroBentoComponent: React.FC<{ data: HeroBentoData; settings: HeroBentoSettings }> = ({ data }) => {
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
        '--local-border-strong': 'var(--border-strong)',
        '--local-surface': 'var(--card)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-24 bg-[var(--local-bg)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[image:linear-gradient(var(--local-border)_1px,transparent_1px),linear-gradient(90deg,var(--local-border)_1px,transparent_1px)] bg-[size:64px_64px][mask-image:radial-gradient(ellipse_at_50%_0%,black_40%,transparent_70%)] pointer-events-none opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_50%_0%,var(--local-primary),transparent_60%)] pointer-events-none opacity-[0.08]" />

      <div className="max-w-[1200px] mx-auto px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Title Block - Spans 8 cols */}
          <div className="lg:col-span-8 rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)]/50 backdrop-blur-sm p-10 flex flex-col justify-center jp-animate-in">
            {data.label && (
              <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-primary)] mb-6" data-jp-field="label">
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}
            
            <h1 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--local-text)] mb-6">
              <span data-jp-field="title">{data.title}</span>
              {data.titleHighlight && (
                <>
                  <br/>
                  <em className="not-italic text-[var(--local-primary)]" data-jp-field="titleHighlight">
                    {data.titleHighlight}
                  </em>
                </>
              )}
            </h1>
            
            <p className="text-xl text-[var(--local-text-muted)] max-w-2xl leading-relaxed mb-8" data-jp-field="description">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {data.primaryCta && (
                <a 
                  href={data.primaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--local-radius-md)] bg-[var(--local-primary)] text-[var(--local-primary-foreground)] font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  {data.primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {data.secondaryCta && (
                <a 
                  href={data.secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--local-radius-md)] border border-[var(--local-border)] text-[var(--local-text)] font-semibold text-sm hover:border-[var(--local-primary)] hover:text-[var(--local-primary)] transition-colors bg-[var(--local-surface)]"
                >
                  {data.secondaryCta.label}
                </a>
              )}
            </div>
          </div>

          {/* Side Info Cards - Stack in 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 rounded-[var(--local-radius-lg)] border border-[var(--local-border)] text-[var(--local-primary-foreground)] flex flex-col justify-end jp-animate-in jp-d1 relative overflow-hidden min-h-[280px]">
              {data.featureImage?.url ? (
                <>
                  <img
                    src={data.featureImage.url}
                    alt={data.featureImage.alt || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-jp-field="featureImage"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: 'var(--local-border-strong)',
                      mixBlendMode: 'color',
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in oklch, var(--local-primary) 90%, black) 0%, color-mix(in oklch, var(--local-primary) 30%, transparent) 55%, transparent 100%)',
                    }}
                    aria-hidden
                  />
                  {(data.featureTitle || data.address) && (
                    <div className="relative p-8">
                      <MonitorSmartphone className="w-7 h-7 mb-3 text-white/85" />
                      {data.featureTitle && (
                        <h3
                          className="font-display font-bold text-2xl text-white leading-tight"
                          data-jp-field="featureTitle"
                        >
                          {data.featureTitle}
                        </h3>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-[var(--local-primary)] flex-1 p-8 flex flex-col justify-between">
                  <div className="absolute -right-10 -top-10 text-white/10">
                    <Server className="w-40 h-40" />
                  </div>
                  <div className="relative">
                    <MonitorSmartphone className="w-8 h-8 mb-4 text-white/80" />
                    <h3 className="font-display font-bold text-2xl mb-2">Privati &<br/>Aziende</h3>
                    <p className="text-[var(--local-primary-foreground)]/80 text-sm">Riparazioni rapide e progettazione infrastrutture IT complesse.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-8 flex items-center gap-6 jp-animate-in jp-d2">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--local-primary)]/10 flex items-center justify-center text-[var(--local-primary)]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--local-text)]">Vieni a trovarci</p>
                {data.address && <p className="text-sm text-[var(--local-text-muted)]" data-jp-field="address">{data.address}</p>}
              </div>
            </div>
          </div>

          {/* Bottom Stats & Features - Spans full 12 cols */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-6 flex flex-col justify-center jp-animate-in jp-d3">
              <div className="font-mono font-bold text-3xl text-[var(--local-primary)]" data-jp-field="stat1Value">{data.stat1Value}</div>
              <div className="text-sm font-semibold text-[var(--local-text-muted)] uppercase tracking-wider" data-jp-field="stat1Label">{data.stat1Label}</div>
            </div>
            <div className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-6 flex flex-col justify-center jp-animate-in jp-d3">
              <div className="font-mono font-bold text-3xl text-[var(--local-primary)]" data-jp-field="stat2Value">{data.stat2Value}</div>
              <div className="text-sm font-semibold text-[var(--local-text-muted)] uppercase tracking-wider" data-jp-field="stat2Label">{data.stat2Label}</div>
            </div>
            <div className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-6 flex flex-col justify-center jp-animate-in jp-d4">
              {data.features && data.features.length > 0 && (
                 <ul className="space-y-3">
                   {data.features.map((feature, idx) => (
                     <li key={feature.id || `legacy-${idx}`} className="flex items-center gap-3 text-sm text-[var(--local-text)] font-medium">
                       <div className="w-1.5 h-1.5 rounded-full bg-[var(--local-primary)] jp-pulse-dot" />
                       {feature.text}
                     </li>
                   ))}
                 </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

