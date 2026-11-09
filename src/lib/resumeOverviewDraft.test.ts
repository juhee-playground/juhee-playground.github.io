import {
  clearOverviewDraft,
  getDefaultOverviewDraft,
  isSameOverviewDraft,
  readOverviewDraft,
  writeOverviewDraft,
} from './resumeOverviewDraft';

describe('resumeOverviewDraft', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('기본 Overview draft를 반환한다', () => {
    const draft = getDefaultOverviewDraft();
    expect(draft.title).toBeTruthy();
    expect(draft.summary).toBeTruthy();
    expect(draft.items.length).toBeGreaterThan(0);
  });

  it('sessionStorage에 저장하고 복구한다', () => {
    const draft = {
      ...getDefaultOverviewDraft(),
      title: 'Temporary Title',
    };
    writeOverviewDraft(draft);
    expect(readOverviewDraft()?.title).toBe('Temporary Title');
  });

  it('초기화 시 sessionStorage를 비운다', () => {
    writeOverviewDraft(getDefaultOverviewDraft());
    clearOverviewDraft();
    expect(readOverviewDraft()).toBeNull();
  });

  it('동일 draft 여부를 비교한다', () => {
    const a = getDefaultOverviewDraft();
    const b = getDefaultOverviewDraft();
    expect(isSameOverviewDraft(a, b)).toBe(true);
    expect(isSameOverviewDraft(a, { ...b, title: 'Other' })).toBe(false);
  });
});
