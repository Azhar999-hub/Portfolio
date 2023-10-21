import LoginIcon from "@mui/icons-material/Login";

import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/Dashboard");
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User Login Successfully!");
      navigate("/Dashboard");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="row sl g-0">
          <div className="col-lg-6">
            <img
              src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="col-lg-6 text-center py-4">
            <h2 className="animate__animated animate__heartBeat animate__infinite text-primary">
              Login <LoginIcon fontSize="large" />
            </h2>
            <form onSubmit={handleLogin}>
              <div className="form-row py-2 pt-5">
                <div className="col-lg-10 offset-1">
                  <input
                    type="email"
                    className="inp px-3"
                    placeholder="User Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row py-2 ">
                <div className="col-lg-10 offset-1">
                  <input
                    type="password"
                    className="inp  px-3"
                    placeholder="User Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row py-2 ">
                <div className="col-lg-10 offset-1">
                  <button type="submit" className="btn-one  px-3">
                    Login
                  </button>
                </div>
              </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
            {token && <p className="text-success">Logged in successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
