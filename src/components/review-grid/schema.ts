import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ReviewItemSchema = BaseArrayItem.extend({
  author: z.string().describe('ui:text'),
  body: z.string().describe('ui:textarea'),
  stars: z.number().min(1).max(5).default(5).describe('ui:number'),
});

export const ReviewGridSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  items: z.array(ReviewItemSchema).describe('ui:list'),
});
