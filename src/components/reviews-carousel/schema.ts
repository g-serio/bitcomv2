import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ReviewItemSchema = BaseArrayItem.extend({
  author: z.string().describe('ui:text'),
  quote: z.string().describe('ui:textarea'),
});

export const ReviewsCarouselSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(ReviewItemSchema).describe('ui:list'),
});

