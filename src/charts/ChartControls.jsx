import './ChartControls.css';
import channelsDataBase from '../channelsDataBase';
import { MdArrowRight } from 'react-icons/md';

const ChartControls = ({
  channelChangeHandler,
  timePeriodChangeHandler,
  timePeriod,
  getChartsThermoData,
}) => {
  return (
    <div className='controls'>
      <div className='select-channel-container'>
        <button className='load-button' onClick={getChartsThermoData}>
          Завантажити
        </button>
        <span className='arrow'></span>
        <select
          onChange={channelChangeHandler}
          className='select-channel-btn'
          id='select-channel-btn'
        >
          {channelsDataBase.map((channelDataBase) => (
            <option
              key={channelDataBase.position}
              className='option'
              value={channelDataBase.channelNumber}
            >
              {channelDataBase.ua_name}
            </option>
          ))}
        </select>
      </div>
      <div className='datetime-inputs-container'>
        <div className='start-datetime'>
          <input
            type='datetime-local'
            className='start-datetime-input'
            id='start-datetime-input'
            value={timePeriod.startTime}
            onChange={(event) => timePeriodChangeHandler(event, 'startTime')}
          />
        </div>
        <MdArrowRight className='arrow' />

        <div className='end-datetime'>
          <input
            type='datetime-local'
            className='end-datetime-input'
            id='end-datetime-input'
            value={timePeriod.endTime}
            onChange={(event) => timePeriodChangeHandler(event, 'endTime')}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartControls;
