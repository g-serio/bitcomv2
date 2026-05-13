#!/bin/bash
set -e

# =============================================================================
# BIT COM – B.S. INFORMATICA - TENANT GENERATOR
# =============================================================================

echo "-- Step 0: shadcn/ui init..."
npm install class-variance-authority clsx tailwind-merge lucide-react
npx shadcn@latest init --yes --style new-york --base-color slate 2>/dev/null || true
npx shadcn@latest add --yes --overwrite \
  button card badge separator avatar table tabs accordion dialog sheet \
  tooltip navigation-menu dropdown-menu hover-card breadcrumb skeleton \
  progress input label textarea select checkbox switch toggle toggle-group \
  scroll-area aspect-ratio

echo "-- Creating directories..."
mkdir -p src/lib src/data/config src/data/pages src/components/header src/components/footer \
  src/components/hero-split src/components/bento-services src/components/pro-solutions \
  src/components/editorial-about src/components/review-grid src/components/info-contact \
  src/components/stat-line src/components/accordion-faq

# -----------------------------------------------------------------------------
# 1. CSS & THEME
# -----------------------------------------------------------------------------

echo "-- Writing src/index.css..."
cat > src/index.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

/* Typography contract: import this before any other CSS rules. */

@import "tailwindcss";
@source "./**/*.tsx";

@theme {
  --color-background:           var(--background);
  --color-foreground:           var(--foreground);
  --color-card:                 var(--card);
  --color-card-foreground:      var(--card-foreground);
  --color-primary:              var(--primary);
  --color-primary-foreground:   var(--primary-foreground);
  --color-secondary:            var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:                var(--muted);
  --color-muted-foreground:     var(--muted-foreground);
  --color-accent:               var(--accent);
  --color-border:               var(--border);
  --radius-lg:                  var(--theme-radius-lg);
  --radius-md:                  var(--theme-radius-md);
  --radius-sm:                  var(--theme-radius-sm);
  --font-primary: var(--theme-font-primary);
  --font-mono:    var(--theme-font-mono);
  --font-display: var(--theme-font-display);
}

:root {
  --background:           hsl(215 28% 7%);
  --foreground:           hsl(214 33% 84%);
  --card:                 hsl(218 44% 9%);
  --card-foreground:      hsl(214 33% 84%);
  --elevated:             #141B24;
  --overlay:              #1C2433;
  --primary:              hsl(222 100% 54%);
  --primary-foreground:   hsl(0 0% 100%);
  --primary-light:        #84ABFF;
  --primary-dark:         #0F52E0;
  --secondary:            hsl(217 30% 11%);
  --secondary-foreground: hsl(214 33% 84%);
  --muted:                hsl(217 30% 11%);
  --muted-foreground:     hsl(215 23% 57%);
  --accent:               hsl(216 28% 15%);
  --accent-foreground:    hsl(214 33% 84%);
  --border:               hsl(216 27% 21%);
  --border-strong:        #2F3D55;
  --input:                hsl(216 27% 21%);
  --ring:                 hsl(222 100% 54%);
  --radius:               0.75rem;
}

[data-theme='light'] {
  --background:           hsl(0 0% 96%);
  --foreground:           hsl(0 0% 3%);
  --card:                 hsl(0 0% 100%);
  --card-foreground:      hsl(0 0% 3%);
  --elevated:             #F4F3EF;
  --overlay:              #E5E3DC;
  --primary:              hsl(222 100% 54%);
  --primary-foreground:   hsl(0 0% 100%);
  --accent:               hsl(222 100% 92%);
  --accent-foreground:    hsl(222 100% 54%);
  --secondary:            hsl(0 0% 92%);
  --secondary-foreground: hsl(0 0% 3%);
  --muted:                hsl(0 0% 92%);
  --muted-foreground:     hsl(0 0% 42%);
  --border:               hsl(0 0% 84%);
  --border-strong:        #B4B2AD;
}

@layer base {
  * { border-color: var(--border); }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-primary);
    line-height: 1.7;
    @apply antialiased;
  }
}

.font-display { font-family: var(--font-display); }
.font-mono { font-family: var(--font-mono); }

/* TOCC Layer */
[data-jp-section-overlay] {
  position: absolute; inset: 0; z-index: 9999;
  pointer-events: none; border: 2px solid transparent;
  transition: border-color 0.15s, background-color 0.15s;
}
[data-section-id]:hover [data-jp-section-overlay] {
  border: 2px dashed color-mix(in oklch, var(--primary) 50%, transparent);
}
[data-section-id][data-jp-selected] [data-jp-section-overlay] {
  border: 2px solid var(--primary);
  background-color: color-mix(in oklch, var(--primary) 10%, transparent);
}
EOF

echo "-- Writing src/data/config/theme.json..."
cat > src/data/config/theme.json << 'EOF'
{
  "name": "BIT COM",
  "tokens": {
    "colors": {
      "background": "hsl(215 28% 7%)",
      "foreground": "hsl(214 33% 84%)",
      "card": "hsl(218 44% 9%)",
      "primary": "hsl(222 100% 54%)",
      "primary-foreground": "#ffffff",
      "accent": "hsl(216 28% 15%)",
      "border": "hsl(216 27% 21%)",
      "muted": "hsl(217 30% 11%)",
      "muted-foreground": "hsl(215 23% 57%)"
    },
    "typography": {
      "fontFamily": {
        "primary": "\"IBM Plex Sans\", Helvetica, Arial, sans-serif",
        "mono": "\"JetBrains Mono\", Helvetica, Arial, sans-serif",
        "display": "\"Space Grotesk\", Helvetica, Arial, sans-serif"
      },
      "wordmark": {
        "fontFamily": "\"Space Grotesk\", Helvetica, Arial, sans-serif",
        "weight": "700",
        "tracking": "-0.05em"
      }
    },
    "borderRadius": {
      "sm": "0.25rem",
      "md": "0.5rem",
      "lg": "0.75rem",
      "xl": "1rem",
      "full": "9999px"
    }
  }
}
EOF

# -----------------------------------------------------------------------------
# 2. CAPSULES
# -----------------------------------------------------------------------------

# --- HEADER ---
echo "-- Writing capsule: header..."
cat > src/components/header/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';

const HeaderMenuItemSchema = z.object({
  label: z.string().describe('ui:text'),
  href: z.string().describe('ui:text'),
  isCta: z.boolean().optional().describe('ui:checkbox'),
});

export const HeaderSchema = BaseSectionData.extend({
  logoText: z.string().describe('ui:text'),
  logoHighlight: z.string().optional().describe('ui:text'),
  announcement: z.string().optional().describe('ui:text'),
  menu: z.array(HeaderMenuItemSchema).optional().describe('ui:list'),
});
EOF

cat > src/components/header/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HeaderSchema } from './schema';
export type HeaderData = z.infer<typeof HeaderSchema>;
export type HeaderSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/header/View.tsx << 'EOF'
import React from 'react';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import type { HeaderData, HeaderSettings } from './types';

export const Header: React.FC<{ data: HeaderData; settings: HeaderSettings }> = ({ data }) => {
  const navItems = Array.isArray(data.menu) ? data.menu : [];
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') as 'light' | 'dark';
    if (current) setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md" style={{'--local-font-display': 'var(--font-display)'} as React.CSSProperties}>
      {data.announcement && (
        <div className="bg-[var(--primary)] py-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--primary-foreground)]">
          {data.announcement}
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="/" className="flex items-center gap-1.5">
          <span className="font-display text-xl font-bold tracking-tight text-[var(--foreground)]" data-jp-field="logoText">{data.logoText}</span>
          {data.logoHighlight && <span className="font-mono text-[10px] font-bold text-[var(--primary)]" data-jp-field="logoHighlight">{data.logoHighlight}</span>}
        </a>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((item, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink href={item.href} className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${item.isCta ? 'rounded-md bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)] hover:opacity-90' : 'text-[var(--muted-foreground)]'}`}>
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--card)] border-l border-[var(--border)]">
              <SheetHeader><SheetTitle className="font-display">Menu</SheetTitle></SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <a key={i} href={item.href} className="text-lg font-medium text-[var(--foreground)]">{item.label}</a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
EOF

cat > src/components/header/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- HERO SPLIT ---
echo "-- Writing capsule: hero-split..."
cat > src/components/hero-split/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, CtaSchema, ImageSelectionSchema } from '@olonjs/core';

export const HeroSplitSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  titleHighlight: z.string().optional().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  primaryCta: CtaSchema.optional(),
  secondaryCta: CtaSchema.optional(),
  image: ImageSelectionSchema.optional(),
});
EOF

cat > src/components/hero-split/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HeroSplitSchema } from './schema';
export type HeroSplitData = z.infer<typeof HeroSplitSchema>;
export type HeroSplitSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/hero-split/View.tsx << 'EOF'
// Layout: Hero=A (SPLIT 60/40)
import React from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { HeroSplitData, HeroSplitSettings } from './types';

export const HeroSplit: React.FC<{ data: HeroSplitData; settings: HeroSplitSettings }> = ({ data }) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32" style={{'--local-accent': 'var(--primary)'} as React.CSSProperties}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            {data.label && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]" data-jp-field="label">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                {data.label}
              </div>
            )}
            <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-6xl" data-jp-field="title">
              {data.title}{" "}
              {data.titleHighlight && <span className="text-[var(--primary)]" data-jp-field="titleHighlight">{data.titleHighlight}</span>}
            </h1>
            <p className="max-w-[500px] text-lg text-[var(--muted-foreground)]" data-jp-field="description">{data.description}</p>
            <div className="flex flex-wrap gap-4">
              {data.primaryCta && (
                <Button size="lg" className="bg-[var(--primary)] text-[var(--primary-foreground)]" asChild>
                  <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
                </Button>
              )}
              {data.secondaryCta && (
                <Button size="lg" variant="outline" className="border-[var(--border)] text-[var(--foreground)]" asChild>
                  <a href={data.secondaryCta.href}>{data.secondaryCta.label}</a>
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[var(--radius-xl)] bg-gradient-to-tr from-[var(--primary)]/20 to-transparent opacity-50 blur-2xl" />
            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-2xl">
              <AspectRatio ratio={4/3}>
                {data.image?.url && <img src={data.image.url} alt={data.image.alt || ''} className="h-full w-full object-cover" />}
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
EOF

cat > src/components/hero-split/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- BENTO SERVICES ---
echo "-- Writing capsule: bento-services..."
cat > src/components/bento-services/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ServiceItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  icon: z.string().optional().describe('ui:icon-picker'),
  tag: z.string().optional().describe('ui:text'),
  isLarge: z.boolean().optional().describe('ui:checkbox'),
});

export const BentoServicesSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(ServiceItemSchema).describe('ui:list'),
});
EOF

cat > src/components/bento-services/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { BentoServicesSchema } from './schema';
export type BentoServicesData = z.infer<typeof BentoServicesSchema>;
export type BentoServicesSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/bento-services/View.tsx << 'EOF'
// Layout: Features=A (BENTO)
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import type { BentoServicesData, BentoServicesSettings } from './types';

export const BentoServices: React.FC<{ data: BentoServicesData; settings: BentoServicesSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16 flex flex-col gap-4">
          {data.label && <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]" data-jp-field="label">{data.label}</span>}
          <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--foreground)]" data-jp-field="title">{data.title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = (Icons as any)[item.icon || 'Cpu'];
            return (
              <Card 
                key={item.id || i} 
                className={`group relative overflow-hidden border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--primary)]/50 ${item.isLarge ? 'md:col-span-2' : ''}`}
                data-jp-item-id={item.id || i}
                data-jp-item-field="items"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
                      <Icon size={24} />
                    </div>
                    {item.tag && <Badge variant="secondary" className="bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)]">{item.tag}</Badge>}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--foreground)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
EOF

cat > src/components/bento-services/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- PRO SOLUTIONS ---
echo "-- Writing capsule: pro-solutions..."
cat > src/components/pro-solutions/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, CtaSchema } from '@olonjs/core';

const SolutionItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
});

export const ProSolutionsSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  solutions: z.array(SolutionItemSchema).describe('ui:list'),
  cta: CtaSchema.optional(),
});
EOF

cat > src/components/pro-solutions/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ProSolutionsSchema } from './schema';
export type ProSolutionsData = z.infer<typeof ProSolutionsSchema>;
export type ProSolutionsSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/pro-solutions/View.tsx << 'EOF'
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import type { ProSolutionsData, ProSolutionsSettings } from './types';

export const ProSolutions: React.FC<{ data: ProSolutionsData; settings: ProSolutionsSettings }> = ({ data }) => {
  return (
    <section className="bg-[var(--secondary)] py-24 border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6" data-jp-field="title">{data.title}</h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-8" data-jp-field="description">{data.description}</p>
            {data.cta && (
              <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]" asChild>
                <a href={data.cta.href}>{data.cta.label}</a>
              </Button>
            )}
          </div>
          <div className="grid gap-4">
            {data.solutions.map((item, i) => (
              <div 
                key={item.id || i} 
                className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
                data-jp-item-id={item.id || i}
                data-jp-item-field="solutions"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--primary)]" />
                <div>
                  <h4 className="font-display font-bold text-[var(--foreground)] mb-1">{item.title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
EOF

cat > src/components/pro-solutions/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- EDITORIAL ABOUT ---
echo "-- Writing capsule: editorial-about..."
cat > src/components/editorial-about/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, ImageSelectionSchema } from '@olonjs/core';

export const EditorialAboutSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  subtitle: z.string().describe('ui:text'),
  content: z.string().describe('ui:textarea'),
  sinceYear: z.string().optional().describe('ui:text'),
  image: ImageSelectionSchema.optional(),
});
EOF

cat > src/components/editorial-about/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { EditorialAboutSchema } from './schema';
export type EditorialAboutData = z.infer<typeof EditorialAboutSchema>;
export type EditorialAboutSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/editorial-about/View.tsx << 'EOF'
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
EOF

cat > src/components/editorial-about/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- REVIEW GRID ---
echo "-- Writing capsule: review-grid..."
cat > src/components/review-grid/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ReviewItemSchema = BaseArrayItem.extend({
  author: z.string().describe('ui:text'),
  body: z.string().describe('ui:textarea'),
  stars: z.number().min(1).max(5).default(5).describe('ui:number'),
});

export const ReviewGridSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  items: z.array(ReviewItemSchema).describe('ui:list'),
});
EOF

cat > src/components/review-grid/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ReviewGridSchema } from './schema';
export type ReviewGridData = z.infer<typeof ReviewGridSchema>;
export type ReviewGridSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/review-grid/View.tsx << 'EOF'
import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ReviewGridData, ReviewGridSettings } from './types';

export const ReviewGrid: React.FC<{ data: ReviewGridData; settings: ReviewGridSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--secondary)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-display text-3xl font-bold text-center mb-16 text-[var(--foreground)]" data-jp-field="title">{data.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <div 
              key={item.id || i} 
              className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-sm"
              data-jp-item-id={item.id || i}
              data-jp-item-field="items"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {Array.from({length: item.stars}).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-[var(--foreground)] italic mb-8">"{item.body}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-[var(--border)]">
                  <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold">
                    {item.author.substring(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="font-display font-bold text-sm text-[var(--foreground)]">{item.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
EOF

cat > src/components/review-grid/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- INFO CONTACT ---
echo "-- Writing capsule: info-contact..."
cat > src/components/info-contact/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ContactDetailSchema = BaseArrayItem.extend({
  label: z.string().describe('ui:text'),
  value: z.string().describe('ui:text'),
  icon: z.string().describe('ui:icon-picker'),
});

const HourItemSchema = BaseArrayItem.extend({
  days: z.string().describe('ui:text'),
  hours: z.string().describe('ui:text'),
});

export const InfoContactSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  address: z.string().describe('ui:text'),
  details: z.array(ContactDetailSchema).describe('ui:list'),
  hours: z.array(HourItemSchema).describe('ui:list'),
});
EOF

cat > src/components/info-contact/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { InfoContactSchema } from './schema';
export type InfoContactData = z.infer<typeof InfoContactSchema>;
export type InfoContactSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/info-contact/View.tsx << 'EOF'
import React from 'react';
import * as Icons from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { InfoContactData, InfoContactSettings } from './types';

export const InfoContact: React.FC<{ data: InfoContactData; settings: InfoContactSettings }> = ({ data }) => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-10">
            <h2 className="font-display text-4xl font-bold text-[var(--foreground)]" data-jp-field="title">{data.title}</h2>
            <div className="space-y-6">
              {data.details.map((detail, i) => {
                const Icon = (Icons as any)[detail.icon || 'Phone'];
                return (
                  <div key={detail.id || i} className="flex gap-4 items-start" data-jp-item-id={detail.id || i} data-jp-item-field="details">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-[var(--muted-foreground)] mb-1">{detail.label}</div>
                      <div className="text-[var(--foreground)] font-medium">{detail.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-10">
            <h3 className="font-display text-2xl font-bold text-[var(--foreground)] mb-6">Orari di Apertura</h3>
            <div className="space-y-4">
              {data.hours.map((h, i) => (
                <div key={h.id || i} className="flex justify-between items-center" data-jp-item-id={h.id || i} data-jp-item-field="hours">
                  <span className="text-[var(--foreground)] font-medium">{h.days}</span>
                  <span className="text-[var(--muted-foreground)] font-mono text-sm">{h.hours}</span>
                </div>
              ))}
            </div>
            <Separator className="my-8 bg-[var(--border)]" />
            <div className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              <p className="font-bold text-[var(--foreground)] mb-2">Dove trovarci:</p>
              <p data-jp-field="address">{data.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
EOF

cat > src/components/info-contact/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- STAT LINE ---
echo "-- Writing capsule: stat-line..."
cat > src/components/stat-line/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const StatItemSchema = BaseArrayItem.extend({
  value: z.string().describe('ui:text'),
  label: z.string().describe('ui:text'),
});

export const StatLineSchema = BaseSectionData.extend({
  items: z.array(StatItemSchema).describe('ui:list'),
});
EOF

cat > src/components/stat-line/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { StatLineSchema } from './schema';
export type StatLineData = z.infer<typeof StatLineSchema>;
export type StatLineSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/stat-line/View.tsx << 'EOF'
import React from 'react';
import type { StatLineData, StatLineSettings } from './types';

export const StatLine: React.FC<{ data: StatLineData; settings: StatLineSettings }> = ({ data }) => {
  return (
    <div className="bg-[var(--primary)] py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.items.map((stat, i) => (
            <div key={stat.id || i} className="text-center" data-jp-item-id={stat.id || i} data-jp-item-field="items">
              <div className="font-display text-4xl font-black text-[var(--primary-foreground)] mb-1">{stat.value}</div>
              <div className="text-[var(--primary-foreground)]/70 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
EOF

cat > src/components/stat-line/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# --- FOOTER ---
echo "-- Writing capsule: footer..."
cat > src/components/footer/schema.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';

const FooterLinkSchema = z.object({
  label: z.string().describe('ui:text'),
  href: z.string().describe('ui:text'),
});

export const FooterSchema = BaseSectionData.extend({
  brandText: z.string().describe('ui:text'),
  brandHighlight: z.string().optional().describe('ui:text'),
  copyright: z.string().describe('ui:text'),
  legalText: z.string().optional().describe('ui:textarea'),
  menu: z.array(FooterLinkSchema).optional().describe('ui:list'),
});
EOF

cat > src/components/footer/types.ts << 'EOF'
import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { FooterSchema } from './schema';
export type FooterData = z.infer<typeof FooterSchema>;
export type FooterSettings = z.infer<typeof BaseSectionSettingsSchema>;
EOF

cat > src/components/footer/View.tsx << 'EOF'
import React from 'react';
import { Separator } from '@/components/ui/separator';
import type { FooterData, FooterSettings } from './types';

export const Footer: React.FC<{ data: FooterData; settings: FooterSettings }> = ({ data }) => {
  const navItems = Array.isArray(data.menu) ? data.menu : [];
  return (
    <footer className="bg-[var(--background)] pt-20 pb-10 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]" data-jp-field="brandText">{data.brandText}</span>
              {data.brandHighlight && <span className="font-mono text-xs font-bold text-[var(--primary)]" data-jp-field="brandHighlight">{data.brandHighlight}</span>}
            </div>
            <p className="text-[var(--muted-foreground)] text-sm max-w-[300px]">{data.legalText}</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-sm text-[var(--foreground)]">Navigazione</h4>
              {navItems.map((item, i) => (
                <a key={i} href={item.href} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">{item.label}</a>
              ))}
            </div>
          </div>
        </div>
        <Separator className="bg-[var(--border)] mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[var(--muted-foreground)] text-[10px] font-mono tracking-wider uppercase" data-jp-field="copyright">
            {data.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
EOF

cat > src/components/footer/index.ts << 'EOF'
export * from './View';
export * from './schema';
export * from './types';
EOF

# -----------------------------------------------------------------------------
# 3. TYPES & REGISTRY
# -----------------------------------------------------------------------------

echo "-- Writing src/types.ts..."
cat > src/types.ts << 'EOF'
import type { HeaderData, HeaderSettings } from '@/components/header';
import type { FooterData, FooterSettings } from '@/components/footer';
import type { HeroSplitData, HeroSplitSettings } from '@/components/hero-split';
import type { BentoServicesData, BentoServicesSettings } from '@/components/bento-services';
import type { ProSolutionsData, ProSolutionsSettings } from '@/components/pro-solutions';
import type { EditorialAboutData, EditorialAboutSettings } from '@/components/editorial-about';
import type { ReviewGridData, ReviewGridSettings } from '@/components/review-grid';
import type { InfoContactData, InfoContactSettings } from '@/components/info-contact';
import type { StatLineData, StatLineSettings } from '@/components/stat-line';

export type SectionComponentPropsMap = {
  'header': { data: HeaderData; settings: HeaderSettings };
  'footer': { data: FooterData; settings: FooterSettings };
  'hero-split': { data: HeroSplitData; settings: HeroSplitSettings };
  'bento-services': { data: BentoServicesData; settings: BentoServicesSettings };
  'pro-solutions': { data: ProSolutionsData; settings: ProSolutionsSettings };
  'editorial-about': { data: EditorialAboutData; settings: EditorialAboutSettings };
  'review-grid': { data: ReviewGridData; settings: ReviewGridSettings };
  'info-contact': { data: InfoContactData; settings: InfoContactSettings };
  'stat-line': { data: StatLineData; settings: StatLineSettings };
};

declare module '@olonjs/core' {
  export interface SectionDataRegistry {
    'header': HeaderData;
    'footer': FooterData;
    'hero-split': HeroSplitData;
    'bento-services': BentoServicesData;
    'pro-solutions': ProSolutionsData;
    'editorial-about': EditorialAboutData;
    'review-grid': ReviewGridData;
    'info-contact': InfoContactData;
    'stat-line': StatLineData;
  }
  export interface SectionSettingsRegistry {
    'header': HeaderSettings;
    'footer': FooterSettings;
    'hero-split': HeroSplitSettings;
    'bento-services': BentoServicesSettings;
    'pro-solutions': ProSolutionsSettings;
    'editorial-about': EditorialAboutSettings;
    'review-grid': ReviewGridSettings;
    'info-contact': InfoContactSettings;
    'stat-line': StatLineSettings;
  }
}

export * from '@olonjs/core';
EOF

echo "-- Writing src/lib/ComponentRegistry.tsx..."
cat > src/lib/ComponentRegistry.tsx << 'EOF'
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSplit } from '@/components/hero-split';
import { BentoServices } from '@/components/bento-services';
import { ProSolutions } from '@/components/pro-solutions';
import { EditorialAbout } from '@/components/editorial-about';
import { ReviewGrid } from '@/components/review-grid';
import { InfoContact } from '@/components/info-contact';
import { StatLine } from '@/components/stat-line';

import type { SectionType } from '@olonjs/core';
import type { SectionComponentPropsMap } from '@/types';

export const ComponentRegistry: {
  [K in SectionType]: React.FC<SectionComponentPropsMap[K]>;
} = {
  'header': Header,
  'footer': Footer,
  'hero-split': HeroSplit,
  'bento-services': BentoServices,
  'pro-solutions': ProSolutions,
  'editorial-about': EditorialAbout,
  'review-grid': ReviewGrid,
  'info-contact': InfoContact,
  'stat-line': StatLine,
};
EOF

echo "-- Writing src/lib/schemas.ts..."
cat > src/lib/schemas.ts << 'EOF'
import { HeaderSchema } from '@/components/header';
import { FooterSchema } from '@/components/footer';
import { HeroSplitSchema } from '@/components/hero-split';
import { BentoServicesSchema } from '@/components/bento-services';
import { ProSolutionsSchema } from '@/components/pro-solutions';
import { EditorialAboutSchema } from '@/components/editorial-about';
import { ReviewGridSchema } from '@/components/review-grid';
import { InfoContactSchema } from '@/components/info-contact';
import { StatLineSchema } from '@/components/stat-line';

export const SECTION_SCHEMAS = {
  'header': HeaderSchema,
  'footer': FooterSchema,
  'hero-split': HeroSplitSchema,
  'bento-services': BentoServicesSchema,
  'pro-solutions': ProSolutionsSchema,
  'editorial-about': EditorialAboutSchema,
  'review-grid': ReviewGridSchema,
  'info-contact': InfoContactSchema,
  'stat-line': StatLineSchema,
} as const;

export const SECTION_SUBMISSION_SCHEMAS = {} as const;

export type SectionType = keyof typeof SECTION_SCHEMAS;

export {
  BaseSectionData,
  BaseArrayItem,
  BaseSectionSettingsSchema,
  CtaSchema,
  ImageSelectionSchema,
} from '@olonjs/core';
EOF

echo "-- Writing src/lib/addSectionConfig.ts..."
cat > src/lib/addSectionConfig.ts << 'EOF'
import type { AddSectionConfig } from '@olonjs/core';

const addableSectionTypes = [
  'hero-split', 'bento-services', 'pro-solutions', 'editorial-about', 'review-grid', 'info-contact', 'stat-line'
] as const;

const sectionTypeLabels: Record<string, string> = {
  'hero-split': 'Hero Split 60/40',
  'bento-services': 'Servizi Bento Grid',
  'pro-solutions': 'Soluzioni Aziendali',
  'editorial-about': 'Storia Editoriale',
  'review-grid': 'Griglia Recensioni',
  'info-contact': 'Contatti e Orari',
  'stat-line': 'Linea Statistiche',
};

function getDefaultSectionData(type: string): Record<string, unknown> {
  switch (type) {
    case 'hero-split': return { title: 'L’informatica a Palermo', description: 'Dal 1996 al vostro servizio.', primaryCta: { label: 'Servizi', href: '/servizi', variant: 'primary' } };
    case 'bento-services': return { title: 'Cosa facciamo', items: [] };
    case 'stat-line': return { items: [{ label: 'Anni di esperienza', value: '28+' }] };
    default: return {};
  }
}

export const addSectionConfig: AddSectionConfig = {
  addableSectionTypes: [...addableSectionTypes],
  sectionTypeLabels,
  getDefaultSectionData,
};
EOF

# -----------------------------------------------------------------------------
# 4. SITE DATA
# -----------------------------------------------------------------------------

echo "-- Writing src/data/config/menu.json..."
cat > src/data/config/menu.json << 'EOF'
{
  "main": [
    { "label": "Home", "href": "/" },
    { "label": "Servizi Privati", "href": "/servizi" },
    { "label": "Soluzioni Aziende", "href": "/business" },
    { "label": "Contatti", "href": "/contatti", "isCta": true }
  ],
  "footer": [
    { "label": "Privacy Policy", "href": "#" },
    { "label": "Cookie Policy", "href": "#" }
  ]
}
EOF

echo "-- Writing src/data/config/site.json..."
cat > src/data/config/site.json << 'EOF'
{
  "header": {
    "id": "global-header",
    "type": "header",
    "data": {
      "logoText": "BIT COM",
      "logoHighlight": "B.S. INFORMATICA",
      "announcement": "ESPERTI IN RIPARAZIONI E RETI AZIENDALI DAL 1996",
      "menu": { "$ref": "../config/menu.json#/main" }
    },
    "settings": {}
  },
  "footer": {
    "id": "global-footer",
    "type": "footer",
    "data": {
      "brandText": "BIT COM",
      "brandHighlight": "B.S. INF.",
      "copyright": "© 2024 B.S. INFORMATICA DI BORGESE MARCO & C. S.N.C. - P.IVA 06244880826",
      "legalText": "Sede Legale: Via Luigi Pirandello 36, Palermo. Negozio: Via Simone Cuccia 1B, 90144 Palermo. Codice ATECO 47.41.00",
      "menu": { "$ref": "../config/menu.json#/footer" }
    },
    "settings": {}
  },
  "identity": { "title": "BIT COM - Informatica Palermo" },
  "pages": []
}
EOF

echo "-- Writing src/data/pages/home.json..."
cat > src/data/pages/home.json << 'EOF'
{
  "id": "home-page",
  "slug": "home",
  "meta": { "title": "BIT COM | Informatica e Riparazioni a Palermo", "description": "Dal 1996 il punto di riferimento a Palermo per la vendita e riparazione di PC, smartphone e reti aziendali." },
  "sections": [
    {
      "id": "hero-1",
      "type": "hero-split",
      "data": {
        "label": "Palermo - Zona Libertà",
        "title": "Soluzioni informatiche concrete",
        "titleHighlight": "da oltre 28 anni",
        "description": "Portiamo l'esperienza di tre decenni nella tecnologia di oggi. Dalla riparazione del tuo smartphone alla progettazione della tua rete aziendale.",
        "primaryCta": { "id": "c1", "label": "I Nostri Servizi", "href": "/servizi", "variant": "primary" },
        "secondaryCta": { "id": "c2", "label": "Per le Aziende", "href": "/business", "variant": "secondary" },
        "image": { "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=2000", "alt": "Negozio Informatica" }
      },
      "settings": {}
    },
    {
      "id": "stats-1",
      "type": "stat-line",
      "data": {
        "items": [
          { "id": "s1", "value": "1996", "label": "Anno di nascita" },
          { "id": "s2", "value": "1000+", "label": "Riparazioni/anno" },
          { "id": "s3", "value": "150+", "label": "Aziende assistite" },
          { "id": "s4", "value": "100%", "label": "Trasparenza" }
        ]
      },
      "settings": {}
    },
    {
      "id": "bento-1",
      "type": "bento-services",
      "data": {
        "label": "Per i Privati",
        "title": "Riparazioni e Vendita",
        "items": [
          { "id": "i1", "title": "Smartphone & Tablet", "description": "Riparazione professionale Apple, Samsung e Android. Sostituzione schermi e batterie rapida.", "icon": "Smartphone", "tag": "Popolare" },
          { "id": "i2", "title": "PC & Notebook", "description": "Vendita del nuovo e rigenerati garantiti. Assistenza hardware e software su ogni modello.", "icon": "Laptop", "isLarge": true },
          { "id": "i3", "title": "Consumabili", "description": "Cartucce e toner compatibili per tutte le stampanti. Risparmio garantito senza perdere qualità.", "icon": "Printer" },
          { "id": "i4", "title": "Connettività Linkem", "description": "Punto vendita autorizzato Linkem per internet veloce a casa e in ufficio.", "icon": "Wifi" }
        ]
      },
      "settings": {}
    },
    {
      "id": "about-1",
      "type": "editorial-about",
      "data": {
        "title": "Una storia fatta di bit e persone",
        "subtitle": "Dal 1996 accompagniamo la rivoluzione digitale di Palermo.",
        "sinceYear": "1996",
        "content": "Siamo nati quando avere un computer in casa era un'eccezione. Marco Borgese e Gabriele Santoro hanno trasformato una passione in un punto di riferimento per il quartiere Libertà e l'intera città.\nLa nostra forza è la trasparenza: preventivo chiaro prima di iniziare e l'onestà di dirti se un dispositivo non merita la spesa di una riparazione.",
        "image": { "url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000", "alt": "Staff Tecnico" }
      },
      "settings": {}
    },
    {
      "id": "reviews-1",
      "type": "review-grid",
      "data": {
        "title": "Cosa dicono di noi",
        "items": [
          { "id": "r1", "author": "Vito Luca", "body": "Qualità e servizio eccellenti! Sicuramente consigliato.", "stars": 5 },
          { "id": "r2", "author": "Domenico Scammacca", "body": "Molto preparati e professionali, cortesia e soluzioni ottimali li distinguono.", "stars": 5 },
          { "id": "r3", "author": "Antonino Matranga", "body": "Professionalità e puntualità.", "stars": 5 }
        ]
      },
      "settings": {}
    }
  ]
}
EOF

echo "-- Writing src/data/pages/servizi.json..."
cat > src/data/pages/servizi.json << 'EOF'
{
  "id": "servizi-page",
  "slug": "servizi",
  "meta": { "title": "Servizi per Privati - BIT COM", "description": "Riparazione smartphone, tablet e PC a Palermo. Cartucce, toner e assistenza tecnica specializzata." },
  "sections": [
    {
      "id": "hero-servizi",
      "type": "hero-split",
      "data": {
        "title": "Assistenza per i tuoi dispositivi",
        "description": "Entri con un problema, esci con una soluzione. Gestiamo ogni tipo di guasto su computer e telefonia.",
        "primaryCta": { "id": "c1", "label": "Vieni in Negozio", "href": "/contatti", "variant": "primary" },
        "image": { "url": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=2000", "alt": "Laboratorio" }
      },
      "settings": {}
    },
    {
      "id": "info-contatti-servizi",
      "type": "info-contact",
      "data": {
        "title": "Ritiro e Consegna in Negozio",
        "address": "Via Simone Cuccia 1B, 90144 Palermo (Zona Libertà)",
        "details": [
          { "id": "d1", "label": "Telefono", "value": "091 306740", "icon": "Phone" },
          { "id": "d2", "label": "WhatsApp", "value": "Contattaci per preventivi", "icon": "MessageSquare" }
        ],
        "hours": [
          { "id": "h1", "days": "Lunedì - Venerdì", "hours": "09:00-13:00 / 16:00-19:30" },
          { "id": "h2", "days": "Sabato", "hours": "10:00-13:00" },
          { "id": "h3", "days": "Domenica", "hours": "Chiuso" }
        ]
      },
      "settings": {}
    }
  ]
}
EOF

echo "-- Writing src/data/pages/business.json..."
cat > src/data/pages/business.json << 'EOF'
{
  "id": "business-page",
  "slug": "business",
  "meta": { "title": "Soluzioni per Aziende e Professionisti - BIT COM", "description": "Progettazione reti, consulenza informatica e sviluppo software a Palermo per imprese e studi professionali." },
  "sections": [
    {
      "id": "hero-biz",
      "type": "hero-split",
      "data": {
        "title": "Partner tecnologico per la tua impresa",
        "description": "Dalla startup consolidata allo studio professionale: forniamo l'infrastruttura e il supporto necessario per non fermarsi mai.",
        "primaryCta": { "id": "c1", "label": "Richiedi Consulenza", "href": "/contatti", "variant": "primary" },
        "image": { "url": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000", "alt": "Ufficio Moderno" }
      },
      "settings": {}
    },
    {
      "id": "solutions-1",
      "type": "pro-solutions",
      "data": {
        "title": "Servizi B2B su misura",
        "description": "Supportiamo le aziende di Palermo con competenze che spaziano dall'hardware al cloud.",
        "solutions": [
          { "id": "s1", "title": "Reti Aziendali", "description": "Progettazione e installazione di infrastrutture di rete sicure e scalabili." },
          { "id": "s2", "title": "Sviluppo Software", "description": "Applicazioni personalizzate per l'automazione e l'organizzazione aziendale." },
          { "id": "s3", "title": "Formazione IT", "description": "Corsi specifici per dipendenti sull'uso di nuovi strumenti e sicurezza informatica." },
          { "id": "s4", "title": "Assistenza On-Site", "description": "Interventi rapidi presso la vostra sede per minimizzare i tempi di fermo." }
        ],
        "cta": { "id": "c1", "label": "Analisi Esigenze Gratuita", "href": "/contatti", "variant": "primary" }
      },
      "settings": {}
    }
  ]
}
EOF

echo "-- Writing src/data/pages/contatti.json..."
cat > src/data/pages/contatti.json << 'EOF'
{
  "id": "contatti-page",
  "slug": "contatti",
  "meta": { "title": "Contattaci - BIT COM Palermo", "description": "Siamo in Via Simone Cuccia 1B, Palermo. Chiamaci o vieni a trovarci per una diagnosi gratuita." },
  "sections": [
    {
      "id": "info-contact-1",
      "type": "info-contact",
      "data": {
        "title": "Vieni a trovarci a Palermo",
        "address": "Via Simone Cuccia 1B, 90144 Palermo (Zona Libertà)",
        "details": [
          { "id": "d1", "label": "Telefono Fisso", "value": "091 306740", "icon": "Phone" },
          { "id": "d2", "label": "Email", "value": "info@bitcom2009.it", "icon": "Mail" },
          { "id": "d3", "label": "Posizione", "value": "Via Simone Cuccia 1B, Palermo", "icon": "MapPin" }
        ],
        "hours": [
          { "id": "h1", "days": "Lunedì - Venerdì", "hours": "09:00-13:00 / 16:00-19:30" },
          { "id": "h2", "days": "Sabato", "hours": "10:00-13:00" },
          { "id": "h3", "days": "Domenica", "hours": "Chiuso" }
        ]
      },
      "settings": {}
    }
  ]
}
EOF

# -----------------------------------------------------------------------------
# 5. ENTRY POINT & HTML
# -----------------------------------------------------------------------------

echo "-- Writing index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BIT COM – B.S. Informatica Palermo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# -----------------------------------------------------------------------------
# 6. FINAL BUILD
# -----------------------------------------------------------------------------

echo "-- Running build..."
npm run build

echo "------------------------------------------------------------------------"
echo "✅ TENANT GENERATION COMPLETE"
echo "------------------------------------------------------------------------"
echo "1. Typography: IBM Plex Sans / Space Grotesk / JetBrains Mono (Contract applied)"
echo "2. Color Modes: Full Light/Dark support via CSS variables"
echo "3. Layouts: Hero Split 60/40, Bento Grid features"
echo "4. Shell: Navigation via site.json + menu.json"
echo "5. Components: 9 Capsules generated and registered"
echo "6. Pages: 4 pages (Home, Servizi, Business, Contatti) with real content"
echo "7. Compliance: No emojis, Lucide icons used, TOCC overlays ready"
echo "------------------------------------------------------------------------"