import { useState, useEffect } from 'react';
import './ChartDashboard.css';
import channelsDataBase from '../channelsDataBase';
import ChartDisplay from './ChartDisplay';
import ChartControls from './ChartControls';

const ChartDashboard = () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const currentOffset = -(now.getTimezoneOffset() / 60);

  const formatDateTime = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = '00'; // Fixed seconds value

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const [requestOptions, setRequestOptions] = useState('?results=60&average=10');
  const [chartsChannelNumber, setChartsChannelNumber] = useState(channelsDataBase[0].channelNumber);
  const [chartsChannelInfo, setChartsChannelInfo] = useState(null);
  const [chartsIsLoading, setChartsIsLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState({
    startTime: formatDateTime(oneHourAgo),
    endTime: formatDateTime(now),
  });

  const getChartsThermoData = async () => {
    setChartsIsLoading(true);

    const formattedStartTime = formatDateTime(new Date(timePeriod.startTime));
    const formattedEndTime = formatDateTime(new Date(timePeriod.endTime));

    console.log(
      `https://api.thingspeak.com/channels/${chartsChannelNumber}/fields/1.json${requestOptions}`
    );
    //setRequestOptions(`?start=${formattedStartTime}&end=${formattedEndTime}`);

    const response = await fetch(
      `https://api.thingspeak.com/channels/${chartsChannelNumber}/fields/1.json?start=${formattedStartTime}&end=${formattedEndTime}&offset=${currentOffset}&median=10`
    );

    const data = await response.json();

    console.log(data);

    //change key name in array
    data.feeds.map((obj) => {
      obj['C'] = obj['field1'];
      delete obj['field1'];
      return obj;
    });

    //change time format in array
    data.feeds.map((obj) => {
      return (obj['created_at'] = new Date(obj.created_at).toString().slice(4, 24));
    });

    setChartsChannelInfo(data);
    setChartsIsLoading(false);
  };

  const timePeriodChangeHandler = (event, timeType) => {
    setTimePeriod({
      ...timePeriod,
      [timeType]: event.target.value,
    });
  };

  const channelChangeHandler = (event) => {
    setChartsChannelNumber(event.target.value);
  };

  // useEffect(() => {
  //   getChartsThermoData();
  // }, [chartsChannelNumber]);

  return (
    <div className='charts'>
      <ChartControls
        channelChangeHandler={channelChangeHandler}
        timePeriodChangeHandler={timePeriodChangeHandler}
        timePeriod={timePeriod}
        getChartsThermoData={getChartsThermoData}
      />
      <ChartDisplay chartsIsLoading={chartsIsLoading} chartsChannelInfo={chartsChannelInfo} />
    </div>
  );
};

export default ChartDashboard;
