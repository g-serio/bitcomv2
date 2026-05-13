import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { B2BSchema } from './schema';
export type B2BData = z.infer<typeof B2BSchema>;
export type B2BSettings = z.infer<typeof BaseSectionSettingsSchema>;

