import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ServiceItem = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  body: z.string().describe('ui:textarea'),
  icon: z.string().describe('ui:icon-picker'),
  size: z.enum(['small', 'large']).default('small')
});

export const ServicesBentoSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(ServiceItem).describe('ui:list')
});

