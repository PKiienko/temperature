import { useEffect, useState } from 'react';
import channelsDataBase from './channelsDataBase';

import './Settings.css';

const Settings = ({ channelsDataBaseWithMinMax, setChannelsDataBaseWithMinMax }) => {
  const [selectedChannel, setSelectedChannel] = useState('');

  //setting limit for selected channel and sawing it to localStorage
  const updateTemperatureLimit = (e, channel, property) => {
    const newValue = parseFloat(e.target.value);
    const updatedData = channelsDataBaseWithMinMax.map((el) =>
      el.channelNumber === channel.channelNumber ? { ...el, [property]: newValue } : el
    );
    setChannelsDataBaseWithMinMax(updatedData);
    setSelectedChannel(channel.channelNumber);
    localStorage.setItem('userSettings', JSON.stringify(updatedData));
  };

  return (
    <div>
      <div className='columns'>
        <h4 className='settings-title-name'>Термометр</h4>
        <h4 className='settings-title-min'>Мін.</h4>
        <h4 className='settings-title-max'>Макс.</h4>
      </div>
      {channelsDataBaseWithMinMax.map((channel) => {
        return (
          <div className='columns' key={channel.channelNumber}>
            <p className='column_name'>{channel.ua_name}</p>
            <input
              className='column_min'
              type='number'
              defaultValue={channel.minT}
              step='0.1'
              min='-50'
              max='50'
              onChange={(e) => updateTemperatureLimit(e, channel, 'minT')}
            />
            <input
              className='column_max'
              type='number'
              defaultValue={channel.maxT}
              step='0.1'
              min='-50'
              max='50'
              onChange={(e) => updateTemperatureLimit(e, channel, 'maxT')}
            />
          </div>
        );
      })}
      {/* <>
        <p>What values would you like to use?</p>
        <p>Default</p>
        <p>Your own</p>
        <p>Google sheets</p>
      </>
      <>
        <p>What channels would you like to use?</p>
        <p>Default</p>
        <p>Your own</p>
        <p>Google sheets</p>
      </>
      <>
        <p>What update interval would you like to use?</p>
        <p>Default</p>
        <p>Your own</p>
        <p>Google sheets</p>
      </> */}
    </div>
  );
};

export default Settings;
