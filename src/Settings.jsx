import React from 'react';
import channelsDataBase from './channelsDataBase';

import './Settings.css';

const Settings = () => {
  return (
    <div>
      <div className='columns'>
        <h4>Name</h4>
        <h4>Maximum</h4>
        <h4>Minimum</h4>
      </div>
      {channelsDataBase.map((channelDataBase) => {
        return (
          <div className='columns'>
            <p className='column_name'>{channelDataBase.ua_name}</p>
            <input
              className='column_max'
              type='number'
            />
            <input
              className='column_min'
              type='number'
            />
          </div>
        );
      })}
    </div>
  );
};

export default Settings;
