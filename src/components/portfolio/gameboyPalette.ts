/**
 * 포트폴리오 게임보이 스킨 팔레트.
 * light = DMG 셸 그레이, dark = POCKET 차콜.
 * 배경/테두리는 무채색(눈 편함), 초록은 커서·hover·스탯 액센트로만.
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

const DMG: IGameBoyPalette = {
  bg: '#d8d8d1',
  panel: '#e9e9e3',
  panel2: '#f0f0ea',
  border: '#b6b6ac',
  borderStrong: '#6a6a62',
  text: '#2b2b28',
  textDim: '#74746b',
  accent: '#5a7a2f',
  accentInk: '#e9f7c9',
  lcd: '#c2d199',
  lcdInk: '#2d321d',
};

const POCKET: IGameBoyPalette = {
  bg: '#1b2029',
  panel: '#232a35',
  panel2: '#2b333f',
  border: '#333c48',
  borderStrong: '#48515f',
  text: '#e6e9ef',
  textDim: '#8b95a5',
  accent: '#a7d94a',
  accentInk: '#161a12',
  lcd: '#3c4a2a',
  lcdInk: '#cfe89a',
};

export const getGameBoyPalette = (isDark: boolean): IGameBoyPalette => (isDark ? POCKET : DMG);
