import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import type { ContactData, ContactSettings } from './types';

export const ContactSection: React.FC<{ data: ContactData; settings: ContactSettings }> = ({ data }) => {
  return (
    <section 
      className="relative z-0 py-24"
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-primary': 'var(--primary)',
        '--local-border': 'var(--border)',
        '--local-muted': 'var(--muted)',
      } as React.CSSProperties}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-5xl font-semibold italic mb-12" data-jp-field="title">{data.title}</h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <MapPin className="w-6 h-6 text-[var(--local-primary)] shrink-0" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Posizione</h4>
                  <p className="text-lg" data-jp-field="address">{data.address}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Clock className="w-6 h-6 text-[var(--local-primary)] shrink-0" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Orari d'ufficio</h4>
                  <p className="whitespace-pre-line opacity-70" data-jp-field="hours">{data.hours}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Phone className="w-6 h-6 text-[var(--local-primary)] shrink-0" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">Contatto Diretto</h4>
                  <p className="text-2xl font-display italic" data-jp-field="phone">{data.phone}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-[var(--local-muted)] border border-[var(--local-border)] overflow-hidden relative grayscale">
             <div className="absolute inset-0 bg-[var(--local-primary)]/5" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                <MapPin size={48} className="text-[var(--local-primary)] mb-4" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2 opacity-60">Zona Libertà</p>
                <p className="font-display text-xl italic">Via Simone Cuccia 1B, Palermo</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
