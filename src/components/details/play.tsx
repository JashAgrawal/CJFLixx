"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';
import { FaPlay } from 'react-icons/fa';

const PlayButton = ({
    id,
    type,
    currSeason,
    currEpisode,
    poster_path,
    title,

}: {
    id: string,
    type: string,
    currSeason?: string,
    currEpisode?: string,
    poster_path: string,
    title: string
}) => {
    const router = useRouter();
    const handleClick = async (event: any) => {
        let userId = localStorage.getItem("userId");
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem("userId", userId);
        }
        const res = await axios.post("/api/history", {
            userId,
            id: id,
            type: type,
            currSeason: currSeason ? "" + currSeason:"1",
            currEpisode: currEpisode ? "" + currEpisode :"1",
            poster_path: poster_path,
            title: title,
        });
        router.push(`/${type}/${id}${type == "tv" && currSeason && currEpisode ? `/${currSeason}/${currEpisode}` : ""}`);
    };
    return (
        <Button onClick={handleClick} className='p-5 px-10 w-full'>
            <div className='flex space-x-2 items-center'>
                <FaPlay size={16} />
                <p className='text-lg'>Play Now</p>
            </div>
        </Button>
    )
}

export default PlayButton