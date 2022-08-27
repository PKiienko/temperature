import React, { useState, useEffect } from 'react'

import './Channel.css'

const Channel = ({ channelNumber }) => {

    const [channelInfo, setChannelInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getThermoData = async () => {
        setIsLoading(true);
        const response = await fetch(`https://api.thingspeak.com/channels/${channelNumber}/fields/1.json?results=1`);
        const data = await response.json();
        setChannelInfo(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getThermoData();
    }, [])

    return (
        <div className='card'>
            {
                isLoading ? <p className='loading'>Loading...</p> : <>
                    <h5>{channelInfo.channel.name}</h5>
                    <p className='value'>{channelInfo.feeds[0].field1}</p>
                    <h5>{channelInfo.feeds[0].created_at}</h5>
                </>
            }
        </div>
    )
}

export default Channel