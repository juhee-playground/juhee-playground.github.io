import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { initAnalytics, isAnalyticsEnabled, trackPageView } from '@/lib/analytics';

/** 라우트 변경 시 GA4 page_view를 전송한다. */
export const useAnalyticsPageView = (): void => {
  const location = useLocation();

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    initAnalytics();
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location.pathname, location.search, location.hash]);
};
