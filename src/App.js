import React, { useEffect, useState } from 'react';
import ChannelsList from './ChannelsList';
import channelsDataBase from './channelsDataBase'
import './App.css';

const App = () => {

  const [location, setLocation] = useState('all')
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    filterHandler();
  }, [location])

  const locationHandler = (e) => {
    setLocation(e.target.value);
  }

  const filterHandler = () => {
    switch (location) {
      case 'storage':
        setFilteredChannels(channelsDataBase.filter(channel => channel.location === 'storage'))
        break;
      case 'fridge':
        setFilteredChannels(channelsDataBase.filter(channel => channel.location === 'fridge'))
        break;
      case 'packing_area':
        setFilteredChannels(channelsDataBase.filter(channel => channel.location === 'packing_area'))
        break;
      case 'greenhouse':
        setFilteredChannels(channelsDataBase.filter(channel => channel.location === 'greenhouse'))
        break;
      default:
        setFilteredChannels(channelsDataBase);
        break;
    }
  }

  return (
    <div className="App">
      <h3>Dekoplant Thermometers</h3>

      <select onChange={locationHandler}>
        <option value='all'>All</option>
        <option value='storage'>Storages</option>
        <option value='fridge'>Fridges</option>
        <option value='packing_area'>Packing Areas</option>
        <option value='greenhouse'>Greenhouses</option>
      </select>

      <ChannelsList filteredChannels={filteredChannels} />
    </div>
  );
}

export default App;
