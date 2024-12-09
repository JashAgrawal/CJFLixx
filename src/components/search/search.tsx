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

interface SearchResult {
    id: number;
    name?: string;
    title?: string;
    media_type: string;
    poster_path?: string;
}

export default function CommandSearch() {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const router = useRouter();

    const debouncedSearch = useDebounce(inputValue, 300);

    const setR = async (query: string) => {
        if (!query || query.length < 2) {
            setResults([]);
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const searchResults = await fullSearch(query);
            setResults(searchResults || []);
        } catch (err) {
            setError("Failed to fetch results. Please try again.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setR(debouncedSearch);
    }, [debouncedSearch]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        setOpen(false);
        router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    };

    return (
        <HoverCard open={open} onOpenChange={setOpen}>
            <HoverCardTrigger asChild>
                <form onSubmit={handleSubmit} className="w-full md:w-[40vw] md:pl-16">
                    <div className="flex w-full items-center space-x-2">
                        <Input
                            className="rounded-full w-full text-white px-6 border-0 bg-black/20 backdrop-blur-sm"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setOpen(true);
                            }}
                            placeholder="Search movies and shows..."
                            type="search"
                            aria-label="Search"
                            aria-expanded={open}
                            aria-controls="search-results"
                            aria-describedby={error ? "search-error" : undefined}
                        />
                        <Button 
                            className="rounded-full border border-gray-900 bg-black/40 backdrop-blur-sm px-5 py-2 max-md:hidden" 
                            type="submit"
                            aria-label="Submit search"
                        >
                            <FaSearch size={18} color="gray"/>
                        </Button>
                    </div>
                </form>
            </HoverCardTrigger>

            <HoverCardContent 
                id="search-results"
                className="md:w-[35vw] w-[70vw] max-md:pr-2 max-h-96 bg-black bg-opacity-70 rounded-lg flex flex-col overflow-y-auto p-0 m-0"
                align="start"
                side="bottom" 
                sideOffset={10}
            >
                {error && (
                    <div id="search-error" className="text-red-400 p-4 text-center">{error}</div>
                )}
                
                {loading ? (
                    <div className="text-white p-8 text-center" role="status">
                        <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full mx-auto"/>
                        <span className="sr-only">Loading results...</span>
                    </div>
                ) : (
                    <>
                        {inputValue && inputValue.length > 1 && results.length === 0 && !error && (
                            <div className="text-white p-4 text-center">No results found</div>
                        )}
                        {results.filter((item) => item.poster_path).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setInputValue(item.name || item.title || "");
                                    setOpen(false);
                                    router.push(`/details/${item.media_type}/${item.id}`);
                                }}
                                className="flex w-full text-white py-2 border-b backdrop-blur-lg border-gray-700 text-sm px-2 md:mx-4 hover:bg-white/10 transition-colors"
                            >
                                <Image 
                                    unoptimized 
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    width={40} 
                                    height={40} 
                                    alt={item.name || item.title || "Movie poster"}
                                    className="w-20 h-16 rounded-xl pr-4 object-cover"
                                />
                                <p className="self-center">{item.name || item.title}</p>
                            </button>
                        ))}
                    </>
                )}
            </HoverCardContent>
        </HoverCard>
    );
}
