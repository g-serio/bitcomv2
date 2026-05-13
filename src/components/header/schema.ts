import { z } from 'zod';
import { BaseSectionData, ImageSelectionSchema } from '@olonjs/core';

const HeaderMenuItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  isCta: z.boolean().optional()
});

export const HeaderSchema = BaseSectionData.extend({
  logoText: z.string().describe('ui:text'),
  logoHighlight: z.string().optional().describe('ui:text'),
  logoImage: ImageSelectionSchema.optional(),
  announcement: z.string().optional().describe('ui:text'),
  menu: z.array(HeaderMenuItemSchema).optional().describe('ui:list'),
});
