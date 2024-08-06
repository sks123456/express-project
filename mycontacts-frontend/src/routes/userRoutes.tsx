import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/LoginForm';
import CurrentUser from '../components/CurrentUser';

interface RoutesProps {
    token: string;
    setToken: (token: string) => void; // Add this line
  }
  
  const AppRoutes: React.FC<RoutesProps> = ({ token, setToken }) => {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} /> {/* Pass setToken here */}
        <Route path="/current-user" element={token ? <CurrentUser token={token} /> : <Navigate to="/login" />} />
      </Routes>
    );
  };
  
  export default AppRoutes;