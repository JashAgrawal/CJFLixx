import VideoPlayer from '@/components/player'
import React from 'react'

const page = ({ params }: { params: { id: string,s:string,ep:string } }) => {
  
  return (
    <VideoPlayer type='tv' id={params.id} currSeason={params.s} currEpisode={params.ep}/>
  )
}

export default page