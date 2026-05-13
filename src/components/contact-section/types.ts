import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ContactSchema } from './schema';
export type ContactData = z.infer<typeof ContactSchema>;
export type ContactSettings = z.infer<typeof BaseSectionSettingsSchema>;

