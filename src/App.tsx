import React, { useEffect, useState, ChangeEvent } from 'react';
import './App.css';
import Header from './Components/Header';
import DayPage from './Pages/DayPage';
import Data from './Data/data.json';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

export type Task = {
    name?: string;
    details?: string[];
    comments?: string[];
}

export type Activity = {
    name?: string;
    tasks?: Task[];
}

export type ActivitiesObject = {
  activities: Activity[];
}

export type DataType = {
    [key: string]: ActivitiesObject;
}

function App() {
    const [dateStr, setDateStr] = useState<string>(new Date().toLocaleDateString('en-us'));
    const [day, setDay] = useState<Date>(new Date());
    const [activities, setActivities] = useState<Activity[]>([]);
    const [data, setData] = useState<DataType>({});

    function handleDateChange(date: Date) {
      setDateStr(date.toLocaleDateString('en-us'));
    }

    useEffect(() => {
      setData(Data);
    }, []);

    useEffect(() => {
      setDay(new Date(dateStr));
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
        <Header />
        <div className='Main'>
          <NavBar currDateStr={dateStr} handleDateChange={handleDateChange}/>
          <DayPage activities={ activities } />
        </div>
        <Footer />
      </div>
    );
}

export default App;
