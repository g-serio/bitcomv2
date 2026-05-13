// Layout: Hero=A (SPLIT 60/40), Features=A (BENTO)
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import type { ContactInfoData, ContactInfoSettings } from './types';

export const ContactInfo: React.FC<{ data: ContactInfoData; settings: ContactInfoSettings }> = ({ data }) => {
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
        '--local-surface': 'var(--card)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            {data.label && (
              <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)]" data-jp-field="label">
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}

            <div className="space-y-6">
              <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
                {data.title}
              </h2>
              {data.subtitle && (
                <p className="text-lg text-[var(--local-text-muted)] leading-relaxed" data-jp-field="subtitle">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-6">
              {/* Address */}
              <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg font-display font-bold text-[var(--local-text)]">
                    <MapPin className="h-5 w-5 text-[var(--local-primary)]" />
                    Indirizzo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--local-text-muted)] leading-relaxed" data-jp-field="address">
                    {data.address}
                  </p>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg font-display font-bold text-[var(--local-text)]">
                    <Phone className="h-5 w-5 text-[var(--local-primary)]" />
                    Telefono
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={"tel:" + data.phone} className="text-[var(--local-text-muted)] hover:text-[var(--local-primary)] transition" data-jp-field="phone">
                    {data.phone}
                  </a>
                </CardContent>
              </Card>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.email && (
                  <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg font-display font-bold text-[var(--local-text)]">
                        <Mail className="h-5 w-5 text-[var(--local-primary)]" />
                        Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href={"mailto:" + data.email} className="text-[var(--local-text-muted)] hover:text-[var(--local-primary)] transition" data-jp-field="email">
                        {data.email}
                      </a>
                    </CardContent>
                  </Card>
                )}

                {data.whatsapp && (
                  <Card className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg font-display font-bold text-[var(--local-text)]">
                        <MessageCircle className="h-5 w-5 text-[var(--local-primary)]" />
                        WhatsApp
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href={"https://wa.me/" + data.whatsapp} className="text-[var(--local-text-muted)] hover:text-[var(--local-primary)] transition" data-jp-field="whatsapp">
                        {data.whatsapp}
                      </a>
                    </CardContent>
                  </Card>
                )}
              </div>
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

          {/* Map */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[var(--local-text)]">Dove siamo</h3>
            {data.mapEmbed ? (
              <div 
                className="w-full h-[400px] rounded-[var(--local-radius-lg)] border border-[var(--local-border)] overflow-hidden"
                dangerouslySetInnerHTML={{ __html: data.mapEmbed }}
                data-jp-field="mapEmbed"
              />
            ) : (
              <div className="w-full h-[400px] bg-[var(--local-surface)] border border-[var(--local-border)] rounded-[var(--local-radius-lg)] flex items-center justify-center">
                <p className="text-[var(--local-text-muted)]">Mappa non disponibile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
