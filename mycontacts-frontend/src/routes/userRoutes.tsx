import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CurrentUser from "../components/CurrentUser";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import AuthPage from "../pages/AuthPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<AuthPage />} />
      </Route>
      <Route path="user" element={<PrivateLayout />}>
        <Route path="current-user" element={<CurrentUser />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
