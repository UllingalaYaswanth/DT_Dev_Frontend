import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Admin Components
import LayoutAdmin from '../src/pages/admin/components/Layout';
import HomeAdmin from '../src/pages/admin/pages/Home';
import { Uploads } from './pages/admin/pages/uploads';
import TowersAdmin from '../src/pages/admin/pages/Towers';

// Operator Components
import LayoutOperator from '../src/pages/operator/components/Layout';
import HomeOperator from '../src/pages/operator/pages/Home';
import Towers from '../src/pages/operator/pages/Towers';
import Inspection from '../src/pages/operator/pages/Projects';
import Locations from '../src/pages/operator/pages/Locations';
import TowersOperator from '../src/pages/operator/pages/Towers';
import Excel from './pages/admin/layouts/Excel';

// Auth Component
import SignIn from './auth/SignIn';

const getUserRole = () => {
  // This should ideally be replaced with logic that fetches the role of the user
  return localStorage.getItem('userRole'); // e.g., "admin" or "operator"
  
};

function App() {
  const userRole = getUserRole(); // Get the user role (e.g., admin or operator)
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {/* Admin Routes */}
        {userRole === 'admin' && (
          <Route path="/admin/home" element={<LayoutAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="/admin/home/towers" element={<TowersAdmin />}/>
            <Route path="/admin/home/uploads" element={<Uploads />} />
            <Route path="/admin/home/inspection" element={<Inspection />} />
            <Route path="/admin/home/locations" element={<Locations />} />
            <Route path="/admin/home/excel" element={<Excel />} />
            <Route path="*" element={<HomeAdmin />} />
          </Route>
        )}

        {/* Operator Routes */}
        {userRole === 'operator' && (
          <Route path="/operator/home" element={<LayoutOperator />}>
            <Route index element={<HomeOperator />} />
            <Route path="/operator/home/towers" element={<TowersOperator />} />
            <Route path="/operator/home/Tower_import" element={<Towers />} />
            <Route path="/operator/home/projects" element={<Inspection />} />
            <Route path="/operator/home/locations" element={<Locations />} />
            <Route path="*" element={<HomeOperator />} />
          </Route>
        )}`
      </Routes>
    </BrowserRouter>
  );
}

export default App;
