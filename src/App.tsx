import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import DayPage from './Pages/DayPage';
import Data from './Data/data.json';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import Modal from './Helpers/Modal';
import Calendar from './Modals/Calendar';
import WorkoutPage from './Pages/WorkoutPage';

export type Task = {
    name?: string;
    video?: string;
    details?: string[];
    comments?: string[];
}

export type Activity = {
    name?: string;
    tasks?: Task[];
    warmup?: string[]
}

export type ActivitiesObject = {
  activities: Activity[];
}

export type DataType = {
    [key: string]: ActivitiesObject;
}

function App() {
    const [dateStr, setDateStr] = useState<string>(new Date().toLocaleDateString('en-us'));
    const [activities, setActivities] = useState<Activity[]>([]);
    const [data, setData] = useState<DataType>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inWorkout, setInWorkout] = useState(false);

    function handleDateChange(date: Date) {
      setDateStr(date.toLocaleDateString('en-us'));
    }

    function closeModal() {
      setIsModalOpen(false);
    }

    function openModal() {
      setIsModalOpen(true);
    }

    function openWorkout() {
      setInWorkout(true);
    }

    function closeWorkout() {
      setInWorkout(false);
    }

    useEffect(() => {
      setData(Data);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    useEffect(() => {
      if (dateStr in data) {
          setActivities(data[dateStr as keyof typeof Data]['activities']);
      } else {
          let tempActivity: Activity[] = [{
              "name": "Rest Day",
              "tasks": [
                  {
                      "name": "It's a rest day!",
                      "details": [
                          "Get outside, move, and enjoy some active recovery."
                      ]
                  }
              ]
          }];
          const overallEnd = new Date("3/2/2025");
          const currDate = new Date(dateStr);
          if (currDate > overallEnd) {
              const overallStart = new Date("11/25/2024");
              let dateToUse = calculateDateToUse(currDate, overallStart, overallEnd);
              let tempDateStr = dateToUse.toLocaleDateString('en-US');
              if (tempDateStr in data) {
                  let activityOnDate = data[tempDateStr as keyof typeof Data]['activities'];

              }
          }
          setActivities(tempActivity);
      }
    }, [data, dateStr]);

    function calculateDateToUse(currDate: Date, overallStart: Date, overallEnd: Date) {
        const exerciseDays = dateDiff(overallStart, overallEnd) - dateDiff(new Date("2/3/2025"), new Date("2/9/2025"));
        let offset = (dateDiff(overallEnd, currDate) - 1) % exerciseDays;
        let dateToUse = new Date(overallStart.getTime());
        dateToUse.setDate(dateToUse.getDate() + offset);
        if (dateToUse >= new Date("2/3/2025")) {
            dateToUse.setDate(dateToUse.getDate() + 7);
        }
        return dateToUse;
    }

    function dateDiff(date1: Date, date2: Date) {
        // Calculating the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();
        // Calculating the no. of days between two dates
        let differenceInDays = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        return differenceInDays
    }

    function isHoliday(date: Activity) {
      
      return false;
    }

    return (
      <div className="App">
          {
              inWorkout ?
              <WorkoutPage activities={ activities } handleCloseWorkout={closeWorkout} />
              :
              <div>
                  <Header />
                  <div className='Main'>
                    <NavBar currDateStr={dateStr} handleDateChange={handleDateChange} openModal={openModal} />
                    <DayPage 
                        activities={ activities } 
                        currDateStr={dateStr} 
                        handleDateChange={handleDateChange} 
                        handleStartWorkout={openWorkout}
                    />
                  </div>
                  <Footer />
                  { isModalOpen &&
                    <Modal isOpen={isModalOpen} onClose={closeModal} class={'CalendarModal'}>
                      <Calendar onClose={closeModal} currDateStr={dateStr} handleDateChange={handleDateChange} />
                    </Modal>
                  }
              </div>
          }
      </div>
    );
}

export default App;
