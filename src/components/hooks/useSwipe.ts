import { useRef } from "react";

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
}

const useSwipe = ({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }: UseSwipeOptions): SwipeHandlers => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

export default useSwipe;