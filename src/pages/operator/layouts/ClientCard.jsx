import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function ClientCard({clint}) {
  return (
    <div className='bg-white rounded-xl space-y-5 gap-5 p-5'>
      <div className='flex items-center justify-between '>
        <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-semibold'>{clint.company}</h1>
        <div className='text-end'>
          <p className='text-md font-semibold'>Towers</p>
          <p className='text-sm text-gray-400 font-semibold'>{clint.role}</p>
        </div>
      </div>
      <p className='text-2xl ml-3 cursor-pointer'>
        <MdOutlineKeyboardArrowRight/>
        </p>
      </div>
      <p className='text-xs text-gray-400'>{clint.time}</p>
    </div>
  )
}

export default ClientCard