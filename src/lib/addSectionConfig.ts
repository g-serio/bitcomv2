import type { AddSectionConfig } from '@olonjs/core';

const addableSectionTypes = [
  'hero-bento',
  'services-grid',
  'history-timeline',
  'business-solutions',
  'reviews-slider',
  'cta-band'
] as const;

const sectionTypeLabels: Record<string, string> = {
  'hero-bento': 'Hero (Bento Grid)',
  'services-grid': 'Servizi (Grid)',
  'history-timeline': 'Storia (Timeline)',
  'business-solutions': 'Soluzioni B2B (Accordion)',
  'reviews-slider': 'Recensioni',
  'cta-band': 'Call to Action'
};

function getDefaultSectionData(type: string): Record<string, unknown> {
  switch (type) {
    case 'hero-bento': return { title: 'Nuovo Hero', description: 'Descrizione' };
    case 'services-grid': return { title: 'I nostri servizi', items: [] };
    case 'history-timeline': return { title: 'La nostra storia', items: [] };
    case 'business-solutions': return { title: 'Soluzioni Aziendali', description: '', items: [] };
    case 'reviews-slider': return { title: 'Dicono di noi', items: [] };
    case 'cta-band': return { title: 'Contattaci', cta: { id: 'cta1', label: 'Clicca qui', href: '#' } };
    default: return {};
  }
}

export const addSectionConfig: AddSectionConfig = {
  addableSectionTypes: [...addableSectionTypes],
  sectionTypeLabels,
  getDefaultSectionData,
};

