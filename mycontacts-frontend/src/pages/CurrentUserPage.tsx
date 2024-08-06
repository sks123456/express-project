// pages/CurrentUserPage.tsx
import React from "react";
import CurrentUser from "../components/CurrentUser";

const CurrentUserPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Current User</h1>
      <CurrentUser />
      <div className="mt-4"></div>
    </div>
  );
};

export default CurrentUserPage;
