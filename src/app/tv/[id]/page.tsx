import VideoPlayer from '@/components/player'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
   <VideoPlayer type='tv' id={params.id}/>
  )
}

export default Page