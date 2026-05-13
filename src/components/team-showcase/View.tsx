// Layout: Hero=F (MINIMAL HERO), Features=A (BENTO)
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { TeamShowcaseData, TeamShowcaseSettings } from './types';

export const TeamShowcase: React.FC<{ data: TeamShowcaseData; settings: TeamShowcaseSettings }> = ({ data }) => {
  return (
    <section
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': 'var(--border)',
        '--local-surface': 'var(--card)',
        '--local-surface-muted': 'var(--muted)',
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className="relative z-0 py-28 bg-[var(--local-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-16 space-y-6">
          {data.label && (
            <div className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)]" data-jp-field="label">
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.label}
            </div>
          )}
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-[var(--local-text-muted)] max-w-3xl mx-auto" data-jp-field="subtitle">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.members.map((member, idx) => (
            <Card
              key={member.id || `legacy-${idx}`}
              className="bg-[var(--local-surface)] border-[var(--local-border)] rounded-[var(--local-radius-lg)] text-center jp-animate-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
              data-jp-item-id={member.id || `legacy-${idx}`}
              data-jp-item-field="members"
            >
              <CardHeader className="space-y-4 pb-4">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    {member.photo?.url && <AvatarImage src={member.photo.url} alt={member.photo.alt} />}
                    <AvatarFallback className="text-lg font-display font-bold bg-[var(--local-surface-muted)] text-[var(--local-text)]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-[var(--local-text)]">
                    {member.name}
                  </h3>
                  <p className="text-[var(--local-primary)] font-medium">
                    {member.role}
                  </p>
                  {member.experience && (
                    <Badge variant="secondary" className="bg-[var(--local-accent)]/10 text-[var(--local-accent)] border-[var(--local-accent)]/20">
                      {member.experience}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              {member.bio && (
                <CardContent className="pt-0">
                  <p className="text-sm text-[var(--local-text-muted)] leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
