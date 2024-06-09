import VideoPlayer from '@/components/player'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <VideoPlayer type='movie' id={params.id}/>
  )
}

export default Page