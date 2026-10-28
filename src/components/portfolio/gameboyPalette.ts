import {
  COLOR_CHANNEL_MAX,
  HEX_GREEN_SHIFT,
  HEX_RADIX,
  HEX_RED_SHIFT,
} from '@/constants/color';
import { TShellStyle } from '@/stores/useSettings';

const LCD_BG_DARKEN_RATIO = 0.78;
const LCD_INK_LIGHTEN_RATIO = 0.45;

/**
 * 포트폴리오 게임보이 스킨 팔레트 (3종).
 * dmg = 오리지널 웜 올리브 셸(포인트 대비), light = 순백/고스트, pocket = 차콜.
 * accent는 pointColor에서 주입 → 팔레트에서 색을 바꾸면 액센트가 전부 함께 변함.
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
  /** 글자/링크용. 라이트·다크 모두 같은 accent */
  accentText: string;
  accentInk: string;
  lcd: string;
  lcdInk: string;
}

type TShellBase = Pick<
  IGameBoyPalette,
  'bg' | 'panel' | 'panel2' | 'border' | 'borderStrong' | 'text' | 'textDim'
>;

const BASE_DMG: TShellBase = {
  bg: '#d2d1c4',
  panel: '#e2e1d6',
  panel2: '#ebeae0',
  border: '#b4b3a4',
  borderStrong: '#6a695e',
  text: '#2b2b28',
  textDim: '#6e6d62',
};

const BASE_LIGHT: TShellBase = {
  bg: '#ffffff',
  panel: '#f7f8fb',
  panel2: '#eef0f4',
  border: '#e4e7ee',
  borderStrong: '#c8ced8',
  text: '#1a1d24',
  textDim: '#8a91a0',
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

const DEFAULT_ACCENT = '#3b9eff';

/** hex 파싱 → {r,g,b}. 실패 시 null. */
const parseHex = (hex: string): { r: number; g: number; b: number } | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], HEX_RADIX);
  return {
    r: (int >> HEX_RED_SHIFT) & COLOR_CHANNEL_MAX,
    g: (int >> HEX_GREEN_SHIFT) & COLOR_CHANNEL_MAX,
    b: int & COLOR_CHANNEL_MAX,
  };
};

const toHex = (n: number) =>
  Math.max(0, Math.min(COLOR_CHANNEL_MAX, Math.round(n)))
    .toString(HEX_RADIX)
    .padStart(2, '0');

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
  return `#${toHex(c.r + (COLOR_CHANNEL_MAX - c.r) * ratio)}${toHex(c.g + (COLOR_CHANNEL_MAX - c.g) * ratio)}${toHex(c.b + (COLOR_CHANNEL_MAX - c.b) * ratio)}`;
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
  const accentText = accent;
  return {
    ...base,
    accent,
    accentText,
    accentInk: '#161a12',
    // LCD 화면 느낌: accent를 크게 어둡게 깐 배경 + 밝게 띄운 글자
    lcd: darken(accent, LCD_BG_DARKEN_RATIO),
    lcdInk: lighten(accent, LCD_INK_LIGHTEN_RATIO),
  };
};
