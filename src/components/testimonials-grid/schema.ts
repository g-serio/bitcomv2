import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const Testimonial = BaseArrayItem.extend({
  quote: z.string().describe('ui:textarea'),
  author: z.string().describe('ui:text')
});

export const TestimonialsSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  items: z.array(Testimonial).describe('ui:list')
});

