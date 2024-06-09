import TMDB_Api_Service from '@/services/tmdbClient';
import React from 'react'
import TrendingBanner from '../carousels/trending';
import SectionHeading from '../common/sectionHeading';

const TrendingAll = async () => {
  const res = await TMDB_Api_Service.get("/movie/now_playing");
  const movies = res.data.results;
  return (
    <div className='w-full px-2 md:px-8'>
      <SectionHeading heading='Whats Trending Today'/>
      <TrendingBanner movies={movies} />
    </div>
  )
}

export default TrendingAll