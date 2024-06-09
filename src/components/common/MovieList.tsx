import React from 'react'
import { MovieCard } from './MovieCard'
import { FaFire } from 'react-icons/fa'

const MovieList = ({ data, heading, isTv, isFull }: { data: any, heading: string, isTv: boolean, isFull?: boolean }) => {

  return (
    <div className={`${isFull ? "md:w-full" : "md:w-2/3"}`}>
      <div className='flex space-x-2 items-center py-4 md:py-4 mt-8 mb-4 mx-2 md:mx-8 max-md:px-2'>
        <FaFire size={30} color='black' className='bg-red-700 p-1 rounded-sm' />
        <h1 className='text-white text-lg md:text-2xl font-regular'>{heading.toLocaleUpperCase()}</h1>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 md:gap-4 gap-2 md:px-8 w-full h-full px-2'>
        {data.map((movie: any) => (
          <MovieCard
            key={movie?.id}
            name={movie?.title || movie?.name}
            year={movie?.release_date || movie.first_air_date}
            genre={movie?.genres?.map((genre: any) => genre.name).join(", ")}
            rating={movie?.vote_average}
            description={movie?.overview}
            imgPath={movie?.poster_path}
            id={movie?.id}
            type={movie?.media_type || (isTv ? "tv" : "movie")}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList