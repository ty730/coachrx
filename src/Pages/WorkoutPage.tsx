import useSwipe from '../Hooks/useSwipe';
import { Activity, Task } from '../App';
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import { MdOutlinePlayArrow } from "react-icons/md";
import Modal from '../Helpers/Modal';
import VideoPlayer from '../Modals/VideoPlayer';
import useWindowSize from '../Hooks/useWindowSize';

interface Props {
    activities: Activity[];
    handleCloseWorkout: () => void;
}

function WorkoutPage(props: Props) {
    const [slideNum, setSlideNum] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>();
    const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
    const [movement, setMovement] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0.1);
    const [WIDTH, HEIGHT] = useWindowSize();
    const minSwipeDistance = 80;

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
            if (isLeftSwipe && tasks && slideNum + 1 < tasks.length) {
                transitionTo(slideNum + 1, Math.min(0.5, 1 - Math.abs(endPartial)));
            } else if (isRightSwipe && tasks && slideNum - 1 >= 0) {
                transitionTo(slideNum - 1, Math.min(0.5, 1 - Math.abs(endPartial)))
            } else {
                transitionTo(slideNum, Math.min(0.5, 1 - Math.abs(endPartial)))
            }
        },
        moveElement: false
    });

    function closeModal() {
        setIsVideoOpen(false);
    }

    function openModal() {
        setIsVideoOpen(true);
    }

    function transitionTo(index: number, duration: number) {
        setSlideNum(index);
        setMovement(-(index * WIDTH));
        setDuration(duration);
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
                <div className='Swiper' style={{
                    transform: `translateX(${movement}px)`,
                    transitionDuration: `${duration === 0 ? 0.1 : duration}s`,
                }}
                onTransitionEnd={() => {
                    setDuration(0);
                }}>
                    { tasks && tasks.map((task, i) => {
                        return(
                            <div className='SlideDetails' key={i} style={{
                                width: `${WIDTH - 40}px`
                            }}>
                                <div className='WorkoutTaskTitleContainer'>
                                    <h4>{task.name}</h4>
                                    {
                                        task.video &&
                                        <div className='VideoLinkContainer'>
                                            <button className='VideoLink' onClick={openModal}>
                                                <MdOutlinePlayArrow size={18} /> 
                                                <p>Demo Video</p>
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className='details'>
                                    {task.details && task.details?.map((line, j) => {
                                        return(
                                            <p key={j}>{line}</p>
                                        );
                                    })}
                                </div>
                            </div>);
                        }) 
                    }
                </div>
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