import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const StatItemSchema = BaseArrayItem.extend({
  value: z.string().describe('ui:text'),
  label: z.string().describe('ui:text'),
});

export const StatLineSchema = BaseSectionData.extend({
  items: z.array(StatItemSchema).describe('ui:list'),
});
