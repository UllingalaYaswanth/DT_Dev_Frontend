import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div className='bg-[#F0F2F4]'>
        <div className='flex'>
            <Sidebar />
            <div className='w-full ml-16 md:ml-64'>
                <Header />
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Layout