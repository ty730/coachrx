import useSwipe from '../Hooks/useSwipe';
import { Activity } from '../App';

interface Props {
    activities: Activity[];
}

function WorkoutPage(props: Props) {
    const swipeHandlers = useSwipe({ 
        onSwipedLeft: () => {
        }, 
        onSwipedRight: () => {
        }
    });

    return (
        <div {...swipeHandlers} className="Workout">
            <div className='WorkoutTop'>
                <button className='ExitButton'>EXIT</button>
            </div>
            <div className='WorkoutNav'>
                <div className='WorkoutProgress'></div>
            </div>
            <div className='WorkoutMain'>
                {}
            </div>
        </div>
    );
}

export default WorkoutPage;