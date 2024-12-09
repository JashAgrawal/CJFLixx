import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { MovieCard } from '../common/MovieCard';
import Loading from '../common/loading';
import { fullSearch } from '@/lib/services';



const SearchList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const query = useSearchParams().get("query");

  const fetchResults = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fullSearch(searchQuery);
      setResults(res || []);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (query?.trim()) {
      fetchResults(query);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!query?.trim()) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-white text-lg">Enter a search term to find movies and shows</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 md:px-16 md:py-8 w-full h-full mt-16">
      <h1 className="text-white text-center w-full py-2 rounded-xl bg-black bg-opacity-40 backdrop-blur-md">
        Search Results for: {query}
      </h1>

      {error && (
        <div className="text-red-400 text-center p-4 bg-black bg-opacity-30 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]" role="status">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 md:gap-4 gap-2 px-3 md:px-8 w-full min-h-[70vh]">
          {results.length > 0 ? (
            results
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  name={movie.title || movie.name || ""}
                  year={movie.release_date || movie.first_air_date}
                  genre={movie.genres?.map((genre:any) => genre.name).join(", ")}
                  rating={movie.vote_average}
                  description={movie.overview}
                  imgPath={movie.poster_path}
                  id={movie.id}
                  type={movie.media_type}
                />
              ))
          ) : (
            <div className="col-span-2 md:col-span-5 flex items-center justify-center min-h-[50vh]">
              <p className="text-white text-lg">No results found for {query}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchList;