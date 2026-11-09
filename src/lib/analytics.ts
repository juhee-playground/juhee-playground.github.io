import { createPageViewTracker } from '@/utils/createPageViewTracker';

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let isInitialized = false;

export const getGaMeasurementId = () => MEASUREMENT_ID || null;

export const isAnalyticsEnabled = () => Boolean(MEASUREMENT_ID);

const ensureGtag = () => {
  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag === 'function') return;

  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
};

const sendPageView = (path: string) => {
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

let trackDedupedPageView = createPageViewTracker(sendPageView);

/** GA4 스크립트를 한 번만 로드하고 자동 page_view는 끈다 (SPA에서 수동 전송). */
export const initAnalytics = (): void => {
  if (!MEASUREMENT_ID || isInitialized || typeof window === 'undefined') return;

  ensureGtag();
  isInitialized = true;

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

/** 동일 path 중복 page_view를 막고 수동으로 페이지 방문 이벤트를 보낸다. */
export const trackPageView = (path: string): void => {
  if (!MEASUREMENT_ID || !isInitialized) return;
  trackDedupedPageView(path);
};

/** 테스트용: 추적 상태 초기화 */
export const resetAnalyticsForTest = (): void => {
  isInitialized = false;
  trackDedupedPageView = createPageViewTracker(sendPageView);
};
