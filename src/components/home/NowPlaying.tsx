import TMDB_Api_Service from '@/services/tmdbClient';
import React from 'react'
import MainBanner from '../carousels/mainBanner';

const NowPlaying = async () => {
  const res = await TMDB_Api_Service.get("/movie/now_playing");
  const movies = res.data.results;
  return (
    <div className='w-full h-full'>
      <MainBanner movies={movies} />
    </div>
  )
}

export default NowPlaying