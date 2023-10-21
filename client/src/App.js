import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Ui from "./Ui";

import Dashboard from "./Admin/Dashboard";
import ProfileScreen from "./Admin/ProfileScreen";
import Login from "./Admin/login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ui />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
