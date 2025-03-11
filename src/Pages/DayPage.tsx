import React from 'react';
import { Activity } from '../App';
import ActivityCard from '../Components/ActivityCard';
import useSwipe from '../Hooks/useSwipe';

interface Props {
    activities: Activity[];
    currDateStr: string;
    handleDateChange: (date: Date) => void;
    handleStartWorkout: () => void;
}

function DayPage(props: Props) {
    const swipeHandlers = useSwipe({ 
        onSwipedLeft: (xLocation: number, xStart: number) => {
            let nextDate: Date = new Date(props.currDateStr);
            nextDate.setDate(nextDate.getDate() + 1);
            props.handleDateChange(nextDate);
        }, 
        onSwipedRight: (xLocation: number, xStart: number) => {
            let prevDate: Date = new Date(props.currDateStr);
            prevDate.setDate(prevDate.getDate() - 1);
            props.handleDateChange(prevDate);
        },
        onMove: (xLocation: number, xStart: number) => {},
        onMoveEnd: (xLocation: number, xStart: number) => {},
        moveElement: true
    });

    return (
        <div className="Daily">
            <h2>YOUR DAILY RX</h2>
            <div {...swipeHandlers}>
                {props.activities.map((item, i) => {
                    return(
                        <ActivityCard activity={props.activities[i]} handleStartWorkout={props.handleStartWorkout} key={i}/>
                    );
                })}
            </div>
        </div>
    );
}

export default DayPage;