import { getFeaturedProjects } from './getFeaturedProjects';

type TProject = {
  readonly id: string;
  readonly isFeatured: boolean;
  readonly featuredOrder: number | null;
};

const project = (
  id: string,
  isFeatured: boolean,
  featuredOrder: number | null,
): TProject => ({ id, isFeatured, featuredOrder });

describe('getFeaturedProjects', () => {
  it('isFeatured true만 featuredOrder 오름차순으로 반환한다', () => {
    const projects = [
      project('a', true, 3),
      project('b', false, 1),
      project('c', true, 1),
      project('d', true, 2),
      project('e', true, 4),
    ];

    expect(getFeaturedProjects(projects).map(item => item.id)).toEqual(['c', 'd', 'a', 'e']);
  });

  it('featuredOrder가 null이면 뒤로 보낸다', () => {
    const projects = [
      project('a', true, null),
      project('b', true, 2),
      project('c', true, 1),
    ];

    expect(getFeaturedProjects(projects).map(item => item.id)).toEqual(['c', 'b', 'a']);
  });

  it('featured가 없으면 빈 배열을 반환한다', () => {
    const projects = [
      project('a', false, null),
      project('b', false, null),
    ];

    expect(getFeaturedProjects(projects)).toEqual([]);
  });
});
