import React, { useState, useEffect } from 'react';
import { LuBox, LuUser, LuMessageSquare, LuCalendar, LuLogOut } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';

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

  const SIDEBAR_LINKS = [
    { id: 1, path: '/admin/home/', name: "Dashboard", icon: LuBox },
    { id: 2, path: '/admin/home/towers', name: "Towers", icon: LuUser },
    { id: 3, path: '/admin/home/uploads', name: "Uploads", icon: LuMessageSquare },
    { id: 4, path: '/admin/home/inspection', name: "Inspection", icon: LuCalendar },
    { id: 5, path: '/admin/home/locations', name: "Locations", icon: LuBox },
  ];

  return (
    <div className='w-16 md:w-64 fixed left-0 top-0 z-10 h-screen py-2 border-r pt-8 px-4 bg-[#4C2E46] text-white rounded-md shadow-xl'>
      <div className='items-center justify-center flex'>
        <h1 className='text-2xl ml-3 mt-5 hidden md:flex'>Admin Dashboard</h1>
      </div>
      <ul className='mt-14 space-y-4'>
        {
          SIDEBAR_LINKS.map((link, index) => (
            <li key={index} className={`font-medium rounded-md px-5 hover:bg-white hover:text-gray-800 ${activeLink === index ? "bg-[#F0F2F4] text-gray-800" : ""}`} >
              <Link to={link.path} className='flex items-center md:space-x-5 justify-center md:justify-start py-1'
                onClick={() => handleLinkClick(index)}
              >
                <span>{link.icon()}</span>
                <span className='text-md  hidden md:flex py-1'>{link.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
      <div className='absolute bottom-5 left-5 cursor-pointer text-center py-2 px-2'>
        <p className='flex items-center space-x-2 text-md text-gray-800 font-semibold bg-indigo-100 hover:bg-red-400 hover:text-white trasition delay-100 py-2 md:px-12 rounded-md justify-center md:justify-start' onClick={handleLogout}>
          <LuLogOut className='flex' />
          <span className='hidden md:flex pe-10'>Logout</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;

