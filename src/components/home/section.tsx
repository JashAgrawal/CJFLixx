import TMDB_Api_Service from '@/services/tmdbClient';
import React from 'react'
import MovieList from '../common/MovieList';
import Top from './top';

const Section = async ({ isTv }: { isTv: boolean }) => {
  const res = await TMDB_Api_Service.get(`/${isTv ? "tv" : "movie"}/popular`);
  const movies = res.data.results;
  return (
    <div className='flex max-md:flex-col space-x-0'>
      <MovieList heading={`Popular ${isTv ? "TV Shows" : "Movies"}`} data={movies} isTv={isTv} />
      <Top isTv={isTv} />
    </div>
  )
}

export default Section