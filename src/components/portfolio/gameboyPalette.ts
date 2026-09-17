/**
 * 포트폴리오 게임보이 스킨 팔레트.
 * light = DMG 셸 그레이, dark = POCKET 차콜.
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

const BASE_DMG = {
  bg: '#d8d8d1',
  panel: '#e9e9e3',
  panel2: '#f0f0ea',
  border: '#b6b6ac',
  borderStrong: '#6a6a62',
  text: '#2b2b28',
  textDim: '#74746b',
  lcd: '#c2d199',
  lcdInk: '#2d321d',
};

const BASE_POCKET = {
  bg: '#1b2029',
  panel: '#232a35',
  panel2: '#2b333f',
  border: '#333c48',
  borderStrong: '#48515f',
  text: '#e6e9ef',
  textDim: '#8b95a5',
  lcd: '#3c4a2a',
  lcdInk: '#cfe89a',
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
 * @param isDark 다크(POCKET) 여부
 * @param accent 포인트 컬러 hex (미지정 시 기본 그린).
 * LCD(스탯 카드) 배경/글자는 accent에서 파생 → 색을 바꾸면 스탯 화면도 함께 변함.
 */
export const getGameBoyPalette = (isDark: boolean, accent: string = DEFAULT_ACCENT): IGameBoyPalette => {
  const base = isDark ? BASE_POCKET : BASE_DMG;
  return {
    ...base,
    accent,
    accentInk: '#161a12',
    // LCD 화면 느낌: accent를 크게 어둡게 깐 배경 + 밝게 띄운 글자
    lcd: darken(accent, 0.78),
    lcdInk: lighten(accent, 0.45),
  };
};
