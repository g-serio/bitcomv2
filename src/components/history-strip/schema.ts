import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';

export const HistorySchema = BaseSectionData.extend({
  year: z.string().describe('ui:text'),
  title: z.string().describe('ui:text'),
  body: z.string().describe('ui:textarea')
});

