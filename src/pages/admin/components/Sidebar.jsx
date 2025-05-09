import React, { useState, useEffect } from 'react';
import { LuBox, LuUser, LuMessageSquare, LuLogOut } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import profile from "../../../assets/images/user.png"; // Adjust the path to match your folder structure

function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedActiveLink = localStorage.getItem('activeLink');
    if (storedActiveLink) {
      setActiveLink(parseInt(storedActiveLink, 10));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('activeLink');
    navigate('/');
    window.location.reload();
  };

  const handleLinkClick = (index) => {
    setActiveLink(index);
    localStorage.setItem('activeLink', index);
  };

  const userEmail = localStorage.getItem('userEmail') || 'user@example.com'; // Fallback email
  const userName = userEmail === 'admin@gmail.com' ? 'Admin' : 'Operator';

  const SIDEBAR_LINKS = [
    { id: 1, path: '/admin/home/', name: "Dashboard", icon: LuBox },
    { id: 2, path: '/admin/home/towers', name: "Towers", icon: LuUser },
    { id: 3, path: '/admin/home/uploads', name: "Uploads", icon: LuMessageSquare },
    { id: 5, path: '/admin/home/locations', name: "Locations", icon: LuBox },
  ];

  return (
    <div className='w-16 md:w-64 fixed left-0 top-0 z-10 h-screen py-2 border-r pt-8 px-4 bg-[#CBCDCB] text-black rounded-md shadow-xl'>
      {/* User Info Section */}
      <div className='flex flex-col items-center mb-8'>
        <img src={profile} alt="User Profile" className='w-16 h-16 rounded-full border-2 border-indigo-400' />
        <h1 className='text-lg font-bold mt-2'>{userName}</h1>
        <p className='text-sm text-gray-600'>{userEmail}</p>
      </div>

      {/* Sidebar Links */}
      <ul className='mt-4 space-y-4'>
        {SIDEBAR_LINKS.map((link, index) => (
          <li key={index} className={`font-medium rounded-md px-5 hover:bg-[#ED9A60] hover:text-black ${activeLink === index ? "bg-[#F0A160] text-gray-800" : ""}`}>
            <Link to={link.path} className='flex items-center md:space-x-5 justify-center md:justify-start py-1' onClick={() => handleLinkClick(index)}>
              <span>{link.icon()}</span>
              <span className='text-md hidden md:flex py-1'>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className='absolute bottom-5 left-5 cursor-pointer text-center py-2 px-2'>
        <p className='flex items-center space-x-2 text-md text-white font-semibold bg-[#444444] hover:bg-black hover:text-white trasition delay-100 py-2 md:px-12 rounded-md justify-center md:justify-start' onClick={handleLogout}>
          <LuLogOut className='flex' />
          <span className='hidden md:flex pe-10'>Logout</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
