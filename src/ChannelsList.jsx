import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import channelsDataBase from './channelsDataBase';
import './ChannelsList.css';

const ChannelsList = ({ refresh }) => {
  const [location, setLocation] = useState('all');
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    filterHandler();
  }, [location]);

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const filterHandler = () => {
    switch (location) {
      case 'storage':
        setFilteredChannels(
          channelsDataBase.filter((channel) => channel.location === 'storage')
        );
        break;
      case 'fridge':
        setFilteredChannels(
          channelsDataBase.filter((channel) => channel.location === 'fridge')
        );
        break;
      case 'packing_area':
        setFilteredChannels(
          channelsDataBase.filter(
            (channel) => channel.location === 'packing_area'
          )
        );
        break;
      case 'greenhouse':
        setFilteredChannels(
          channelsDataBase.filter(
            (channel) => channel.location === 'greenhouse'
          )
        );
        break;
      default:
        setFilteredChannels(channelsDataBase);
        break;
    }
  };

  return (
    <>
      <div className='app-header-select'>
        <select
          className='select-btn'
          onChange={locationHandler}
        >
          <option value='all'>All</option>
          <option value='storage'>Storages</option>
          <option value='fridge'>Fridges</option>
          <option value='packing_area'>Packing Areas</option>
          <option value='greenhouse'>Greenhouses</option>
        </select>
      </div>
      <div className='list'>
        {filteredChannels.map((ch) => (
          <Channel
            minT={ch.minT}
            maxT={ch.maxT}
            key={ch.channelNumber}
            channelNumber={ch.channelNumber}
            refresh={refresh}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelsList;
