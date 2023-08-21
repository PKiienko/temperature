import './ChartDisplay.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ChartDisplay = ({ chartsIsLoading, chartsChannelInfo }) => {
  return (
    <div>
      {chartsChannelInfo === null && chartsIsLoading === false && (
        <p className='loading'>
          Виберіть канал, час початку, час кінця та натисніть кнопку Завантажити
        </p>
      )}
      {chartsIsLoading && <p className='loading'>Завантаження даних...</p>}
      {chartsChannelInfo && chartsChannelInfo.feeds.length === 0 && chartsIsLoading === false && (
        <p className='loading'>Немає даних у каналі за цей період</p>
      )}
      {chartsChannelInfo && chartsChannelInfo.feeds.length !== 0 && chartsIsLoading === false && (
        <div className='charts'>
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
              <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
              <XAxis dataKey='created_at' />
              <YAxis width={50} type='number' domain={['auto', 'auto']} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartDisplay;
