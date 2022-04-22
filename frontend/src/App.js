import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import "./App.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import Events from "./components/Events/Events";
import Navbar from "./common/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/events/:name"
            element={
              <PrivateRoute>
                <Navbar />
                <Events />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
