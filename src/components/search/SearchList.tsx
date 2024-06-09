import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { MovieCard } from '../common/MovieCard';
import Loading from '../common/loading';
import { fullSearch } from '@/lib/services';

const SearchList = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const query = useSearchParams().get("query");

  const fetchResults = async (queryy: string) => {
    setLoading(true);
    const res = await fullSearch(queryy);
    setResults(res);
    setLoading(false);
  }
  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  return (
    <div className='flex flex-col space-y-4 md:px-16 md:py-8 w-full h-full mt-16'>
      <p className='text-white text-center w-full py-2 rounded-xl bg-black bg-opacity-40 backdrop-blur-md'>Your Search Results for :- {query} </p>
      {loading ? <div className=''> <Loading /> </div> : (
        <div className='grid grid-cols-2 md:grid-cols-5 md:gap-4 gap-2 px-3 md:px-8 w-full min-h-[70vh]'>
          {results.length >0 ? results.filter((movie: any) => movie.poster_path).map((movie: any) => (
            <MovieCard
              key={movie.id}
              name={movie.title || movie.name}
              year={movie.release_date || movie.first_air_date}
              genre={movie.genres?.map((genre: any) => genre.name).join(", ")}
              rating={movie.vote_average}
              description={movie.overview}
              imgPath={movie.poster_path}
              id={movie.id}
              type={movie.media_type}
            />
          )):<>
          <div className='w-full h-full flex items-center justify-center col-span-2 md:col-span-5'>

            <p className='w-full text-center'>No Results Found</p>
          </div>
          </>}
        </div>
      )}
    </div>
  )
}

export default SearchList