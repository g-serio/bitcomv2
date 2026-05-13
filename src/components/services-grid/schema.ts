import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ServiceItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  icon: z.enum(['laptop', 'smartphone', 'printer', 'network', 'code', 'shield']).optional().describe('ui:select'),
  category: z.string().optional().describe('ui:text'),
});

export const ServicesGridSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  subtitle: z.string().optional().describe('ui:textarea'),
  items: z.array(ServiceItemSchema).optional().describe('ui:list'),
  services: z.array(ServiceItemSchema).optional().describe('ui:list'),
});
