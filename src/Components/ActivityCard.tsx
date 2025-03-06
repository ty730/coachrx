import React from 'react';
import { Activity, Task } from '../App';

interface Props {
    activity: Activity;
    handleStartWorkout: () => void;
}

function ActivityCard(props: Props) {
  return (
    <div className="ActivityCard">
        <h3>{props.activity.name}</h3>
        <button className='EditButton' onClick={props.handleStartWorkout}>EDIT WORKOUT</button>
        <div className='TasksContainer'>
            {props.activity.tasks && props.activity.tasks.map((task, i) => {
                return(
                    <div className='TaskDetails'>
                        <h4>{task.name}</h4>
                        <div className='details'>
                            {task.details && task.details.map((line, i) => {
                                return(
                                    <p key={i}>{line}</p>
                                );
                            })}
                        </div>
                        <div className='comments'>
                            {task.comments && task.comments.map((line, i) => {
                                return(
                                    <p key={i}>{line}</p>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
        <div className='CommentButtonContainer'>
            <div className='Separator'></div>
            <button className='CommentButton'>COMMENTS</button>
        </div>
    </div>
  );
}

export default ActivityCard;