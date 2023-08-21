import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import './ChannelsList.css';

const ChannelsList = ({ refresh, channelsDataBaseWithMinMax }) => {
  const [location, setLocation] = useState('all');
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    if (channelsDataBaseWithMinMax.length > 0) {
      filterHandler();
    }
  }, [location, channelsDataBaseWithMinMax]);

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const filterHandler = () => {
    switch (location) {
      case 'storage':
        setFilteredChannels(
          channelsDataBaseWithMinMax.filter((channel) => channel.location === 'storage')
        );
        break;
      case 'fridge':
        setFilteredChannels(
          channelsDataBaseWithMinMax.filter((channel) => channel.location === 'fridge')
        );
        break;
      case 'packing_area':
        setFilteredChannels(
          channelsDataBaseWithMinMax.filter((channel) => channel.location === 'packing_area')
        );
        break;
      case 'greenhouse':
        setFilteredChannels(
          channelsDataBaseWithMinMax.filter((channel) => channel.location === 'greenhouse')
        );
        break;
      default:
        setFilteredChannels(channelsDataBaseWithMinMax);
        break;
    }
  };

  return (
    <>
      <div className='app-header-select'>
        <select className='select-btn' onChange={locationHandler}>
          <option value='all'>Всі</option>
          <option value='storage'>Склади</option>
          <option value='fridge'>Холодильники</option>
          <option value='packing_area'>Пакування</option>
          <option value='greenhouse'>Теплиці</option>
        </select>
      </div>
      <div className='list'>
        {filteredChannels.map((filteredChannel) => (
          <Channel
            filteredChannel={filteredChannel}
            key={filteredChannel.channelNumber}
            channelNumber={filteredChannel.channelNumber}
            refresh={refresh}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelsList;
