/** 동일 path 중복 전송을 막는 순수 트래커 */
export const createPageViewTracker = (send: (path: string) => void) => {
  let lastPath: string | null = null;

  return (path: string) => {
    if (lastPath === path) return;
    lastPath = path;
    send(path);
  };
};
