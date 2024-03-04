import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ username: "", email: "", password: "", firstName: "", lastName: "", dob: "", mobileNumber: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password, username, firstName, lastName, dob, userId, mobileNumber } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (username) generateError(username);
          else if (firstName) generateError(firstName);
          else if (lastName) generateError(lastName);
          else if (dob) generateError(dob);
          else if (mobileNumber) generateError(mobileNumber);
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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ width: "700px" }}>
        <h2 className="text-2xl mb-6 text-center">Register Account</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-wrap justify-between">
          <div className="flex flex-col mb-4 w-1/2 pr-2">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4 w-1/2 pl-2">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4 w-1/2 pr-2">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4 w-1/2 pl-2">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4 w-1/2 pr-2">
            <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4 w-1/2 pl-2">
            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number (Optional)"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <span className="block text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
