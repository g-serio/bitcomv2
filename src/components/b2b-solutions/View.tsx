import React from 'react';
import type { B2BData, B2BSettings } from './types';

export const B2BSolutions: React.FC<{ data: B2BData; settings: B2BSettings }> = ({ data }) => {
  return (
    <section 
      className="relative z-0 py-24 bg-[var(--foreground)] text-[var(--background)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl font-semibold italic mb-8" data-jp-field="title">{data.title}</h2>
            <p className="text-xl opacity-80 leading-relaxed font-display italic" data-jp-field="subtitle">{data.subtitle}</p>
          </div>
          <div className="lg:col-span-7 space-y-12">
            {data.features.map((f, i) => (
              <div key={f.id || i} data-jp-item-id={f.id} data-jp-item-field="features" className="group">
                <div className="flex gap-6">
                  <span className="font-mono text-xs opacity-40 mt-1">0{i+1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium mb-3 italic">{f.title}</h3>
                    <p className="opacity-60 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

