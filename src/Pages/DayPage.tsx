import { useState, useEffect } from 'react';
import { Activity } from '../App';
import ActivityCard from '../Components/ActivityCard';
import useSwipe from '../Hooks/useSwipe';
import useWindowSize from '../Hooks/useWindowSize';

interface Props {
    days: Activity[][];
    currDateStr: string;
    handleDateChange: (date: Date) => void;
    handleStartWorkout: () => void;
}

function DayPage(props: Props) {
    /// Carousel slider
    const [slideNum, setSlideNum] = useState<number>(1);
    const [movement, setMovement] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [WIDTH, HEIGHT] = useWindowSize();
    const [height, setHeight] = useState<number>(0);
    const minSwipeDistance = 100;

    const swipeHandlers = useSwipe({ 
        onSwipedLeft: (xLocation: number, xStart: number) => {
        }, 
        onSwipedRight: (xLocation: number, xStart: number) => {
        },
        onMove: (xLocation: number, xStart: number) => {
            const delta = xLocation - xStart;
            if (xLocation && (delta > 20 || delta < -20)) {
                setMovement(delta - (slideNum * WIDTH));
            }
        },
        onMoveEnd: (xLocation: number, xStart: number) => {
            const delta = xLocation - xStart;
            const isLeftSwipe = delta < -minSwipeDistance;
            const isRightSwipe = delta > minSwipeDistance;
            const endPosition = delta / WIDTH;
            const endPartial = endPosition % 1;
            if (isLeftSwipe) {
                transitionTo(slideNum + 1, Math.min(0.5, 1 - Math.abs(endPartial)));
            } else if (isRightSwipe) {
                transitionTo(slideNum - 1, Math.min(0.5, 1 - Math.abs(endPartial)))
            } else {
                transitionTo(slideNum, Math.min(0.5, 1 - Math.abs(endPartial)))
            }
        },
        moveElement: false
    });

    function transitionTo(index: number, duration: number) {
        setDuration(duration);
        setSlideNum(index);
        setMovement(-(index * WIDTH));
    }

    useEffect(() => {
        // Handle swiper
        setMovement(-(slideNum * WIDTH));
    }, [slideNum, WIDTH]);

    useEffect(() => {
        transitionTo(1, 0);
    }, [props.currDateStr]);

    return (
        <div className="Daily">
            <h2>YOUR DAILY RX</h2>
            <div className='SwiperContainer'>
                <div {...swipeHandlers} className='Swiper' 
                style={{
                    transform: `translateX(${movement}px)`,
                    transitionDuration: `${duration}s`,
                }}
                onTransitionEnd={() => {
                    if (slideNum !== 1) {
                        let nextDate: Date = new Date(props.currDateStr);
                        let offset = slideNum === 2 ? 1 : -1;
                        nextDate.setDate(nextDate.getDate() + offset);
                        props.handleDateChange(nextDate);
                        
                    }
                }}>
                    {
                        props.days.map((item, i) => {
                            return(item.map((activity, index) => {
                                return(
                                    <ActivityCard 
                                        setHeight={i === 1 ? setHeight : undefined}
                                        height={height}
                                        activity={activity} 
                                        handleStartWorkout={props.handleStartWorkout} 
                                        key={index}
                                    />
                                );
                            }));
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DayPage;