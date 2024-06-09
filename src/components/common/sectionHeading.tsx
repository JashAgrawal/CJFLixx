import React from 'react'
import { FaFire } from 'react-icons/fa'

const SectionHeading = ({ heading }: { heading: string }) => {
    return (
        <div className='flex space-x-2 items-center px-2'>
            <FaFire size={30} color='black' className='bg-red-700 p-1 rounded-sm' />
            <h1 className='text-white text-lg md:text-2xl font-regular'>{heading.toLocaleUpperCase()}</h1>
        </div>
    )
}

export default SectionHeading