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
          let tempData: Activity[] = [{
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
          setActivities(tempData);
      }
    }, [data, dateStr]);

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
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <Calendar onClose={closeModal} currDateStr={dateStr} handleDateChange={handleDateChange} />
                    </Modal>
                  }
              </div>
          }
      </div>
    );
}

export default App;
