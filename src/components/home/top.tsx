import TMDB_Api_Service from '@/services/tmdbClient';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaFire } from 'react-icons/fa';
import { MdHighQuality } from 'react-icons/md';
import SectionHeading from '../common/sectionHeading';
export const TopCard = ({ movie ,isTv}: { movie: any,isTv:boolean }) => {

    return (
        <Link href={`/details/${isTv ? "tv" : "movie"}/${movie?.id}`} className='w-full h-full rounded-xl overflow-hidden flex bg-gray-800 space-x-4'>
            <div className='border'>
                <Image unoptimized src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path} width={60} height={110} alt="Movie" className="md:w-24 md:h-24 w-16 h-16 rounded-xl" />
            </div>
            <div className='flex flex-col space-y-1 md:pt-2 pt-1'>
                <h1 className='text-white text-lg md:text-xl font-regular'>{(""+(movie?.title || movie?.name)).slice(0, 20)}{(""+(movie?.title || movie?.name)).length >20 ? "..." : ""}</h1>
                <div className='flex space-x-4 items-center md:pt-2'>
                    <p className='text-white text-xs font-light'>{("" + movie?.vote_average).slice(0, 3)}</p>
                    <p className='text-white text-xs font-light'>{movie?.release_date || movie?.first_air_date}</p>
                    <p className='text-white text-xs font-light'>{("" + movie?.original_language).toLocaleUpperCase()} </p>
                    <MdHighQuality size={20} color='white' />
                </div>
            </div>
        </Link>);
};

const Top = async ({ isTv }: { isTv: boolean }) => {
    const res = await TMDB_Api_Service.get(`/${isTv ? "tv" : "movie"}/top_rated`);
    const movies = res.data.results;
    return (
        <div className='flex flex-col md:w-1/3 md:pr-8 max-md:px-2'>
            <div className='md:mt-6 md:py-5 mb-3 max-md:py-5'>
            <SectionHeading heading={`Top ${isTv ? "TV Shows" : "Movies"}`}/>
            </div>
            <div className='flex flex-col space-y-2 max-md:px-2'>
            {movies.slice(0, 10).map((movie: any) => (
                <TopCard key={movie?.id} movie={movie} isTv={isTv} />
            ))}
            </div>
        </div>
    )
}

export default Top;