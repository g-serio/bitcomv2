import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const B2BFeature = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  desc: z.string().describe('ui:textarea')
});

export const B2BSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  subtitle: z.string().describe('ui:textarea'),
  features: z.array(B2BFeature).describe('ui:list')
});

