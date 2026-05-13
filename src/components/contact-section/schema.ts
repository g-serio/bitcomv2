import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';

export const ContactSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  address: z.string().describe('ui:textarea'),
  hours: z.string().describe('ui:textarea'),
  phone: z.string().describe('ui:text'),
  email: z.string().describe('ui:text')
});

