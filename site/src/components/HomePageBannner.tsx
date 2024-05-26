import Image from 'next/image'
import React from 'react'
import { IoIosArrowDropright } from 'react-icons/io'

const HomePageBannner = () => {
    return (
        <div className='w-[80%] mx-auto h-[40vh]'>
            <div className='flex justify-center items-center h-full'>
                <div className='w-1/2 px-5 '>
                    <h1 className='text-[35px] font-bold tracking-wide mr-20 '>Your Premier Destination for Exceptional Fensters, Windows, and Aluminium Frames!</h1>
                    <button className='p-3 flex flex-row justify-center items-center gap-2 mt-2 rounded-xl shadow-lg text-white font-normal  bg-blue-500'>
                        Explore Our Collections <IoIosArrowDropright size={20} />

                    </button>
                </div>
                <div className='w-1/2 h-full flex items-center justify-center rounded-2xl'>
                    <Image className='w-[85%] h-[90%] rounded-2xl shadow-xl' width={500} height={700} src='/Home/banner/1.jpg' alt='Beautiful room with fensters, windows, and curtains' />
                </div>
            </div>
        </div>
    )
}

export default HomePageBannner
