"use client";
import React from 'react'
import axios from 'axios';
import MovieHistory from '../carousels/scroller';
import SectionHeading from '../common/sectionHeading';

const HistoryList = () => {
    const [history, setHistory] = React.useState<any>([]);
    const fetchHistory = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            return;
        }
        const data = await axios.get("/api/history/" + userId);
        setHistory(data.data);
    }

    React.useEffect(() => {
        fetchHistory();
    }, []);

    if (history.length === 0) {
        return null;
    }
    return (
        <div className='w-full px-4 md:px-8'>
            <SectionHeading heading='Continue Watching' />
            <MovieHistory movies={history} isHistory={true}/>
        </div>
    )
}

export default HistoryList