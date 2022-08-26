import React from 'react'
import Channel from './Channel'

import channelsDataBase from './channelsDataBase'

const ChannelsList = () => {
    return (
        <div>
            {channelsDataBase.map((ch) =>
                <Channel key={ch.channelNumber} channelNumber={ch.channelNumber} />
            )}
        </div>
    )
}

export default ChannelsList