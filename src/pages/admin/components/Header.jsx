import React from 'react'
import profile from "../../../assets/images/user.png"
function Header() {
  const userEmail = localStorage.getItem('userEmail')
  console.log("header:",userEmail)
  return (
    <div className='flex justify-between items-center p-4 bg-[#444444] m-2 mt-3  rounded-xl shadow-sm text-white'>
      <div className=''>
        <h1 className='text-xs'>Welcome Back!</h1>
        {
          userEmail === 'admin@gmail.com' ? (
            <p className='text-lg font-semibold'>Admin</p>
          ) :
          (
          <p className='text-lg font-semibold'>Operator</p>
          )
        }
        
      </div>
      {/* <div className='flex items-center space-x-5'>
        <div className='hidden md:flex'>
        </div>
        <div className='flex items-center'>
          <img src={profile} className='w-10 h-10 rounded-full border-4 border-indigo-400 cursor-pointer'/>
          <div className="flex flex-col items-left  px-2">
          <h1 className='text-xs font-bold cursor-pointer'>
            user1
          </h1>
          <p className='text-xs '>{userEmail}</p>
        </div>
        </div>
        
      </div> */}

    </div>
  )
}

export default Header