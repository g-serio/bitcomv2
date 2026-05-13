import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';

const FooterMenuItemSchema = z.object({
  label: z.string(),
  href: z.string()
});

export const FooterSchema = BaseSectionData.extend({
  brandText: z.string().describe('ui:text'),
  address: z.string().describe('ui:text'),
  phone: z.string().describe('ui:text'),
  email: z.string().describe('ui:text'),
  hours1: z.string().describe('ui:text'),
  hours2: z.string().describe('ui:text'),
  copyright: z.string().describe('ui:text'),
  menu: z.array(FooterMenuItemSchema).optional().describe('ui:list'),
});

