import { HeaderSchema } from '@/components/header';
import { FooterSchema } from '@/components/footer';
import { HeroBentoSchema } from '@/components/hero-bento';
import { ServicesGridSchema } from '@/components/services-grid';
import { HistoryTimelineSchema } from '@/components/history-timeline';
import { BusinessSolutionsSchema } from '@/components/business-solutions';
import { ReviewsSliderSchema } from '@/components/reviews-slider';
import { CtaBandSchema } from '@/components/cta-band';
import { TechHeroSchema } from '@/components/tech-hero';
import { ServiceDetailSchema } from '@/components/service-detail';
import { RepairProcessSchema } from '@/components/repair-process';
import { LogoCloudSchema } from '@/components/logo-cloud';

export const SECTION_SCHEMAS = {
  'header': HeaderSchema,
  'footer': FooterSchema,
  'hero-bento': HeroBentoSchema,
  'services-grid': ServicesGridSchema,
  'history-timeline': HistoryTimelineSchema,
  'business-solutions': BusinessSolutionsSchema,
  'reviews-slider': ReviewsSliderSchema,
  'cta-band': CtaBandSchema,
  'tech-hero': TechHeroSchema,
  'service-detail': ServiceDetailSchema,
  'repair-process': RepairProcessSchema,
  'logo-cloud': LogoCloudSchema,
} as const;

export const SECTION_SUBMISSION_SCHEMAS = {} as const;

export type SectionType = keyof typeof SECTION_SCHEMAS;

export {
  BaseSectionData,
  BaseArrayItem,
  BaseSectionSettingsSchema,
  CtaSchema,
  ImageSelectionSchema,
} from '@olonjs/core';
