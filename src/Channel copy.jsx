import React, { useState, useEffect } from 'react'

import './Channel.css'

const Channel = ({ channelNumber }) => {

    const [channelInfo, setChannelInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dateWithOffset, setDateWithOffset] = useState(null);

    useEffect(() => {
        getThermoData();
    }, [])

    const getThermoData = async () => {
        setIsLoading(true);
        const response = await fetch(`https://api.thingspeak.com/channels/${channelNumber}/fields/1.json?results=1`);
        const data = await response.json();
        setChannelInfo(data);
        setIsLoading(false);
        timeConverter();
    }

    const timeConverter = () => {
        const isoStr1 = channelInfo.feeds[0].created_at;
        const date = new Date(isoStr1);
        const timestampWithOffset = date.getTime();
        setDateWithOffset(new Date(timestampWithOffset));
        console.log(dateWithOffset);
    }

    return (
        <div className='card'>
            {
                isLoading ? <p className='loading'>Loading...</p> : <>
                    <h5 className='channel-name no-select'>{channelInfo.channel.name}</h5>
                    <p className='temperature-value no-select'>{channelInfo.feeds[0].field1}</p>
                    <h5 className='channel-time no-select'>{dateWithOffset}</h5>
                </>
            }
        </div>
    )
}

export default Channel