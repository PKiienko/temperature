import { useState, useEffect, useMemo } from 'react';
import './Channel.css';

const Channel = ({ channelNumber, refresh, filteredChannel }) => {
  const [channelInfo, setChannelInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [bgEffect, setBgEffect] = useState('');

  const dateWithOffset = useMemo(() => {
    if (!channelInfo) return '';

    const channelDate = channelInfo.feeds[0].created_at;
    const date = new Date(channelDate);
    const timestampWithOffset = date.getTime();

    let currentTime = Date.now();
    let timeDelay = currentTime - timestampWithOffset;

    if (parseFloat(channelInfo.feeds[0].field1) < parseFloat(filteredChannel.minT)) {
      setBgEffect('cold');
    }
    if (parseFloat(channelInfo.feeds[0].field1) > parseFloat(filteredChannel.maxT)) {
      setBgEffect('hot');
    }
    if (
      parseFloat(channelInfo.feeds[0].field1) > parseFloat(filteredChannel.minT) &&
      parseFloat(channelInfo.feeds[0].field1) < parseFloat(filteredChannel.maxT)
    ) {
      setBgEffect('normal');
    }
    if (timeDelay > 300000) {
      setBgEffect('outdated');
    }

    return new Date(timestampWithOffset).toString().slice(4, 21);
  }, [channelInfo]);

  const getThermoData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.thingspeak.com/channels/${channelNumber}/fields/1.json?results=1`
    );
    const data = await response.json();
    setChannelInfo(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getThermoData();
  }, [refresh]);

  return (
    <div className={`card ${bgEffect}`}>
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <>
          <div className='channel-description'>
            <h5 className='channel-name no-select'>{channelInfo.channel.name}</h5>
            <h5 className='channel-time no-select'>{dateWithOffset}</h5>
          </div>
          <p className='temperature-value no-select'>{channelInfo.feeds[0].field1}</p>
        </>
      )}
    </div>
  );
};

export default Channel;
