import { z } from 'zod';
import { BaseSectionData, CtaSchema } from '@olonjs/core';

export const ContactInfoSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  address: z.string().describe('ui:textarea'),
  phone: z.string().describe('ui:text'),
  email: z.string().optional().describe('ui:text'),
  whatsapp: z.string().optional().describe('ui:text'),
  mapEmbed: z.string().optional().describe('ui:textarea'),
  primaryCta: CtaSchema.optional().describe('ui:cta'),
});
