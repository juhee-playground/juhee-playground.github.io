import { FALLBACK_CART_THEME, getCompanyCartTheme, TCartTheme } from './companyCartTheme';

export type TDomainKey = 'sports' | 'collaboration';

export type TProjectCartTheme = TCartTheme & {
  readonly domainKey: TDomainKey | null;
  readonly domainLabel: string | null;
};

const DOMAIN_ALIASES: Record<TDomainKey, readonly string[]> = {
  sports: ['sports', 'sport', 'fitness', 'sports tech', '스포츠', '축구', '풋살'],
  collaboration: ['collaboration', 'collab', 'saas', 'productivity', '협업', '일정'],
};

const DOMAIN_LABELS: Record<TDomainKey, string> = {
  sports: 'Sports',
  collaboration: 'Collab',
};

const DOMAIN_THEMES: Record<TDomainKey, TCartTheme> = {
  sports: {
    shell: '#eceef0',
    shellBorder: '#d5d9dd',
    shellShadow: '#c5cbcf',
    labelFrom: '#b8e6d4',
    labelTo: '#8fd4b8',
    accent: '#4caf7a',
    accentSoft: '#a8dcc4',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'pitch',
  },
  collaboration: {
    shell: '#efe8f4',
    shellBorder: '#ddd0e6',
    shellShadow: '#cbbfd6',
    labelFrom: '#e4daf8',
    labelTo: '#cfc0ef',
    accent: '#9b7bb8',
    accentSoft: '#d4c4e8',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'calendar',
  },
};

const COMPANY_DOMAIN_FALLBACK: Record<string, TDomainKey> = {
  핏투게더: 'sports',
  Fitogether: 'sports',
  틴들로: 'collaboration',
};

const normalize = (value: string) => value.trim().toLowerCase();

const resolveDomainKey = (domains: readonly string[]): TDomainKey | null => {
  const names = domains.map(normalize);
  const matched = (Object.entries(DOMAIN_ALIASES) as [TDomainKey, readonly string[]][]).find(
    ([, aliases]) => names.some(name => aliases.includes(name)),
  );
  return matched?.[0] ?? null;
};

const withDomainMeta = (theme: TCartTheme, domainKey: TDomainKey | null): TProjectCartTheme => ({
  ...theme,
  domainKey,
  domainLabel: domainKey ? DOMAIN_LABELS[domainKey] : null,
});

/** 프로젝트 카드 테마: domain 색·모티프 우선 → 회사 fallback */
export const getProjectCartTheme = (
  domains: readonly string[],
  companyName = '',
): TProjectCartTheme => {
  const domainKey = resolveDomainKey(domains) ?? COMPANY_DOMAIN_FALLBACK[companyName] ?? null;
  if (domainKey) return withDomainMeta(DOMAIN_THEMES[domainKey], domainKey);
  return withDomainMeta(getCompanyCartTheme(companyName) ?? FALLBACK_CART_THEME, null);
};
