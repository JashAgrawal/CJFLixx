"use client"
import React, { useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { createArrayOfArrays } from '../details/details';
import useActiveSeason from '@/context/currSeason';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from '../common/loading';

const EpisodePicker = ({ seasons, id, ss, ep }: { seasons: any[], id: string, ss?: string, ep?: string }) => {
    const router = useRouter();
    const { activeSeasonNumber, setActiveSeasonNumber } = useActiveSeason();
    const [loading, setLoading] = React.useState(false);
    const activeEpRef = React.useRef(null);
    const params = useSearchParams();
    useEffect(() => {
        if (ss) {
            setActiveSeasonNumber(parseInt(ss) - 1);
        }
    }, [ss, setActiveSeasonNumber]);
    const scrollToElement = () => {
        const {current} = activeEpRef
         if(current){   
            //@ts-ignore
           current?.scrollIntoView({behavior: "smooth"})
         }
      }
    useEffect(() => {
        scrollToElement();
    },[ss,ep,id])
    const handleClick = async (newEp: number) => {
        setLoading(true);
        let userId = localStorage.getItem("userId");
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem("userId", userId);
        }
        await axios.post("/api/history", {
            userId,
            id: id,
            type: "tv",
            currSeason: activeSeasonNumber ? "" + (activeSeasonNumber + 1) : "1",
            currEpisode: newEp ? "" + newEp : "1",
        });
        setLoading(false);
        router.push(`/tv/${id}/${activeSeasonNumber + 1}/${newEp}${params.has("serverWatchedAt") ? `?serverWatchedAt=${params.get("serverWatchedAt")}` : ""}`);
    };
    if (loading) {
        return <Loading />
    }
    return (
        <div className='flex flex-col space-y-2 w-full h-full md:w-1/3 pt-4 pb-0 max-md:mt-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl'>
            <div className='px-4'>

            
            <Select defaultValue={ss ? (parseInt(ss) - 1).toString() : activeSeasonNumber.toString()} onValueChange={(val) => { setActiveSeasonNumber(parseInt(val)) }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={seasons[activeSeasonNumber]?.name || `Season ${activeSeasonNumber}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {seasons.filter((season: any) => season.name !== "Specials").map((season: any, si: number) => (
                            <SelectItem key={si} value={"" + si}>{season.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            </div>
            <div className='grid grid-cols-5 md:grid-cols-1 max-h-[30vh] md:max-h-[76vh] md:min-h-[76vh] overflow-y-auto px-4'>
                {createArrayOfArrays(seasons[activeSeasonNumber]?.episode_count).map((episode: any, ei) => (
                    <div ref={((`${ei + 1}` == ep) && (`${activeSeasonNumber + 1}` == ss)) ? activeEpRef : null}
                        onClick={() => handleClick(ei + 1)}
                        // href={`/tv/${id}/${activeSeasonNumber+1}/${ei + 1}`} 
                        key={episode} className={`text-white text-lg rounded-lg text-center p-4 bg-black bg-opacity-30 m-1 cursor-pointer ${((`${ei + 1}` == ep) && (`${activeSeasonNumber + 1}` == ss)) ? "ring-2 ring-red-500" : ""}`}
                    // style={{ backgroundColor: ((`${ei + 1}` == currEpisode) && (`${si + 1}` == currSeason)) ? "red" : "black" }}
                    ><span className='max-md:hidden'>Episode</span> <span>{ei + 1}</span></div>
                ))}
            </div>
        </div>
    )
}

export default EpisodePicker