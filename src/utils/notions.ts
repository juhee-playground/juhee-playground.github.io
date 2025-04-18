export const getPlainText = (
  field: { rich_text?: IRichText[]; title?: IRichText[] } | undefined,
  key: 'rich_text' | 'title',
): string => {
  const list = field?.[key];
  return Array.isArray(list) && list[0]?.plain_text ? list[0].plain_text : '';
};
