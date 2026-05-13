import React from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpRight, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { BitcomLogo } from './BitcomLogo';
import type { HeaderData, HeaderSettings } from './types';

export const Header: React.FC<{ data: HeaderData; settings: HeaderSettings }> = ({ data }) => {
  const navItems = Array.isArray(data.menu) ? data.menu : [];
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        '--local-bg': 'color-mix(in oklch, var(--background) 90%, transparent)',
        '--local-text': 'var(--foreground)',
        '--local-border': 'var(--border)',
        '--local-surface': 'color-mix(in oklch, var(--card) 88%, transparent)',
        '--local-primary': 'var(--primary)',
        '--local-primary-foreground': 'var(--primary-foreground)',
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className="sticky top-0 z-[200] border-b border-[var(--local-border)] bg-[var(--local-bg)]/95 backdrop-blur-xl"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {data.announcement && (
          <div className="border-b border-[var(--local-border)] py-2 text-center text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[var(--local-text)]/70" data-jp-field="announcement">
            {data.announcement}
          </div>
        )}
        <div className="flex h-20 items-center justify-between gap-6">
          <a href="/" className="inline-flex flex-col items-stretch gap-0.5">
            <BitcomLogo
              aria-label={data.logoText || 'BITCOM'}
              style={{ height: 36, width: 'auto' }}
            />
            {data.logoHighlight && (
              <span
                className="block text-right font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--local-primary)]"
                data-jp-field="logoHighlight"
              >
                {data.logoHighlight}
              </span>
            )}
          </a>

          <div className="hidden items-center gap-4 lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item, idx) => (
                  <NavigationMenuItem key={item.href + '-' + idx}>
                    <NavigationMenuLink
                      href={item.href}
                      className={`rounded-[var(--local-radius-md)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--local-surface)] ${
                        item.isCta 
                          ? 'bg-[var(--local-primary)] text-[var(--local-primary-foreground)] hover:opacity-90' 
                          : 'text-[var(--local-text)]'
                      }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              type="button"
              variant="outline"
              onClick={toggleTheme}
              className="rounded-[var(--local-radius-md)] border-[var(--local-border)] bg-[var(--local-surface)] text-[var(--local-text)]"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Apri menu"
                  className="text-[var(--local-text)] hover:bg-[var(--local-surface)]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-sm border-l border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] p-0 flex flex-col gap-0"
              >
                <SheetTitle className="sr-only">Menu di navigazione</SheetTitle>

                <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                  <a href="/" className="inline-flex flex-col items-stretch gap-0.5">
                    <BitcomLogo
                      aria-label={data.logoText || 'BITCOM'}
                      style={{ height: 32, width: 'auto' }}
                    />
                    {data.logoHighlight && (
                      <span className="block text-right font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--primary)]">
                        {data.logoHighlight}
                      </span>
                    )}
                  </a>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-8">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--foreground)]/50 mb-6">
                    Navigazione
                  </p>
                  <ul className="flex flex-col">
                    {navItems
                      .filter((item) => !item.isCta)
                      .map((item, idx) => (
                        <li key={item.href + '-mobile-' + idx}>
                          <SheetClose asChild>
                            <a
                              href={item.href}
                              className="group flex items-center justify-between gap-3 py-4 border-b border-[var(--border)] text-[1.25rem] font-display font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                            >
                              <span>{item.label}</span>
                              <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--primary)]" />
                            </a>
                          </SheetClose>
                        </li>
                      ))}
                  </ul>

                  {navItems.some((item) => item.isCta) && (
                    <div className="mt-8 flex flex-col gap-3">
                      {navItems
                        .filter((item) => item.isCta)
                        .map((item, idx) => (
                          <SheetClose asChild key={item.href + '-cta-' + idx}>
                            <a
                              href={item.href}
                              className="inline-flex items-center justify-center gap-2 rounded-[var(--theme-radius-md)] bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity"
                            >
                              {item.label}
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </SheetClose>
                        ))}
                    </div>
                  )}
                </nav>

                <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--foreground)]/50">
                    Tema
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
                    className="rounded-full border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

