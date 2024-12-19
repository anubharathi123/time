import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsideBar_Header from "./components/Asidebar_Header";
import UploadDocument from "./components/UploadDocument";
import VerifyDoc from "./components/verifydoc";
import "./App.css";


function App() {
  // Function to handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("username");
    // Perform any additional logout actions here if needed
    window.location.href = "/login"; // Redirect to login page after logout
  };

 
  return (
    <Router>
      <div className="app">
        {/* <AsideBar /> */}
        {/* Static AsideBar with Logout functionality */}
        <AsideBar_Header onLogout={handleLogout} />

        {/* Main Content */}
        <main className="uploaddoc">
          <Routes>
            {/* Route for Login */}
            <Route path="/UploadDocument" element={< UploadDocument/>} />
              <Route path="/verifydoc" element={< VerifyDoc />} />

            {/* Fallback route for unmatched paths */}
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
