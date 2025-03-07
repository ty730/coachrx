import {TouchEvent, useState} from "react";

interface SwipeInput {
    onSwipedLeft: () => void
    onSwipedRight: () => void
    allowDrag?: boolean
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
        if (input.allowDrag) {
            const el = (e.currentTarget as HTMLElement);
            const currentX = e.targetTouches[0].clientX;
            const deltaX = currentX - touchStart;
            let deltaXPercent = (deltaX / width) * 100;
            deltaXPercent = deltaXPercent * 0.4;
            if (deltaXPercent > 6 || deltaXPercent < -6) {
                if (deltaXPercent > 50) {
                    deltaXPercent = 50;
                }
                if (deltaXPercent < -50) {
                    deltaXPercent = -50;
                }
                (e.currentTarget as HTMLElement).style.transform = `translateX(${deltaXPercent}%)`;
                (e.currentTarget as HTMLElement).style.transition = `0.05s ease`;
            }
        }
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = (e: TouchEvent) => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (input.allowDrag) {
            (e.currentTarget as HTMLElement).style.transform = '';
            //(e.currentTarget as HTMLElement).style.transition = '';
        }
        if (isLeftSwipe) {
            input.onSwipedLeft();
        }
        if (isRightSwipe) {
            input.onSwipedRight();
        }
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}