import React from 'react';
import { Quote } from 'lucide-react';
import type { TestimonialsData, TestimonialsSettings } from './types';

export const TestimonialsGrid: React.FC<{ data: TestimonialsData; settings: TestimonialsSettings }> = ({ data }) => {
  return (
    <section className="relative z-0 py-24 bg-[var(--card)]/30">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2 className="font-display text-4xl font-semibold italic mb-16 text-center" data-jp-field="title">{data.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <div key={item.id || i} data-jp-item-id={item.id} data-jp-item-field="items" className="p-8 border border-[var(--border)] bg-[var(--background)] flex flex-col">
              <Quote className="w-6 h-6 text-[var(--primary)] mb-6 opacity-40" />
              <p className="text-lg font-display italic leading-relaxed mb-8 flex-grow">"{item.quote}"</p>
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">— {item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

