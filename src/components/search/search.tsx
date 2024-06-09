"use client";
import React, { useEffect } from "react";
import useDebounce from "@/hooks/debounce";
import { FaSearch } from "react-icons/fa";
import TMDB_Api_Service from "@/services/tmdbClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fullSearch } from "@/lib/services";
export default function CommandSearch() {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState<any[]>([]);
    const router = useRouter();

    const debouncedSearch = useDebounce(inputValue);
    const setR = async (debouncedSearch: string) => {
        setLoading(true);
        setResults(await fullSearch(debouncedSearch));
        setLoading(false);
    }
    useEffect(() => {
        if (debouncedSearch) {
            setR(debouncedSearch)
        }
    }, [debouncedSearch])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(false);
        router.push(`/search?query=${inputValue}`);
    };
    return (
        <HoverCard>
            <HoverCardTrigger className="w-full md:w-[40vw] md:pl-16">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        className="rounded-full w-full text-white px-6 border-0 bg-black/20 backdrop-blur-sm"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search..."
                        type="search"
                    />
                    <Button className="rounded-full border border-gray-900 bg-black/40 backdrop-blur-sm px-5 py-2 max-md:hidden" type="submit">
                        <FaSearch size={18} color="gray"/>
                    </Button>
                </form>
            </HoverCardTrigger>


            <HoverCardContent forceMount={open || undefined} side="bottom" sideOffset={10} className="md:w-[35vw] w-[70vw] max-md:pr-2 max-h-96 bg-black bg-opacity-70 rounded-lg flex flex-col overflow-y-auto p-0 m-0">
                {loading ? <div className="text-white p-8 text-center">Loading...</div> : (<>
                    {inputValue && inputValue.length > 2 && results.length === 0 && <div className="text-white px-4">No results found.</div>}
                    {inputValue && inputValue.length > 0 && results.filter((item: any) => item.poster_path).map((item, i) => (
                        <div onClick={() => { setInputValue(item.name); setOpen(false); router.push(`/details/${item.media_type}/${item.id}`) }} className={"flex w-full text-white py-2 border-b backdrop-blur-lg border-gray-700 text-sm px-2 md:mx-4"} key={item.id} >
                            <Image unoptimized src={"https://image.tmdb.org/t/p/w500" + item?.poster_path} width={40} height={40} alt="Movie" className="w-20 h-16 rounded-xl pr-4" />
                            <p>{item.name || item.title}</p>
                        </div>
                    ))}
                </>)}

            </HoverCardContent>
        </HoverCard>

    );
}
