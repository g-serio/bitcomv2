import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroBentoComponent } from '@/components/hero-bento';
import { ServicesGridComponent } from '@/components/services-grid';
import { HistoryTimelineComponent } from '@/components/history-timeline';
import { BusinessSolutionsComponent } from '@/components/business-solutions';
import { ReviewsSliderComponent } from '@/components/reviews-slider';
import { CtaBandComponent } from '@/components/cta-band';
import { TechHero } from '@/components/tech-hero';
import { ServiceDetail } from '@/components/service-detail';
import { RepairProcess } from '@/components/repair-process';
import { LogoCloudComponent } from '@/components/logo-cloud';

import type { SectionType } from '@olonjs/core';
import type { SectionComponentPropsMap } from '@/types';

export const ComponentRegistry: {
  [K in SectionType]: React.FC<SectionComponentPropsMap[K]>;
} = {
  'header': Header,
  'footer': Footer,
  'hero-bento': HeroBentoComponent,
  'services-grid': ServicesGridComponent,
  'history-timeline': HistoryTimelineComponent,
  'business-solutions': BusinessSolutionsComponent,
  'reviews-slider': ReviewsSliderComponent,
  'cta-band': CtaBandComponent,
  'tech-hero': TechHero,
  'service-detail': ServiceDetail,
  'repair-process': RepairProcess,
  'logo-cloud': LogoCloudComponent,
};
