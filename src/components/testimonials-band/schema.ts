import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const TestimonialItemSchema = BaseArrayItem.extend({
  quote: z.string().describe('ui:textarea'),
  author: z.string().describe('ui:text'),
  rating: z.number().min(1).max(5).optional().describe('ui:number'),
});

export const TestimonialsBandSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  testimonials: z.array(TestimonialItemSchema).describe('ui:list'),
});
