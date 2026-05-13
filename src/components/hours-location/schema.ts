import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const HoursItemSchema = BaseArrayItem.extend({
  day: z.string().describe('ui:text'),
  hours: z.string().describe('ui:text'),
  isClosed: z.boolean().optional().describe('ui:checkbox'),
});

export const HoursLocationSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  schedule: z.array(HoursItemSchema).describe('ui:list'),
  specialNote: z.string().optional().describe('ui:textarea'),
});
