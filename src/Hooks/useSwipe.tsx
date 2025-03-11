import {TouchEvent, useState} from "react";

interface SwipeInput {
    onSwipedLeft: (xLocation: number, xStart: number) => void
    onSwipedRight: (xLocation: number, xStart: number) => void
    onMove: (xLocation: number, xStart: number) => void
    onMoveEnd: (xLocation: number, xStart: number) => void
    moveElement?: boolean
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void
    onTouchMove: (e: TouchEvent) => void
    onTouchEnd: (e: TouchEvent) => void
}

export default (input: SwipeInput): SwipeOutput => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [width, setWidth] = useState<number>(0);

    const minSwipeDistance = 100;

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
        setWidth((e.currentTarget as HTMLElement).getBoundingClientRect().width);
    }

    const onTouchMove = (e: TouchEvent) => {
        const el = (e.currentTarget as HTMLElement);
        const currentX = e.targetTouches[0].clientX;
        const deltaX = currentX - touchStart;
        if (input.moveElement) {
            let deltaXPercent = (deltaX / width) * 100;
            deltaXPercent = deltaXPercent * 0.4;
            if (deltaXPercent > 6 || deltaXPercent < -6) {
                if (deltaXPercent > 50) {
                    deltaXPercent = 50;
                }
                if (deltaXPercent < -50) {
                    deltaXPercent = -50;
                }
                el.style.transform = `translateX(${deltaXPercent}%)`;
                el.style.transition = `0.05s ease`;
            }
        }
        input.onMove(currentX, touchStart);
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = (e: TouchEvent) => {
        if (!touchStart || !touchEnd) return;
        const el = e.currentTarget as HTMLElement;
        const distance = touchEnd - touchStart;
        const isLeftSwipe = distance < -minSwipeDistance;
        const isRightSwipe = distance > minSwipeDistance;
        if (input.moveElement) {
            el.style.transform = '';
            el.style.transition = '';
        }
        if (isLeftSwipe) {
            input.onSwipedLeft(touchEnd, touchStart);
        }
        if (isRightSwipe) {
            input.onSwipedRight(touchEnd, touchStart);
        }
        input.onMoveEnd(touchEnd, touchStart);
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}