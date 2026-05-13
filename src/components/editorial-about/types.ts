import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { EditorialAboutSchema } from './schema';
export type EditorialAboutData = z.infer<typeof EditorialAboutSchema>;
export type EditorialAboutSettings = z.infer<typeof BaseSectionSettingsSchema>;
