import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ServiceDetailSchema } from './schema';

export type ServiceDetailData = z.infer<typeof ServiceDetailSchema>;
export type ServiceDetailSettings = z.infer<typeof BaseSectionSettingsSchema>;
