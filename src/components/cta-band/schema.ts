import { z } from 'zod';
import { BaseSectionData, CtaSchema } from '@olonjs/core';

export const CtaBandSchema = BaseSectionData.extend({
  title: z.string().describe('ui:textarea'),
  description: z.string().optional().describe('ui:textarea'),
  cta: CtaSchema,
});

