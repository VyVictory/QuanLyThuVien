import React from 'react'
import { useState, useEffect } from 'react'
import { getAllBook, getAllUser } from '../../../Service/Staff'
import { getAllCategory } from '../../../Service/Staff'

export default function Dashboard() {
    const [dataCategory, setDataCategory] = useState([])
    const [dataBook, setDataBook] = useState([])
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategory = await getAllCategory();
                setDataCategory(responseCategory);
                const responseBook = await getAllBook();
                setDataBook(responseBook);
                const responseUser = await getAllUser();
                setDataUser(responseUser)
            }
            catch (error) {
            }
        }; fetchData()
    }, [])

    return (
        <div className=' px-5 py-3'>
            <h1 class="text-3xl font-bold text-center my-8">Dashboard</h1>
            <div className='grid gap-5 grid-cols-4'>
                {/* sách */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3] w-[300px] '>
                    <h3>Total Books</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>{dataBook.length}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#7AB2D3" class="size-11">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                </div>
                {/* sách */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3]'>
                    <h3>Sách hiện tại chưa mượn</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>123</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#7AB2D3" class="size-11">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                </div>
                {/* sách */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3]'>
                    <h3>Sách đang mượn</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>123</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#7AB2D3" class="size-11">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                </div>
                {/*  */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3]'>
                    <h3>Total Users</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>{dataUser.length}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 448 512"><path fill="#FFD43B" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                    </div>
                </div>
                {/*  */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3]'>
                    <h3>Total Categories</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>{dataCategory.length}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='size-11' viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" /></svg>
                    </div>
                </div>
            </div>

        </div>
    )
}
