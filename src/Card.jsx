import React from 'react'

const Card = (channelInfo) => {

    return (
        <div>
            {
                channelInfo.channel ? <>
                    <p>{channelInfo.channel.name}</p>
                    <p>{channelInfo.feeds[0].field1}</p>
                </> : <p>Waiting...</p>
            }
        </div>
    )
}

export default Card