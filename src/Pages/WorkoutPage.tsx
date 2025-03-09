import useSwipe from '../Hooks/useSwipe';
import { Activity, Task } from '../App';
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import { MdOutlinePlayArrow } from "react-icons/md";
import Modal from '../Helpers/Modal';
import VideoPlayer from '../Modals/VideoPlayer';

interface Props {
    activities: Activity[];
    handleCloseWorkout: () => void;
}

function WorkoutPage(props: Props) {
    const [slideNum, setSlideNum] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>();
    const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

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

    function closeModal() {
        setIsVideoOpen(false);
    }

    function openModal() {
        setIsVideoOpen(true);
    }

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
                        return(<div onClick={() => setSlideNum(i)} className={`WorkoutNavLine ${slideNum === i ? 'SelectedNavLine' : ''}`} key={i}></div>)
                    })}
                </div>
            </div>
            <div {...swipeHandlers} className='WorkoutMain'>
                { tasks &&
                    <div className='TaskDetails'>
                        <div className='WorkoutTaskTitleContainer'>
                            <h4>{tasks[slideNum].name}</h4>
                            {
                                tasks[slideNum].video &&
                                <div className='VideoLinkContainer'>
                                    <button className='VideoLink' onClick={openModal}>
                                        <MdOutlinePlayArrow size={18} /> 
                                        <p>Demo Video</p>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className='details'>
                            {tasks[slideNum].details && tasks[slideNum].details?.map((line, i) => {
                                return(
                                    <p key={i}>{line}</p>
                                );
                            })}
                        </div>
                    </div>
                }
                { tasks && (slideNum === tasks?.length - 1) &&
                    <div className='EndWorkoutWrapper'>
                        <button className='EndWorkoutButton' onClick={props.handleCloseWorkout}>FINISH WORKOUT</button>
                    </div>
                }
            </div>
            { isVideoOpen &&
                <Modal isOpen={isVideoOpen} onClose={closeModal} class={'VideoModal'}>
                    <VideoPlayer onClose={closeModal} video={tasks ? tasks[slideNum]?.video : ''} name={tasks ? tasks[slideNum].name : ''} />
                </Modal>
            }
        </div>
    );
}

export default WorkoutPage;