import React, { useEffect, useState } from 'react';
import useSwipe from '../Hooks/useSwipe';
import DateButton from '../Helpers/DateButton';
import { createDatesArr } from '../Helpers/DatesHelper';
import useWindowSize from '../Hooks/useWindowSize';

type Props = {
    currDateStr: string;
    handleDateChange: (date: Date) => void;
    openModal: () => void;
}

function NavBar(props: Props) {
    /// Carousel slider
    const [slideNum, setSlideNum] = useState<number>(1);
    const [movement, setMovement] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [WIDTH, HEIGHT] = useWindowSize();
    const minSwipeDistance = 100;
    const [weeks, setWeeks] = useState<Date[][]>([]);
    // Date stuff
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const swipeHandlers = useSwipe({ 
        onSwipedLeft: (xLocation: number, xStart: number) => {
        }, 
        onSwipedRight: (xLocation: number, xStart: number) => {
        },
        onMove: (xLocation: number, xStart: number) => {
            const delta = xLocation - xStart;
            if (xLocation) {
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
        setSlideNum(index);
        setMovement(-(index * WIDTH));
        setDuration(duration);
    }

    useEffect(() => {
        // Handle week
        let currDate = new Date(props.currDateStr);
        let tempStart = startDate;
        let tempEnd = endDate;
        let useCurrWeek = (startDate && endDate && (currDate >= startDate && currDate <= endDate));
        if (!useCurrWeek) {
            const dayOfWeek = currDate.getDay(); // Get the weekday (0 = Sunday, 6 = Saturday)
            const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Calculate days away from Monday (1)
            tempStart = new Date(currDate.getTime());
            tempStart.setDate(tempStart.getDate() - mondayOffset);
            // Calculate End
            tempEnd = new Date(tempStart.getTime());
            tempEnd.setDate(tempEnd.getDate() + 6);
            setStartDate(new Date(tempStart.getTime()));
            setEndDate(new Date(tempEnd.getTime()));
        }
        if ((weeks.length == 0 || !useCurrWeek) && (tempStart && tempEnd)) {
            // 3 week window
            tempStart.setDate(tempStart.getDate() - 7);
            tempEnd.setDate(tempEnd.getDate() - 7);
            let newWeeks = [];
            for (let i = 0; i < 3; i++) {
                let week = createDatesArr(tempStart, tempEnd);
                newWeeks.push(week);
                tempStart.setDate(tempStart.getDate() + 7);
                tempEnd.setDate(tempEnd.getDate() + 7);
            }
            tempStart.setDate(tempStart.getDate() - 7);
            tempEnd.setDate(tempEnd.getDate() - 7);
            setWeeks(newWeeks);
        }
    }, [props.currDateStr, slideNum, WIDTH]);

    useEffect(() => {
        // Handle swiper
        setMovement(-(slideNum * WIDTH));
    }, [slideNum, WIDTH]);

    return (
        <div className="NavBar">
            <div className='NavTop'>
                <div>
                    <h2>{new Date(props.currDateStr).toLocaleString('en-US', dateOptions)}</h2>
                </div>
                <div>
                    <div className='StreakContainer'>
                        <p>Streak: 1</p>
                    </div>
                </div>
                <div className='CalendarLinkContainer'>
                    <button className='LinkButton' onClick={props.openModal}>CALENDAR</button>
                </div>
            </div>
            <div className='SwiperContainer'>
                <div {...swipeHandlers} className='Swiper' style={{
                    transform: `translateX(${movement}px)`,
                    transitionDuration: `${duration}s`,
                }}
                onTransitionEnd={() => {
                    if (slideNum !== 1) {
                        let nextDate: Date = new Date(props.currDateStr);
                        let offset = slideNum == 2 ? 7 : -7;
                        nextDate.setDate(nextDate.getDate() + offset);
                        props.handleDateChange(nextDate);
                        transitionTo(1, 0);
                    }
                }}>
                    {
                        weeks.map((week, i) => {
                            return(<div className='NavWeek' key={i} style={{
                                width: `${WIDTH - 40}px`
                            }}>
                                {week.map((date, i) => {
                                    return(
                                        <div key={i}>
                                            { date ?
                                                <div>
                                                    <DateButton 
                                                        className={'CircleButton'}
                                                        currDateStr={props.currDateStr} 
                                                        date={date} 
                                                        handleDateChange={props.handleDateChange} 
                                                    />
                                                    <div>{date.toLocaleString('en-US', { weekday: 'narrow'})}</div>
                                                </div>
                                            : null
                                            }
                                        </div>
                                        )
                                        }
                                    )
                                }
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default NavBar;