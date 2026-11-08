import type { TSearchColumnId } from './columns';

export const reorderColumns = (
  columnIds: readonly TSearchColumnId[],
  fromId: TSearchColumnId,
  toId: TSearchColumnId,
): readonly TSearchColumnId[] => {
  if (fromId === toId || fromId === 'name' || toId === 'name') {
    return columnIds;
  }

  const next = [...columnIds];
  const fromIndex = next.indexOf(fromId);
  const toIndex = next.indexOf(toId);
  if (fromIndex < 0 || toIndex < 0) {
    return columnIds;
  }

  next.splice(fromIndex, 1);
  next.splice(toIndex, 0, fromId);

  const withoutName = next.filter(id => id !== 'name');
  return ['name', ...withoutName];
};
