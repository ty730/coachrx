import React, { useEffect, useState } from 'react';

interface Props {
    currDate: Date;
    month: number;
    year: number;
}

function Calendar(props: Props) {
    const [daysArr, setDaysArr] = useState<number[]>([]);

    useEffect(() => {
        setDaysArr(getDaysOfMonth(props.month));
      }, []);

    function getDaysOfMonth(month: number, year: number = new Date().getFullYear()): number[] {
        const firstDay = new Date(year, month, 1).getDay(); // Get the first weekday (0 = Sunday, 6 = Saturday)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month

        const startPadding = firstDay === 0 ? 6 : firstDay - 1; // Adjust so Monday (1) starts at index 0

        return [...Array(startPadding).fill(-1), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    }

    return (
      <div className="Calendar">
          {daysArr.map((item, i) => {
              return(
                  <div>
                    <div>
                      {item != -1 
                            ? item 
                            : ''}
                    </div>
                  </div>
              );
          })}
      </div>
    );
}

export default Calendar;