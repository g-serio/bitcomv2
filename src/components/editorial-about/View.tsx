// Layout: Hero=D (EDITORIAL)
import React from 'react';
import type { EditorialAboutData, EditorialAboutSettings } from './types';

export const EditorialAbout: React.FC<{ data: EditorialAboutData; settings: EditorialAboutSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {data.sinceYear && (
              <div className="text-[var(--primary)] font-mono text-sm font-bold tracking-widest mb-4">
                DAL {data.sinceYear}
              </div>
            )}
            <h2 className="font-display text-5xl font-black tracking-tighter text-[var(--foreground)] mb-8" data-jp-field="title">
              {data.title}
            </h2>
            <p className="font-display text-xl font-medium text-[var(--foreground)] mb-6" data-jp-field="subtitle">
              {data.subtitle}
            </p>
            <div className="text-[var(--muted-foreground)] space-y-4 text-lg" data-jp-field="content">
              {data.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)] grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl">
               {data.image?.url && <img src={data.image.url} alt={data.image.alt || ''} className="w-full h-full object-cover" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
