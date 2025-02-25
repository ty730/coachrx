import React, { useEffect, useState } from 'react';
import useSwipe from '../Hooks/useSwipe';

type Props = {
    currDateStr: string;
    handleDateChange: (date: Date) => void;
}

function NavBar(props: Props) {
    const [weekArr, setWeekArr] = useState<Date[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
    const swipeHandlers = useSwipe({ 
        onSwipedLeft: () => {
            let nextDate: Date = new Date(props.currDateStr);
            nextDate.setDate(nextDate.getDate() + 7);
            props.handleDateChange(nextDate);
            console.log(nextDate.toLocaleDateString('en-US'));
        }, 
        onSwipedRight: () => {
            let prevDate: Date = new Date(props.currDateStr);
            prevDate.setDate(prevDate.getDate() - 7);
            props.handleDateChange(prevDate);
            console.log(prevDate.toLocaleDateString('en-US'));
        }
    });

    useEffect(() => {
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
        }
        if ((weekArr.length == 0 || !useCurrWeek) && (tempStart && tempEnd)) {
            createWeekArr(tempStart, tempEnd);
        }
        setStartDate(tempStart);
        setEndDate(tempEnd);
      }, [props.currDateStr]);
    
    function createWeekArr(start: Date, end: Date) {
        let date = start;
        let week = [];
        while (date <= end) {
            week.push(new Date(date.getTime()))
            date.setDate(date.getDate() + 1);
        }
        setWeekArr(week);
    }

    return (
        <div {...swipeHandlers} className="NavBar">
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
                    <button className='LinkButton'>CALENDAR</button>
                </div>
            </div>
            <div className='NavWeek'>
                {weekArr.map((date) => {
                    return(
                        <div>
                            <button className={`CircleButton ${new Date(props.currDateStr).getDate() == date.getDate() ? 'Today' : ''}`}
                                    onClick={() => props.handleDateChange(date)}
                            >
                                <div></div>
                                <div>{date.getDate()}</div>
                            </button>
                            <div>{date.toLocaleString('en-US', { weekday: 'narrow'})}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NavBar;