import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import dotenv from "dotenv";
dotenv.config();


function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 
  const HOST = process.env.REACT_APP_HOST;

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({ identifier: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${HOST}/login`,
        { ...values },
        { withCredentials: true }
      );
      if (data) {
        if (data.status == false) {
          if(data.errors.username != null || data.errors.email != null){
            setErrorMessage("Username or password is wrong");
          }
          if(data.errors.password != null){
            setErrorMessage("Username or password is wrong");
          }
         
        } else {
          navigate("/"); 
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-6 text-center">Login to your Account</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-gray-700 text-sm font-bold mb-2">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            {errorMessage && ( // Display error message if exists
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <span className="block text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
