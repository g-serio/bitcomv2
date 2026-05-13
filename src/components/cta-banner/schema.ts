import { z } from 'zod';
import { BaseSectionData, CtaSchema } from '@olonjs/core';

export const CtaBannerSchema = BaseSectionData.extend({
  title: z.string().describe('ui:textarea'),
  description: z.string().optional().describe('ui:textarea'),
  primaryCta: CtaSchema.optional(),
});

