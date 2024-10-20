import React from 'react'
import SideBar from '../components/staff/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/staff/NavBar'
export default function LayoutStaff() {
    return (
        <>
            <div className='flex gap-5 bg-[#FFF2F2] pt-5 '>
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}
