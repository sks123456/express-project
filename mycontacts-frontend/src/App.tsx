import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/userRoutes";
import "./App.css";

const App: React.FC = () => {
  const [token, setToken] = useState("");

  return (
    <Router>
      <div className="">
        <AppRoutes token={token} setToken={setToken} />
      </div>
    </Router>
  );
};

export default App;
