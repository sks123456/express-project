// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <header>
        <h1>My Contacts App</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
