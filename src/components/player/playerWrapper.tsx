"use client"
import React, { Suspense } from 'react'
import PlayerComp from './player'
import { servers } from './tab'

const PlayerWrapper = ({
    id,
    type,
    currEpisode,
    currSeason }: {
        id: string,
        type: string,
        currSeason?: string,
        currEpisode?: string
    }) => {
    return (
        <Suspense>
            <PlayerComp url={servers[0].getter(type, id, currSeason, currEpisode)} id={id} type={type} currSeason={currSeason} currEpisode={currEpisode} />
        </Suspense>
    )
}

export default PlayerWrapper