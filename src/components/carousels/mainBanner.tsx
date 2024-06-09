"use client"
import Image from 'next/image';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../ui/button';
import { FaPlay, FaStar } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";
import { MdHighQuality } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/navigation';
import axios from 'axios';


const MainBanner = ({ movies }: { movies: any[] }) => {
    const router = useRouter();
    const handleClick = async (movie:any) => {
        let userId = localStorage.getItem("userId");
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem("userId", userId);
        }
        const res = await axios.post("/api/history", {
            userId,
            id: ""+movie?.id,
            type: "movie",
            poster_path: movie.poster_path,
            title: movie.title, 
        });
        router.push(`/${"movie"}/${movie?.id}`);
    };
    return (
        <Swiper
            className='w-full h-[90vh] md:h-[100vh]'
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: true,
            }}
            loop
        >
            {movies.filter((movie: any) => movie.poster_path && movie.backdrop_path).map((movie: any) => (

                <SwiperSlide key={movie?.id} className='w-full h-full'>
                    <div className='w-full h-full flex justify-center items-center relative fadeur-b pb-8'>
                        <div className='bg-black w-full h-full rounded-xl '>
                            <Image unoptimized src={"https://image.tmdb.org/t/p/original" + movie?.poster_path} width={1000} height={500} alt="Movie" className="w-full h-full object-cover rounded-xl border border-gray-800 opacity-60 md:hidden fadeur" />
                            <Image unoptimized src={"https://image.tmdb.org/t/p/original" + movie?.backdrop_path} width={1000} height={500} alt="Movie" className="w-full h-full object-cover rounded-xl border border-gray-800 opacity-60 max-md:hidden fadeur" />
                        </div>
                        <div className='absolute md:p-8 bottom-16 left-6 md:bottom-10 md:left-8 flex flex-col justify-between z-10'>
                            <div>
                                <h1 className='text-white text-lg md:text-3xl font-medium'>{movie?.title}</h1>
                            </div>
                            <div className='flex space-x-4 items-center md:py-2'>
                                <div className='flex space-x-1.5 items-center'>
                                    <FaStar size={11} color='yellow'/>
                                    <p className='text-white text-xs font-light'>{(""+movie?.vote_average).slice(0,3)}</p>
                                </div>
                                <div className='flex space-x-1.5 items-center'>
                                    <MdDateRange size={14} color='yellow'/>
                                    <p className='text-white text-xs font-light'>{movie?.release_date}</p>
                                </div>
                                <div className='flex space-x-1 items-center'>
                                    <p className='text-white text-xs font-light'>{(""+movie?.original_language).toLocaleUpperCase()} </p>
                                    <GoDotFill size={6}/>
                                    <MdHighQuality size={20} color='white'/>
                                </div>

                            </div>
                            <p className='text-gray-300 font-light md:max-w-[60%] text-xs max-md:max-w-[90%] overflow-hidden md:text-sm md:mt-2'>{("" + movie?.overview).slice(0, 150)}{("" + movie?.overview).length > 150 && "..."}</p>
                            <div className='flex justify-between md:pt-6 pt-3'>
                                <Button onClick={() => handleClick(movie)} className='p-5 px-10'>
                                    <div className='flex space-x-2 items-center'>
                                        <FaPlay size={16} />
                                        <p className='text-lg'>Play Now</p>
                                    </div>
                                
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default MainBanner