import { useEffect, useRef } from 'react';

export const useTableDragScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('a, button, input, label')) return;

      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      scrollLeft = node.scrollLeft;
      scrollTop = node.scrollTop;
      node.setPointerCapture(event.pointerId);
      node.style.cursor = 'grabbing';
      node.style.userSelect = 'none';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      node.scrollLeft = scrollLeft - (event.clientX - startX);
      node.scrollTop = scrollTop - (event.clientY - startY);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      node.releasePointerCapture(event.pointerId);
      node.style.cursor = 'grab';
      node.style.userSelect = '';
    };

    node.style.cursor = 'grab';
    node.addEventListener('pointerdown', handlePointerDown);
    node.addEventListener('pointermove', handlePointerMove);
    node.addEventListener('pointerup', handlePointerUp);
    node.addEventListener('pointercancel', handlePointerUp);

    return () => {
      node.removeEventListener('pointerdown', handlePointerDown);
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerup', handlePointerUp);
      node.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return containerRef;
};
