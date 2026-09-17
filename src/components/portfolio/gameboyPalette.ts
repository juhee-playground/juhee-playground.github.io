import { TShellStyle } from '@/stores/useSettings';

/**
 * 포트폴리오 게임보이 스킨 팔레트 (3종).
 * dmg = 오리지널 셸 그레이, light = 깔끔한 오프화이트, pocket = 차콜(다크).
 * 배경/테두리는 무채색(눈 편함).
 * accent(초록이던 것들)는 pointColor에서 주입 → 팔레트에서 색을 바꾸면 액센트가 전부 함께 변함.
 */
export interface IGameBoyPalette {
  bg: string;
  panel: string;
  panel2: string;
  border: string;
  borderStrong: string;
  text: string;
  textDim: string;
  accent: string;
  accentInk: string;
  lcd: string;
  lcdInk: string;
}

type TShellBase = Pick<
  IGameBoyPalette,
  'bg' | 'panel' | 'panel2' | 'border' | 'borderStrong' | 'text' | 'textDim'
>;

const BASE_DMG: TShellBase = {
  bg: '#d8d8d1',
  panel: '#e9e9e3',
  panel2: '#f0f0ea',
  border: '#b6b6ac',
  borderStrong: '#6a6a62',
  text: '#2b2b28',
  textDim: '#74746b',
};

const BASE_LIGHT: TShellBase = {
  bg: '#f2f2ee',
  panel: '#ffffff',
  panel2: '#fafaf7',
  border: '#e2e2da',
  borderStrong: '#c2c2b8',
  text: '#23231f',
  textDim: '#7a7a70',
};

const BASE_POCKET: TShellBase = {
  bg: '#1b2029',
  panel: '#232a35',
  panel2: '#2b333f',
  border: '#333c48',
  borderStrong: '#48515f',
  text: '#e6e9ef',
  textDim: '#8b95a5',
};

const BASE_BY_SHELL: Record<TShellStyle, TShellBase> = {
  dmg: BASE_DMG,
  light: BASE_LIGHT,
  pocket: BASE_POCKET,
};

const DEFAULT_ACCENT = '#a7d94a';

/** hex 파싱 → {r,g,b}. 실패 시 null. */
const parseHex = (hex: string): { r: number; g: number; b: number } | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
};

const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

/** ratio(0~1)만큼 검정과 섞어 어둡게. LCD 배경용. */
const darken = (hex: string, ratio: number): string => {
  const c = parseHex(hex);
  if (!c) return hex;
  const f = 1 - ratio;
  return `#${toHex(c.r * f)}${toHex(c.g * f)}${toHex(c.b * f)}`;
};

/** ratio(0~1)만큼 흰색과 섞어 밝게. LCD 글자용. */
const lighten = (hex: string, ratio: number): string => {
  const c = parseHex(hex);
  if (!c) return hex;
  return `#${toHex(c.r + (255 - c.r) * ratio)}${toHex(c.g + (255 - c.g) * ratio)}${toHex(c.b + (255 - c.b) * ratio)}`;
};

/**
 * @param shellStyle 'dmg' | 'light' | 'pocket'
 * @param accent 포인트 컬러 hex (미지정 시 기본 그린).
 * LCD(스탯 카드) 배경/글자는 accent에서 파생 → 색을 바꾸면 스탯 화면도 함께 변함.
 */
export const getGameBoyPalette = (
  shellStyle: TShellStyle,
  accent: string = DEFAULT_ACCENT,
): IGameBoyPalette => {
  const base = BASE_BY_SHELL[shellStyle] ?? BASE_DMG;
  return {
    ...base,
    accent,
    accentInk: '#161a12',
    // LCD 화면 느낌: accent를 크게 어둡게 깐 배경 + 밝게 띄운 글자
    lcd: darken(accent, 0.78),
    lcdInk: lighten(accent, 0.45),
  };
};
