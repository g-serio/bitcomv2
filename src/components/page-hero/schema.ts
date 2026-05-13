import { z } from 'zod';
import { BaseSectionData, CtaSchema } from '@olonjs/core';

export const PageHeroSchema = BaseSectionData.extend({
  eyebrow: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  cta: CtaSchema.optional().describe('ui:cta'),
  breadcrumbs: z.array(z.object({
    label: z.string(),
    href: z.string().optional(),
  })).optional().describe('ui:list'),
});
