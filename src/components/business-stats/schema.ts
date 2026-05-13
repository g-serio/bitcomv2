import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const StatItemSchema = BaseArrayItem.extend({
  number: z.string().describe('ui:text'),
  label: z.string().describe('ui:text'),
  suffix: z.string().optional().describe('ui:text'),
});

export const BusinessStatsSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().optional().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  stats: z.array(StatItemSchema).describe('ui:list'),
});
