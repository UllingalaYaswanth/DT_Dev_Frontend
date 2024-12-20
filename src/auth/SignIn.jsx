import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../pages/img/bg2.mp4'

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the email and password when navigating to SignIn
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
    } else {
      setError('');

      if (email === 'admin@gmail.com') {
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/home');
        localStorage.setItem('userEmail', email);
        window.location.reload();
      } else if (email === 'operator@gmail.com') {
        localStorage.setItem('userRole', 'operator');
        navigate('/operator/home');
        localStorage.setItem('userEmail', email);
        window.location.reload();
      } else {
        setError('User role not recognized');
      }
    }
  };


  return (
    <div className="flex items-center justify-start bg-gray-100 overflow-hidden">
      <video src={bg} loop autoPlay muted />
      <div className="absolute w-full max-w-xl px-20">
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-50 rounded-2xl shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-white text-xs">
          &copy;2024 Mbstech.ai . All rights reserved.
        </p>
      </div>
    </div>
  );
}
