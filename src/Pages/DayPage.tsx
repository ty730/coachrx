import React from 'react';
import { Activity } from '../App';
import ActivityCard from '../Components/ActivityCard';

interface Props {
    activities: Activity[];
}

function DayPage(props: Props) {
  return (
    <div className="Daily">
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