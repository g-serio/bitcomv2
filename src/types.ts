import type { HeaderData, HeaderSettings } from '@/components/header';
import type { FooterData, FooterSettings } from '@/components/footer';
import type { HeroBentoData, HeroBentoSettings } from '@/components/hero-bento';
import type { ServicesGridData, ServicesGridSettings } from '@/components/services-grid';
import type { HistoryTimelineData, HistoryTimelineSettings } from '@/components/history-timeline';
import type { BusinessSolutionsData, BusinessSolutionsSettings } from '@/components/business-solutions';
import type { ReviewsSliderData, ReviewsSliderSettings } from '@/components/reviews-slider';
import type { CtaBandData, CtaBandSettings } from '@/components/cta-band';
import type { TechHeroData, TechHeroSettings } from '@/components/tech-hero';
import type { ServiceDetailData, ServiceDetailSettings } from '@/components/service-detail';
import type { RepairProcessData, RepairProcessSettings } from '@/components/repair-process';
import type { LogoCloudData, LogoCloudSettings } from '@/components/logo-cloud';

export type SectionComponentPropsMap = {
  'header': { data: HeaderData; settings: HeaderSettings };
  'footer': { data: FooterData; settings: FooterSettings };
  'hero-bento': { data: HeroBentoData; settings: HeroBentoSettings };
  'services-grid': { data: ServicesGridData; settings: ServicesGridSettings };
  'history-timeline': { data: HistoryTimelineData; settings: HistoryTimelineSettings };
  'business-solutions': { data: BusinessSolutionsData; settings: BusinessSolutionsSettings };
  'reviews-slider': { data: ReviewsSliderData; settings: ReviewsSliderSettings };
  'cta-band': { data: CtaBandData; settings: CtaBandSettings };
  'tech-hero': { data: TechHeroData; settings: TechHeroSettings };
  'service-detail': { data: ServiceDetailData; settings: ServiceDetailSettings };
  'repair-process': { data: RepairProcessData; settings: RepairProcessSettings };
  'logo-cloud': { data: LogoCloudData; settings: LogoCloudSettings };
};

declare module '@olonjs/core' {
  export interface SectionDataRegistry {
    'header': HeaderData;
    'footer': FooterData;
    'hero-bento': HeroBentoData;
    'services-grid': ServicesGridData;
    'history-timeline': HistoryTimelineData;
    'business-solutions': BusinessSolutionsData;
    'reviews-slider': ReviewsSliderData;
    'cta-band': CtaBandData;
    'tech-hero': TechHeroData;
    'service-detail': ServiceDetailData;
    'repair-process': RepairProcessData;
    'logo-cloud': LogoCloudData;
  }
  export interface SectionSettingsRegistry {
    'header': HeaderSettings;
    'footer': FooterSettings;
    'hero-bento': HeroBentoSettings;
    'services-grid': ServicesGridSettings;
    'history-timeline': HistoryTimelineSettings;
    'business-solutions': BusinessSolutionsSettings;
    'reviews-slider': ReviewsSliderSettings;
    'cta-band': CtaBandSettings;
    'tech-hero': TechHeroSettings;
    'service-detail': ServiceDetailSettings;
    'repair-process': RepairProcessSettings;
    'logo-cloud': LogoCloudSettings;
  }
}

export * from '@olonjs/core';
