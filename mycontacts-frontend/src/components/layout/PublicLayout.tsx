import React from "react";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white p-4 md:p-6 shadow-md">
        <h1 className="text-xl md:text-3xl font-bold text-center">
          My Contact App
        </h1>
      </header>
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-4">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} My Contact App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default PublicLayout;
