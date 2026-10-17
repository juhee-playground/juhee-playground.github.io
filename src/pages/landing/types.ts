export const PORTFOLIO_STATE = {
  BOOT: 'BOOT',
  START: 'START',
  MENU: 'MENU',
  PLAYER: 'PLAYER',
  CAREER: 'CAREER',
  PROJECTS: 'PROJECTS',
} as const;

export type TPortfolioState = (typeof PORTFOLIO_STATE)[keyof typeof PORTFOLIO_STATE];

export type TPowerState = 'on' | 'off' | 'powering-on' | 'powering-off';
