import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/userRoutes";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
