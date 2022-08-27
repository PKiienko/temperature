import React from 'react'
import Channel from './Channel'
import channelsDataBase from './channelsDataBase'
import './ChannelsList.css'

const ChannelsList = () => {
    return (
        <div className='list'>
            {channelsDataBase.map((ch) =>
                <Channel key={ch.channelNumber} channelNumber={ch.channelNumber} />
            )}
        </div>
    )
}

export default ChannelsList