import React, { useEffect, useState } from 'react';
import { createDatesArr } from '../Helpers/DatesHelper';
import DateButton from '../Helpers/DateButton';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

interface Props {
    onClose: () => void;
    currDateStr: string;
    handleDateChange: (date: Date) => void;
}

function Calendar(props: Props) {
    const [datesArr, setDatesArr] = useState<Date[]>([]);
    const [daysOfWeek] = useState<Date[]>(weekDayNames());
    const [month, setMonth] = useState<number>(new Date(props.currDateStr).getMonth());
    const [year, setYear] = useState<number>(new Date(props.currDateStr).getFullYear());


    useEffect(() => {
        let date = new Date(year, month, 1);
        const dayOfWeekFirst = date.getDay(); // Get the weekday (0 = Sunday, 6 = Saturday)
        date.setDate(date.getDate() - (dayOfWeekFirst === 0 ? 6 : dayOfWeekFirst - 1));
        let lastDate = new Date(year, month + 1, 0);
        const dayOfWeekLast = lastDate.getDay(); // Get the weekday (0 = Sunday, 6 = Saturday)
        lastDate.setDate(lastDate.getDate() + (dayOfWeekLast === 0 ? 0 : 7 - dayOfWeekLast));
        setDatesArr(createDatesArr(date, lastDate));
    }, [month, year]);

    function weekDayNames() {
        // For Monday - Sunday
        let date = new Date();
        const dayOfWeekFirst = date.getDay(); // Get the weekday (0 = Sunday, 6 = Saturday)
        date.setDate(date.getDate() - (dayOfWeekFirst === 0 ? 6 : dayOfWeekFirst - 1));
        const theWeek = Array.from(Array(7)).map((_, i) => {
            let tempDate = new Date(date.getTime());
            date.setDate(date.getDate() + 1);
            return tempDate;
        });
        return theWeek;
    }

    function changeDateAndClose(date: Date) {
        props.handleDateChange(date);
        props.onClose();
    }

    function changeMonth(isForward: boolean) {
      const increment = isForward ? 1 : -1;
      let date = new Date(year, month, 1);
      date.setMonth(date.getMonth() + increment);
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }

    function nextMonth() {
      changeMonth(true);
    }

    function prevMonth() {
      changeMonth(false);
    }

    return (
      <div className="Calendar">
          <div className='MonthTitle'>
            <button onClick={prevMonth}>
              <FaChevronLeft className='CalendarArrow' size={15} />
            </button>
            <h4 className='MonthName'>{new Date(year, month, 1).toLocaleDateString('en-US', { month: "long" })}</h4>
            <button onClick={nextMonth}>
              <FaChevronRight className='CalendarArrow' size={15} />
            </button>
          </div>
          <div className='Separator'></div>
          <div className='DayGrid'>
            <div className='Row'>
                {daysOfWeek.map((date, i) => {
                  return(
                    <div className='DayName' key={i} >{ date.toLocaleString('en-US', { weekday: 'short'}).toUpperCase() }</div>
                  );
                })}
            </div>
              {[...Array(Math.ceil(datesArr.length / 7))].map((e, i) => {
                  return(
                      <div className='Row' key={i}>
                          {datesArr.slice((i * 7), (i * 7) + 7).map((date, j) => {
                              return(
                                  <div key={i + '' + j}>
                                    { date.getMonth() === month ?
                                          <div>
                                              <DateButton 
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
          <div className='TodayLinkContainer'>
              <button className='LinkButton' onClick={() => { changeDateAndClose(new Date())}}>TODAY</button>
          </div>
      </div>
  );
}

export default Calendar;