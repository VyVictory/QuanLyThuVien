import React from 'react'

export default function Dashboard() {
    return (
        <div className=' px-5 py-3'>
            <h1 class="text-3xl font-bold text-center my-8">Dashboard</h1>
            <div className='grid gap-5 grid-cols-4'>
                {/* sách */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3] w-[300px] '>
                    <h3>Tổng số sách hiện có</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>123</span>
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
                    <h3>Tổng số đọc giả</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>123</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#7AB2D3" class="size-11">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                </div>
                {/*  */}
                <div className='border-[1px] bg-gray-200 rounded-md px-5 py-2 border-[#7AB2D3]'>
                    <h3>Tổng số danh mục</h3>
                    <div className='flex justify-between items-center border-b-8 border-[#7AB2D3]'>
                        <span className='font-bold text-5xl'>123</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#7AB2D3" class="size-11">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    )
}
