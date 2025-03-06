import useSwipe from '../Hooks/useSwipe';
import { Activity, Task } from '../App';
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';

interface Props {
    activities: Activity[];
    handleCloseWorkout: () => void;
}

function WorkoutPage(props: Props) {
    const [slideNum, setSlideNum] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>();

    useEffect(() => {
        let newTasks: Task[] = [];
        if (props.activities[0].tasks) {
            newTasks = [...props.activities[0].tasks];
        }
        if (props.activities[0].warmup) {
            newTasks.splice(0, 0, { name: 'Warmup', details: props.activities[0].warmup });
        }
        setTasks(newTasks);
    }, []);

    useEffect(() => {
        let newTasks: Task[] = [];
        if (props.activities[0].tasks) {
            newTasks = [...props.activities[0].tasks];
        }
        if (props.activities[0].warmup) {
            newTasks.splice(0, 0, { name: 'Warmup', details: props.activities[0].warmup });
        }
        setTasks(newTasks);
    }, []);

    const swipeHandlers = useSwipe({ 
        onSwipedLeft: () => {
            if (tasks && slideNum + 1 < tasks.length) {
                setSlideNum(slideNum + 1);
            }
        }, 
        onSwipedRight: () => {
            if (tasks && slideNum - 1 >= 0) {
                setSlideNum(slideNum - 1);
            }
        },
        allowDrag: true
    });

    return (
        <div className="Workout">
            <div className='WorkoutTop'>
                <button className='ExitButton' onClick={props.handleCloseWorkout}>
                    <p>EXIT</p>
                    <IoIosClose className='CloseX' size={32}/>
                </button>
            </div>
            <div className='WorkoutNav'>
                <div className='WorkoutProgress'>
                    {tasks?.map((_, i) => {
                        return(<div className={`WorkoutNavLine ${slideNum === i ? 'SelectedNavLine' : ''}`} key={i}></div>)
                    })}
                </div>
            </div>
            <div {...swipeHandlers} className='WorkoutMain'>
                { tasks &&
                    <div className='TaskDetails'>
                        <h4>{tasks[slideNum].name}</h4>
                        <div className='details'>
                            {tasks[slideNum].details && tasks[slideNum].details?.map((line, i) => {
                                return(
                                    <p key={i}>{line}</p>
                                );
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default WorkoutPage;