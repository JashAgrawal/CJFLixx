"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../ui/button';
import { FaPlay, FaStar } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import { MdHighQuality } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/navigation';


const TrendingBanner = ({ movies }: { movies: any[] }) => {
    const [cardCount, setCardCount] = useState(1)
    const router = useRouter();

    useEffect(() => {
        if (window !== undefined) {
            setCardCount(window.innerWidth < 768 ? 1 : 3)
        }
    }, [])

    return (
        <Swiper
            className='w-full h-[24vh] md:h-[36vh] grid-cols-1 md:grid-cols-3 '
            spaceBetween={10}
            slidesPerView={cardCount}
            autoplay={{
                delay: 2000,
                disableOnInteraction: true,
            }}
            loop
        >
            {movies.map((movie: any) => (
                <SwiperSlide key={movie?.id} className='w-full h-full py-4 md:py-5 px-2'>
                    <div className='w-full h-full flex justify-center items-center relative hover:border-2 hover:border-red-700 rounded-xl '>
                        <div onClick={() => router.push(`/details/movie/${movie?.id}`)} className='bg-black w-full h-full rounded-xl overflow-hidden '>
                            <Image unoptimized src={"https://image.tmdb.org/t/p/original" + movie?.backdrop_path} width={1200} height={500} alt="Movie" className="w-full h-full object-cover rounded-xl border border-gray-800 opacity-80" />
                        </div>
                        <div className='absolute px-4 py-2 bottom-0 left-0 flex flex-col justify-between'>
                            <div>
                                <h1 className='text-white text-sm font-medium'>{(""+movie?.title).toLocaleUpperCase()}</h1>

                            </div>
                            <div className='flex space-x-4 items-center py-2'>
                                <div className='flex space-x-1.5 items-center'>
                                    <FaStar size={11} color='yellow' />
                                    <p className='text-white text-xs font-light'>{("" + movie?.vote_average).slice(0, 3)}</p>
                                </div>
                                <div className='flex space-x-1.5 items-center'>
                                    <MdDateRange size={14} color='yellow' />
                                    <p className='text-white text-xs font-light'>{movie?.release_date}</p>
                                </div>
                                <div className='flex space-x-1 items-center'>
                                    <p className='text-white text-xs font-light'>{("" + movie?.original_language).toLocaleUpperCase()} </p>
                                    <GoDotFill size={6} />
                                    <MdHighQuality size={20} color='white' />
                                </div>

                            </div>

                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default TrendingBanner