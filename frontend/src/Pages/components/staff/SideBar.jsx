import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function SideBar() {
  return (
    <div className='w-[261px] h-[500px] bg-white rounded-xl ml-4 p-4'>
      <ul>
        <li>
          <Link className='flex gap-3 justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
            <span>Người dùng</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
