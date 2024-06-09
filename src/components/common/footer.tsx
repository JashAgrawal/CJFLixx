import React from 'react'

const Footer = () => {
    return (
        <footer className="rounded-lg shadow my-4 max-md:m-4 md:mx-8 bg-white backdrop-blur-md bg-opacity-10 md:mt-12">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <div className='flex flex-col space-y-2'>
                    <span className="text-sm text-gray-500  dark:text-gray-400">© 2024 <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' className="hover:underline">CJFLix™</a>. All Rights Reserved.</span>
                    <span className='text-xs text-gray-600'>This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</span>
                </div>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer