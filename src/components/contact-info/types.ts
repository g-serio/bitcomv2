import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ContactInfoSchema } from './schema';

export type ContactInfoData = z.infer<typeof ContactInfoSchema>;
export type ContactInfoSettings = z.infer<typeof BaseSectionSettingsSchema>;
