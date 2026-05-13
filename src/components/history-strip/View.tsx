import React from 'react';
import type { HistoryData, HistorySettings } from './types';

export const HistoryStrip: React.FC<{ data: HistoryData; settings: HistorySettings }> = ({ data }) => {
  return (
    <section className="relative z-0 py-16 border-y border-[var(--border)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
           <div className="font-display text-8xl font-bold italic opacity-10 leading-none" data-jp-field="year">{data.year}</div>
           <div className="max-w-2xl">
              <h3 className="font-display text-2xl font-semibold mb-4 italic" data-jp-field="title">{data.title}</h3>
              <p className="text-lg opacity-70 leading-relaxed" data-jp-field="body">{data.body}</p>
           </div>
        </div>
      </div>
    </section>
  );
};

