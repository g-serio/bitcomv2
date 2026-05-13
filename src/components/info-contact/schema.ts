import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ContactDetailSchema = BaseArrayItem.extend({
  label: z.string().describe('ui:text'),
  value: z.string().describe('ui:text'),
  icon: z.string().describe('ui:icon-picker'),
});

const HourItemSchema = BaseArrayItem.extend({
  days: z.string().describe('ui:text'),
  hours: z.string().describe('ui:text'),
});

export const InfoContactSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  address: z.string().describe('ui:text'),
  details: z.array(ContactDetailSchema).describe('ui:list'),
  hours: z.array(HourItemSchema).describe('ui:list'),
});
