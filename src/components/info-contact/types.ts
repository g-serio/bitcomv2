import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { InfoContactSchema } from './schema';
export type InfoContactData = z.infer<typeof InfoContactSchema>;
export type InfoContactSettings = z.infer<typeof BaseSectionSettingsSchema>;
