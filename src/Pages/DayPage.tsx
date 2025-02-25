import React from 'react';
import { Activity } from '../App';
import ActivityCard from '../Components/ActivityCard';
import useSwipe from '../Hooks/useSwipe';

interface Props {
    activities: Activity[];
    currDateStr: string;
    handleDateChange: (date: Date) => void;
}

function DayPage(props: Props) {
    const swipeHandlers = useSwipe({ 
        onSwipedLeft: () => {
            let nextDate: Date = new Date(props.currDateStr);
            nextDate.setDate(nextDate.getDate() + 1);
            props.handleDateChange(nextDate);
            console.log(nextDate.toLocaleDateString('en-US'));
        }, 
        onSwipedRight: () => {
            let prevDate: Date = new Date(props.currDateStr);
            prevDate.setDate(prevDate.getDate() - 1);
            props.handleDateChange(prevDate);
            console.log(prevDate.toLocaleDateString('en-US'));
        }
    });

    return (
        <div {...swipeHandlers} className="Daily">
            <h2>YOUR DAILY RX</h2>
            {props.activities.map((item, i) => {
                return(
                    <ActivityCard activity={props.activities[i]}/>
                );
            })}
        </div>
    );
}

export default DayPage;