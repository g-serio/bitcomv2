import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ServicesBentoSchema } from './schema';
export type ServicesBentoData = z.infer<typeof ServicesBentoSchema>;
export type ServicesBentoSettings = z.infer<typeof BaseSectionSettingsSchema>;

