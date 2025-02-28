import React, { useEffect, useState } from 'react';
import { createDatesArr } from '../Helpers/DatesHelper';
import DateButton from '../Helpers/DateButton';
import { JSX } from 'react';

interface Props {
    onClose: () => void;
    currDateStr: string;
    handleDateChange: (date: Date) => void;
}

function Calendar(props: Props) {
    const [datesArr, setDatesArr] = useState<Date[]>([]);
    const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);
    const [month, setMonth] = useState<number>(new Date(props.currDateStr).getMonth());
    const [year, setYear] = useState<number>(new Date(props.currDateStr).getFullYear());
    const [jsxArr, setJsxArr] = useState<JSX.Element>();


    useEffect(() => {
        let date = new Date(year, month, 1);
        const dayOfWeekFirst = date.getDay(); // Get the weekday (0 = Sunday, 6 = Saturday)
        date.setDate(date.getDate() - (dayOfWeekFirst === 0 ? 6 : dayOfWeekFirst - 1));
        let lastDate = new Date(year, month + 1, 0);
        const dayOfWeekLast = lastDate.getDay(); // Get the weekday (0 = Sunday, 6 = Saturday)
        lastDate.setDate(lastDate.getDate() + (dayOfWeekLast === 0 ? 0 : 7 - dayOfWeekLast));
        console.log('first: ' + date.toLocaleDateString('en-US'))
        console.log('last: ' + lastDate.toLocaleDateString('en-US'))
        setDatesArr(createDatesArr(date, lastDate));


        // For Monday - Sunday
        const theWeek = Array.from(Array(7)).map((_, i) => {
          let tempDate = new Date(date.getTime());
          date.setDate(date.getDate() + 1);
          return tempDate;
        });
        setDaysOfWeek(theWeek);
    }, []);

    function changeDateAndClose(date: Date) {
        props.handleDateChange(date);
        props.onClose();
    }

    return (
      <div className="Calendar">
          <div className='MonthTitle'>{new Date(year, month, 1).toLocaleDateString('en-US', { month: "long" })}</div>
          <div className='Separator'></div>
          <div className='DayGrid'>
            <div className='Row'>
                {daysOfWeek.map((date, i) => {
                  return(
                    <div className='DayName'>{ date.toLocaleString('en-US', { weekday: 'short'}).toUpperCase() }</div>
                  );
                })}
            </div>
              {[...Array(Math.ceil(datesArr.length / 7))].map((e, i) => {
                  return(
                      <div className='Row'>
                          {datesArr.slice((i * 7), (i * 7) + 7).map((date, j) => {
                              return(
                                  <div>
                                    { date.getMonth() == month ?
                                          <div>
                                              <DateButton 
                                                  key={j}
                                                  className={'CalendarDate'}
                                                  currDateStr={props.currDateStr} 
                                                  date={date} 
                                                  handleDateChange={changeDateAndClose} 
                                              />
                                          </div>
                                      : <div className='EmptyDiv'></div>
                                    }
                                  </div>
                              );
                          })}
                      </div>
                  );
              })}
          </div>
      </div>
  );
}

export default Calendar;