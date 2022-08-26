import React, { useState, useEffect } from 'react'

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

    console.log(channelNumber);

    return (
        <div>
            {
                isLoading ? <p>Waiting...</p> : <>
                    <p>{channelInfo.channel.name}</p>
                    <p>{channelInfo.feeds[0].field1}</p>
                </>
            }
        </div>
    )
}

export default Channel