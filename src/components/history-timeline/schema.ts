import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const TimelineItemSchema = BaseArrayItem.extend({
  year: z.string().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
});

export const HistoryTimelineSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(TimelineItemSchema).describe('ui:list'),
});

