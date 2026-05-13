import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema } from '@olonjs/core';

const ProcessStepSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  icon: ImageSelectionSchema.optional(),
  stepNumber: z.number().describe('ui:number'),
});

export const RepairProcessSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  steps: z.array(ProcessStepSchema).describe('ui:list'),
});
