import React from "react";
import { Outlet } from "react-router-dom";
import LogoutButton from "../LogOutBtn";

function PrivateLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">My Contact App</h1>
        <div className="flex">
          <h1 className="text-2xl font-bold mr-5">
            Best Contact Management Solutions
          </h1>
          <LogoutButton />
        </div>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
