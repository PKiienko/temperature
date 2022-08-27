import React from 'react'
import Channel from './Channel'
import './ChannelsList.css'

const ChannelsList = ({ filteredChannels }) => {
    return (
        <div className='list'>
            {filteredChannels.map((ch) =>
                <Channel key={ch.channelNumber} channelNumber={ch.channelNumber} />
            )}
        </div>
    )
}

export default ChannelsList