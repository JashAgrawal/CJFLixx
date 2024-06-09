"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieCard } from '../common/MovieCard';


const Scroller = ({ movies,type,isHistory=false }: { movies: any[],type?:string,isHistory?:boolean }) => {
    const [cardCount, setCardCount] = useState(1)
    const [spaceBetween, setSpaceBetween] = useState(10)
    useEffect(() => {
        if (window !== undefined) {
            setCardCount(window.innerWidth < 768 ? 2 : 6)
            setSpaceBetween(window.innerWidth < 768 ? 0 : 5)
        }
    }, [])

    return (
        <Swiper
            className='w-full'
            spaceBetween={spaceBetween}
            slidesPerView={cardCount}
        >
            {movies.filter((movie: any) => movie.poster_path).map((movie: any) => {
                return(
                <SwiperSlide key={movie?.id || movie?.media_id} className='w-full h-full md:py-5 py-4 pl-2'>
                    <MovieCard
                        id={movie?.media_id || movie?.id}
                        imgPath={movie?.poster_path}
                        name={movie?.title || movie?.name}
                        type={type || movie?.media_type}
                        ss={movie?.season_number}
                        ep={movie?.episode_number}
                        serverWatchedAt = {movie?.serverWatchedAt}
                        isDirectPlayer={isHistory}
                    />
                </SwiperSlide>
            )})}
        </Swiper>
    )
}

export default Scroller