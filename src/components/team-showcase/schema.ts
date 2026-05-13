import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema } from '@olonjs/core';

const TeamMemberSchema = BaseArrayItem.extend({
  name: z.string().describe('ui:text'),
  role: z.string().describe('ui:text'),
  bio: z.string().optional().describe('ui:textarea'),
  photo: ImageSelectionSchema.optional(),
  experience: z.string().optional().describe('ui:text'),
});

export const TeamShowcaseSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  members: z.array(TeamMemberSchema).describe('ui:list'),
});
