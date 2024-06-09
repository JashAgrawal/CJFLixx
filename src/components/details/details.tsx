import TMDB_Api_Service from '@/services/tmdbClient'
import Image from 'next/image';
import React from 'react';
import { MdDateRange, MdHighQuality } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import MovieList from '../common/MovieList';
import PlayButton from './play';
import { FaStar } from 'react-icons/fa';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

export function createArrayOfArrays(count: number) {
    const innerArray = Array.from({ length: 10 }, (_, i) => i + 1);
    const resultArray = Array.from({ length: count }, () => [...innerArray]);
    return resultArray;
}
const VideoDetails = async ({ type, id, currSeason, currEpisode, showPlayButton }: { type: string, id: string, currSeason?: string, currEpisode?: string, showPlayButton?: boolean }) => {
    try {
        const res = await TMDB_Api_Service.get(`/${type}/${id}?append_to_response=credits`);
        const recRes = await TMDB_Api_Service.get(`/${type}/${id}/recommendations?&page=1`);
        const movie = res.data;
        const recommendations = recRes.data.results;
        const { poster_path, credits, backdrop_path, title, name, overview, genres, tagline, } = movie;
        return (
            <div className='p-3 md:p-6 flex flex-col space-y-8 text-white relative mt-8'>
                <div className='bg-black w-screen h-screen fixed top-0 left-0 right-0 bottom-0 -z-10'>
                    <Image unoptimized src={"https://image.tmdb.org/t/p/original" + poster_path} width={1000} height={1000} alt="bg" className="w-full h-full opacity-50 md:hidden" />
                    <Image unoptimized src={"https://image.tmdb.org/t/p/original" + backdrop_path} width={1000} height={1000} alt="bg" className="w-full h-full opacity-50 max-md:hidden" />

                </div>
                <div className='flex flex-col md:flex-row bg-black backdrop-blur-lg border-gray-700 border p-6 rounded-xl bg-opacity-40 max-md:p-3 max-md:space-y-3 md:space-x-6 my-0 md:mx-12'>
                    <Image
                        unoptimized
                        src={"https://image.tmdb.org/t/p/w500" + poster_path}
                        width={600}
                        height={500}
                        alt="Movie"
                        className="w-full md:w-1/4 rounded-xl overflow-hidden"
                    />

                    <div className="md:w-2/3 text-white flex flex-col max-md:justify-between space-y-2">
                        <div className="px-4 text-xs font-bold rounded-lg flex max-md:flex-col max-md:space-y-3 md:justify-between w-full">
                            <div className="text-lg max-md:py-2 md:text-3xl font-medium rounded-lg">{(title || name).toUpperCase()}</div>
                        </div>
                        <div className="px-4 text-gray-300 text-sm hidden md:block font-light">{tagline}</div>

                        <div className='flex space-x-8 items-center md:py-2 px-4'>
                            <div className='flex space-x-1.5 items-center'>
                                <MdDateRange size={16} color='yellow' />
                                <p className='text-white md:text-md text-xs font-light'>{movie?.release_date || movie?.first_air_date}</p>
                            </div>
                            <div className='flex space-x-2 items-center bg-white bg-opacity-30 rounded-md px-3 py-0.5'>
                                <FaStar size={13} color='yellow' />
                                <p className='text-white md:text-md text-xs font-light'>{("" + movie?.vote_average).slice(0, 3)}</p>
                            </div>

                            <div className='flex space-x-1 items-center'>
                                <p className='text-white md:text-md text-xs font-light'>{("" + movie?.original_language).toLocaleUpperCase()} </p>
                                <GoDotFill size={6} />
                                <MdHighQuality size={24} color='white' />
                            </div>

                        </div>
                        <div className='flex space-x-2 items-center md:py-1 px-4'>
                            {genres?.map((genre: any, i: number) => (

                                <div key={i} className='flex flex-wrap space-x-2 items-center bg-white bg-opacity-30 rounded-md px-4 py-1'>
                                    <p className='text-white md:text-md text-xs font-light whitespace-nowrap'>{genre?.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className='divider border-b mx-4 border-red-700'></div>
                        {/* <div className="min-h-8 px-4 text-sm text-semibold">Genre :- {genres.map((genre:any) => genre.name).join(", ")}</div> */}
                        <div className="px-4 pb-2 font-extralight text-xs md:text-sm text-gray-300 ">
                            {overview}
                        </div>
                        {showPlayButton &&
                            <div className='flex space-x-2 items-center md:py-2 px-4 my-2'>
                                <PlayButton type={type} id={id} currSeason={currSeason} currEpisode={currEpisode} poster_path={poster_path} title={title || name} />
                            </div>
                        }
                        <div className='md:py-2 px-4 flex md:max-w-[50rem] w-full h-full space-x-4 overflow-x-auto noScroll max-md:pb-2'>
                            {credits.cast.filter((credit: { profile_path: any; }) => credit.profile_path).map((credit: any, i: number) => (
                                <HoverCard key={i} >
                                    <HoverCardTrigger>
                                    <Image unoptimized src={"https://image.tmdb.org/t/p/w500" + credit.profile_path} width={100} height={100} alt="Movie" className='w-16 min-w-16 h-16 min-h-16 object-cover rounded-full' key={i} />
                                    </HoverCardTrigger>
                                    <HoverCardContent sideOffset={-40} side='bottom' className='flex flex-col justify-center items-center p-2 rounded-lg bg-black/40 backdrop-blur-sm w-auto space-y-1.5'>
                                    <Image unoptimized src={"https://image.tmdb.org/t/p/w500" + credit.profile_path} width={100} height={100} alt="Movie" className='object-cover rounded-lg' key={i} />
                                        <p className='font-medium text-md'>{credit.original_name}</p>
                                        <p className='font-light text-xs'>{credit.character}</p>
                                    </HoverCardContent>
                                </HoverCard>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='md:px-4'>
                    <MovieList isFull data={recommendations} heading='YOU MAY ALSO LIKE' isTv={false} />
                </div>
            </div>
        );
    } catch (e) {
        return <div className='w-screen h-screen flex justify-center items-center'>
            <h1 className='text-white text-xl font-regular'>Something went wrong</h1>
        </div>
    }
}


export default VideoDetails