import React from 'react';
import { useState, useEffect } from 'react';
import channelsDataBase from './channelsDataBase';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import './Charts.css';

const Charts = () => {
  const [chartResults, setChartsResults] = useState('10&median=1');
  const [chartsChannelNumber, setChartsChannelNumber] = useState('618304');
  const [chartsChannelInfo, setChartsChannelInfo] = useState(null);
  const [chartsIsLoading, setChartsIsLoading] = useState('false');

  const getChartsThermoData = async () => {
    setChartsIsLoading(true);
    const response = await fetch(
      `https://api.thingspeak.com/channels/${chartsChannelNumber}/fields/1.json?results=${chartResults}`
    );
    const data = await response.json();

    //change key name in array
    data.feeds.map((obj) => {
      obj['C'] = obj['field1'];
      delete obj['field1'];
      return obj;
    });

    //change time format in array
    data.feeds.map((obj) => {
      obj['created_at'] = new Date(obj.created_at).toString().slice(4, 24);
    });

    setChartsChannelInfo(data);
    setChartsIsLoading(false);
  };

  const optionChangeHandler = (event) => {
    setChartsChannelNumber(event.target.value);
    getChartsThermoData(event.target.value);
  };

  useEffect(() => {
    getChartsThermoData();
  }, [chartsChannelNumber, chartResults]);

  return (
    <div className='charts'>
      <div className='buttons'>
        <div className='buttons-period no-select'>
          <h4
            onClick={() => {
              setChartsResults('60&median=10');
            }}
          >
            Hour
          </h4>
          <h4
            onClick={() => {
              setChartsResults('1440&median=20');
            }}
          >
            Day
          </h4>
          <h4
            onClick={() => {
              setChartsResults('2880&median=30');
            }}
          >
            Week
          </h4>
          <h4
            onClick={() => {
              setChartsResults('5760&median=60');
            }}
          >
            Month
          </h4>
        </div>
        <select
          onChange={optionChangeHandler}
          className='select-btn'
        >
          {channelsDataBase.map((channelDataBase) => (
            <option
              className='option'
              value={channelDataBase.channelNumber}
              key={channelDataBase.position}
            >
              {channelDataBase.ua_name}
            </option>
          ))}
        </select>
      </div>
      {chartsIsLoading ? (
        <p className='loading'>Loading</p>
      ) : (
        <>
          <ResponsiveContainer>
            <LineChart
              className='charts-container'
              width={700}
              height={400}
              data={chartsChannelInfo.feeds}
            >
              <Line
                type='monotone'
                dataKey='C'
                // stroke='#8884d8'
                stroke='#f31717'
              />
              <CartesianGrid
                stroke='#ccc'
                strokeDasharray='3 3'
              />
              <XAxis dataKey='created_at' />
              <YAxis
                width={50}
                type='number'
                domain={['auto', 'auto']}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default Charts;
