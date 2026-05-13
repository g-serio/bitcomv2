import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const BentoItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  span: z.enum(['1', '2']).default('1').describe('ui:select'),
});

export const BentoFeaturesSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(BentoItemSchema).describe('ui:list'),
});

