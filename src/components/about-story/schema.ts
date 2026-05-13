import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema } from '@olonjs/core';

const MilestoneSchema = BaseArrayItem.extend({
  year: z.string().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
});

export const AboutStorySchema = BaseSectionData.extend({
  eyebrow: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  image: ImageSelectionSchema.optional().describe('ui:image'),
  milestones: z.array(MilestoneSchema).describe('ui:list'),
});
