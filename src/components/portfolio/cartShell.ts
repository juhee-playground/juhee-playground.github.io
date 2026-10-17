/**
 * 회사/프로젝트 카트리지 공통 플라스틱 셸
 * body = 본체면 / edgeHi·Lo = 베벨 / well = 라벨 우물
 */
export const CART_SHELL = {
  dmg: {
    body: '#b8b6a8',
    bodyHi: '#cac8ba',
    edgeHi: '#dddcd0',
    edgeLo: '#7a786c',
    well: '#8e8c80',
    step: '#6a685c',
    ink: '#2b2b24',
    muted: '#5c5a50',
  },
  light: {
    body: '#c5cad3',
    bodyHi: '#d5dae3',
    edgeHi: '#eef1f6',
    edgeLo: '#8a919c',
    well: '#9aa3b0',
    step: '#7a8490',
    ink: '#1a1d24',
    muted: '#5a6270',
  },
  pocket: {
    body: '#2a2e36',
    bodyHi: '#353a44',
    edgeHi: '#4a515c',
    edgeLo: '#0c0e12',
    well: '#14171d',
    step: '#050608',
    ink: '#e6e9ef',
    muted: '#8b95a5',
  },
} as const;

export type TCartShell = (typeof CART_SHELL)[keyof typeof CART_SHELL];
