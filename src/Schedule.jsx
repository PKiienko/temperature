import { useState, useEffect } from 'react';
import './Schedule.css';

const Schedule = () => {
  const getCurrentFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [sheetData, setSheetData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentFormattedDate());
  const [isScheduleShowing, setIsScheduleShowing] = useState(false);

  const selectedDateChangeHandler = (event) => {
    setSelectedDate(event.target.value);
    console.log(event.target.value);
  };

  const openSchedule = () => {
    setIsScheduleShowing(true);
  };
  const closeSchedule = () => {
    setIsScheduleShowing(false);
  };

  const formatDateForComparison = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  };

  const findGuardForDate = (date) => {
    const formattedSelectedDate = formatDateForComparison(date);
    return sheetData.find((item) => item.date === formattedSelectedDate);
  };

  const selectedGuard = findGuardForDate(selectedDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spreadsheetId = '1uDn-1mW2vWBc3N7QHL9QvKUaqMvqvzkl30S002czNAM';
        const range = 'A1:B61';
        const apiKey = 'AIzaSyB517xVXFnOeOsLkeEPXBTJzQx6RIitG2M';

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
        );
        const data = await response.json();

        if (data.values) {
          const transformedData = data.values.map((row) => {
            return {
              date: row[0],
              guard: row[1],
            };
          });
          setSheetData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='guard-and-date-info'>
        <input
          type='date'
          className='guard-date-input'
          value={selectedDate}
          onChange={selectedDateChangeHandler}
        />
        {selectedGuard ? (
          <p>{` - ${selectedGuard.guard}`}</p>
        ) : (
          // <p>{`Guard for ${selectedDate}, ${getDayOfWeek(selectedDate)}: ${selectedGuard.guard}`}</p>
          <p>No data for this date.</p>
        )}
      </div>
      {isScheduleShowing ? (
        <button className='close-schedule-btn' onClick={() => closeSchedule()}>
          Сховати весь
        </button>
      ) : (
        <button className='show-schedule-btn' onClick={() => openSchedule()}>
          Показати весь
        </button>
      )}

      {isScheduleShowing && (
        <ul className='schedule-list'>
          {sheetData.map((item, index) => (
            <li key={index}>{`${item.date} - ${item.guard}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedule;
