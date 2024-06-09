import React from 'react'

export const LoadingComp = () => {
    return (
        <div className='w-full h-full grow flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg p-16 rounded-xl'>
            <div className="loader"></div>
            <h1 className='text-white text-lg font-medium'>Loading...</h1>
        </div>
    )
}

const Loading = () => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-30'>
            <LoadingComp />
        </div>
    )
}

export default Loading