import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import ChannelsList from './ChannelsList';
import Manual from './Manual';
import channelsDataBase from './channelsDataBase';

import { IoRefresh } from 'react-icons/io5';
import { BsGear, BsCalendarDay, BsDisplay, BsStar } from 'react-icons/bs';
import { AiOutlineLineChart, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';

import './App.css';

import Map from './Map';
import Charts from './Charts';
import Schedule from './Schedule';
import Settings from './Settings';

const App = () => {
  const [refresh, setRefresh] = useState(true);

  //fetch new data every 60 seconds
  const autoRefresh = setInterval(() => {
    setRefresh(!refresh);
    clearInterval(autoRefresh);
  }, 60000);

  return (
    <div className='App'>
      <div className='app-header'>
        <div className='app-header-logo'>
          <h3>
            <Link to='/'>Dekoplant Thermometers</Link>
          </h3>
        </div>

        <div className='app-header-buttons'>
          <>
            <Link to='/'>
              <BsDisplay
                className='app-header-button'
                size={'1.5rem'}
              />
            </Link>
          </>
          {/* <>
            <Link to='/map'>
              <BiMap
                className='app-header-button'
                size={'1.5rem'}
              />
            </Link>
          </> */}
          <>
            <Link to='/charts'>
              <AiOutlineLineChart
                className='app-header-button'
                size={'1.5rem'}
              />
            </Link>
          </>
          <>
            <Link to='schedule'>
              <BsCalendarDay
                className='app-header-button'
                size={'1.5rem'}
              />
            </Link>
          </>
          <>
            <Link to='manual'>
              <AiOutlineInfoCircle
                className='app-header-button'
                size={'1.5rem'}
              />
            </Link>
          </>
          {/* <>
            <Link to='settings'>
              <BsGear
                className='app-header-button'
                size={'1.5rem'}
              />
            </Link>
          </> */}
          <Link>
            <IoRefresh
              className='app-header-button'
              size={'1.5rem'}
              onClick={() => {
                setRefresh(!refresh);
                clearInterval(autoRefresh);
              }}
            />
          </Link>
        </div>
      </div>

      <Routes>
        <Route
          path='/'
          element={<ChannelsList refresh={refresh} />}
        />
        <Route
          path='/map'
          element={<Map />}
        />
        <Route
          path='/charts'
          element={<Charts />}
        />
        <Route
          path='/schedule'
          element={<Schedule />}
        />
        <Route
          path='/settings'
          element={<Settings />}
        />
        <Route
          path='/manual'
          element={<Manual />}
        />
      </Routes>
    </div>
  );
};

export default App;
