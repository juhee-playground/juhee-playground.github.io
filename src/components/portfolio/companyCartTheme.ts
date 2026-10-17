export type TCartDeco = 'calendar' | 'pitch' | 'invest';

export type TCartTheme = {
  readonly shell: string;
  readonly shellBorder: string;
  readonly shellShadow: string;
  readonly labelFrom: string;
  readonly labelTo: string;
  readonly accent: string;
  readonly accentSoft: string;
  readonly tagBg: string;
  readonly ink: string;
  readonly muted: string;
  readonly deco: TCartDeco;
};

export const COMPANY_CART_THEMES: Record<string, TCartTheme> = {
  틴들로: {
    shell: '#f3f1ea',
    shellBorder: '#ddd8ce',
    shellShadow: '#cfc9bc',
    labelFrom: '#cfeaf4',
    labelTo: '#b5dff0',
    accent: '#5ecfc4',
    accentSoft: '#a8e8e0',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'calendar',
  },
  핏투게더: {
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
  Fitogether: {
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
  와이유파트너스: {
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
    deco: 'invest',
  },
  YU파트너스: {
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
    deco: 'invest',
  },
};

export const FALLBACK_CART_THEME: TCartTheme = {
  shell: '#f3f1ea',
  shellBorder: '#ddd8ce',
  shellShadow: '#cfc9bc',
  labelFrom: '#cfeaf4',
  labelTo: '#b5dff0',
  accent: '#5ecfc4',
  accentSoft: '#a8e8e0',
  tagBg: 'rgba(255,255,255,0.72)',
  ink: '#1f2937',
  muted: '#6b7280',
  deco: 'calendar',
};

export const getCompanyCartTheme = (name: string): TCartTheme =>
  COMPANY_CART_THEMES[name] ?? FALLBACK_CART_THEME;
