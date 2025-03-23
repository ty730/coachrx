import { useEffect, useRef } from 'react';
import { Activity } from '../App';
import useWindowSize from '../Hooks/useWindowSize';

interface Props {
    activity: Activity;
    handleStartWorkout: () => void;
    setHeight?: (height: number) => void;
    height: number;
}

function ActivityCard(props: Props) {
    const [WIDTH, HEIGHT] = useWindowSize();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            if (props.setHeight !== undefined) {
                props.setHeight(ref.current.clientHeight);
            }
        }
    }, [HEIGHT, props.activity]);

    return (
        <div className="ActivityCard" 
            ref={ref}
            style={{
                width: `${WIDTH - 62}px`,
                height: `${props.height && (props.setHeight == undefined) ? props.height + 'px' : '100%'}`
            }}
        >
            <h3>{props.activity.name}</h3>
            <button className='EditButton' onClick={props.handleStartWorkout}>START WORKOUT</button>
            <div className='TasksContainer'>
                {props.activity.tasks && props.activity.tasks.map((task, i) => {
                    return(
                        <div className='TaskDetails' key={i}>
                            <h4>{task.name}</h4>
                            <div className='details'>
                                {task.details && task.details.map((line, i) => {
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