import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { LogoCloudSchema } from './schema';
export type LogoCloudData = z.infer<typeof LogoCloudSchema>;
export type LogoCloudSettings = z.infer<typeof BaseSectionSettingsSchema>;
