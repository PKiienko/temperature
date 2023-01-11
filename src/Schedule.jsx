import React, { useState, useEffect } from 'react';
import * as xlsx from 'xlsx';
import Calendar from 'react-calendar';

import './Schedule.css';

const Schedule = () => {
  const [fileData, setFileData] = useState(null);
  const [keeper, setKeeper] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    keeperFinder();
  }, [date, fileData]);

  //finding kepper on selected date
  const keeperFinder = () => {
    if (!fileData) {
      setKeeper('Select schedule');
    }
    if (fileData) {
      for (let i = 0; i < fileData.length; i++) {
        if (
          fileData[i].day === date.getDate() &&
          fileData[i].month === date.getMonth() + 1
        ) {
          setKeeper(fileData[i].keeper);
        }
      }

      for (let i = 0; i < fileData.length; i++) {
        if (
          fileData[i].day !== date.getDate() &&
          fileData[i].month !== date.getMonth() + 1
        ) {
          setKeeper('No Data');
        }
      }
    }
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setFileData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  return (
    <div className='calendar-container '>
      <Calendar
        onChange={setDate}
        value={date}
        className={['c1', 'c2']}
      />
      <div className='file-and-keeper'>
        <form className='fileForm'>
          <input
            className='upload-file-button'
            type='file'
            name='upload'
            id='upload'
            onChange={readUploadFile}
          />
        </form>
        <div className='keeper-name'>
          <h4>Guard: {keeper}</h4>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
