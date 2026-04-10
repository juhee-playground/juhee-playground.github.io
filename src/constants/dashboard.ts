export const STACK_COLORS = {
    vue: 'hsl(153.5, 40%, 70%)',
    react: 'hsl(188.98, 60%, 70%)',
    php: 'hsl(235.93, 35%, 70%)',
  };
  
  // 회사별 타임라인 색상 (주요 기술 스택 기준)
  export const COMPANY_COLORS: Record<string, string> = {
    'YU파트너스': STACK_COLORS.php,
    'Fitogether': STACK_COLORS.vue,
    '틴들로':      STACK_COLORS.react,
  };
  