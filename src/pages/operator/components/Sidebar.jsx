// import React, { useState } from 'react'
// import { LuBox, LuUser, LuMessageSquare, LuCalendar,LuLogOut} from 'react-icons/lu'
// import {Link} from 'react-router-dom'
// import logo from '../../../assets/images/logo_2.png'
// import { useNavigate } from 'react-router-dom'

// function Sidebar() {
//   const [activeLink, setActiveLink] = useState(0);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate('/');
//     window.location.reload();
//   }
//   const handleLinkClick = (index) =>{
//     setActiveLink(index)
//   }
//   const SIDEBAR_LINKS = [
//     { id: 1, path: '/operator/home', name: "Dashboard", icon: LuBox },
//     { id: 2, path: '/operator/home/Tower_import', name: "Tower", icon: LuUser },
//     { id: 4, path: '/operator/home/projects', name: "Inspection", icon: LuCalendar },
//     { id: 5, path: '/operator/home/Locations', name: "Locations", icon: LuBox },
// ];
//   return (
//     <div className='w-16 md:w-64 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white rounded-md shadow-md'>
//         <div className='items-center justify-center flex'>
//           {/* <img src={logo} className='w-9 flex rounded-xl'/> */}
//           <h1 className='text-xl ml-3 mt-5 hidden md:flex'>Operator Dashboard</h1>
//         </div>
//         <ul className='mt-14 space-y-4'>
//           {
//             SIDEBAR_LINKS.map((link,index) =>(
//               <li key={index} className={`font-medium rounded-md px-5 hover:bg-gray-200 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-200 text-indigo-500": ""}`} >
//                 <Link to={link.path} className='flex items-center md:space-x-5 justify-center md:justify-start py-1'
//                 onClick={() => handleLinkClick(index)}
//                 >
//                 <span >{link.icon()}</span>
//                 <span className='text-md text-gray-500 hidden md:flex py-1'>{link.name}</span>
//                 </Link>
//               </li>
//             ))
//           }
//         </ul>
//         <div className='absolute bottom-5 left-5 cursor-pointer text-center py-2 px-2'>
//           <p className='flex items-center space-x-2 text-md text-gray-800 hover:bg-gray-200 hover:text-indigo-500 py-2 md:px-12 rounded-md justify-center md:justify-start' onClick={handleLogout}>
//             <LuLogOut className='flex'/>
//             <span className='hidden md:flex pe-10 text-gray-500'>Logout</span>
//           </p>
//         </div>
//     </div>
//   )
// }

// export default Sidebar


import React, { useState, useEffect } from 'react';
import { LuBox, LuUser, LuMessageSquare, LuCalendar, LuLogOut } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import profile from "../../../assets/images/user.png"; // Adjust the path to match your folder structure

function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve active link from local storage on mount
    const storedActiveLink = localStorage.getItem('activeLink');
    if (storedActiveLink) {
      setActiveLink(parseInt(storedActiveLink, 10));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('activeLink'); // Clear on logout if needed
    navigate('/');
    window.location.reload();
  };

  const handleLinkClick = (index) => {
    setActiveLink(index);
    localStorage.setItem('activeLink', index); // Store the active link in local storage
  };

  const userEmail = localStorage.getItem('userEmail') || 'user@example.com'; // Fallback email
  const userName = userEmail === 'admin@gmail.com' ? 'Admin' : 'Operator';

  const SIDEBAR_LINKS = [
    { id: 1, path: '/operator/home', name: "Dashboard", icon: LuBox },
    { id: 2, path: '/operator/home/towers', name: "Towers", icon: LuUser },
    // { id: 3, path: '/operator/home/uploads', name: "Uploads", icon: LuMessageSquare },
    // { id: 4, path: '/operator/home/projects', name: "Inspection", icon: LuCalendar },
    { id: 5, path: '/operator/home/locations', name: "Locations", icon: LuBox },
  ];

  return (
    <div className='w-16 md:w-64 fixed left-0 top-0 z-10 h-screen py-2 border-r pt-8 px-4 bg-[#CBCDCB] text-black rounded-md shadow-md'>
      {/* User Info Section */}
      <div className='flex flex-col items-center mb-8'>
        <img src={profile} alt="User Profile" className='w-16 h-16 rounded-full border-2 border-indigo-400' />
        <h1 className='text-lg font-bold mt-2'>{userName}</h1>
        <p className='text-sm text-gray-600'>{userEmail}</p>
      </div>

      {/* Sidebar Links */}
      <ul className='mt-14 space-y-4'>
        {
          SIDEBAR_LINKS.map((link, index) => (
            <li key={index} className={`font-medium rounded-md px-5 hover:bg-[#ED9A60] hover:text-black ${activeLink === index ? "bg-[#FF9636] text-gray-800" : ""}`}>
              <Link to={link.path} className='flex items-center md:space-x-5 justify-center md:justify-start py-1' onClick={() => handleLinkClick(index)}>
                <span>{link.icon()}</span>
                <span className='text-md hidden md:flex py-1'>{link.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>

      {/* Logout Button */}
      <div className='absolute bottom-5 left-5 cursor-pointer text-center py-2 px-2'>
        <p className='flex items-center space-x-2 text-md text-gray-800 font-semibold bg-white hover:bg-[#444444] hover:text-white py-2 md:px-12 rounded-md justify-center md:justify-start' onClick={handleLogout}>
          <LuLogOut className='flex' />
          <span className='hidden md:flex pe-10'>Logout</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
