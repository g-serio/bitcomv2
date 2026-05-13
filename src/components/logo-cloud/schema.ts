import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema } from '@olonjs/core';

export const LogoBrandEnum = z.enum([
  'beacon',
  'bolt',
  'cisco',
  'hulu',
  'openai',
  'prime',
  'stripe',
  'supabase',
]);

export const LogoTintEnum = z.enum(['mono', 'primary', 'brand']);

const LogoItemSchema = BaseArrayItem.extend({
  brand: LogoBrandEnum.optional().describe('ui:select'),
  image: ImageSelectionSchema.optional(),
  alt: z.string().optional().describe('ui:text'),
  height: z.number().optional().describe('ui:number'),
});

export const LogoCloudSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().optional().describe('ui:text'),
  tint: LogoTintEnum.optional().describe('ui:select'),
  items: z.array(LogoItemSchema).describe('ui:list'),
});
