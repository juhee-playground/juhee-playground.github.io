import { createPageViewTracker } from './createPageViewTracker';

describe('createPageViewTracker', () => {
  it('동일 path는 한 번만 전송한다', () => {
    const send = jest.fn();
    const track = createPageViewTracker(send);

    track('/portfolio');
    track('/portfolio');
    track('/resume');

    expect(send).toHaveBeenCalledTimes(2);
    expect(send).toHaveBeenNthCalledWith(1, '/portfolio');
    expect(send).toHaveBeenNthCalledWith(2, '/resume');
  });
});
