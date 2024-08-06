// pages/MainPage.tsx
import React from "react";
import CurrentUser from "../components/CurrentUser";
import ContactsList from "../components/Contacts";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Current User Details
        </h1>
        <CurrentUser />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Contact Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactsList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
