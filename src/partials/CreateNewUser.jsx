import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, switchLoginStatus } from "../redux/auth";
import { useDispatch } from "react-redux";
import { Puff } from "react-loader-spinner";
import EmailSentModal from "../partials/EmailSentModal";
import { clearMessage } from "../redux/message";
import logo from "../images/logogetsweet.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
  password: "",
  company: "",
  fullName: ''
};

function CreateNewUser() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false)
  const [message, setMessage] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(clearMessage())
  }, [])

  const createUser = async (currentUser) => {
    setLoading(true)
    try {
      const { data } = await axios.post("https://seashell-app-2-n2die.ondigitalocean.app/api/v1/admin/create-user", currentUser);
      const { user, token } = data;
      setValues(initialState)
      toast.success("User created successfully");
    } catch (error) {
      setMessage(error.response.data.msg)
    }
    setLoading(false)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    createUser(values)
    console.log(JSON.stringify(values))

  }

  return (
    <div className="">
      <form onSubmit={onSubmit} className="max-w-sm mx-auto ">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="form-input w-full rounded-full text-gray-700"
              placeholder="Enter your email "
              required
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="form-input w-full rounded-full text-gray-700"
              placeholder="Enter your fullName "
              required
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Brand Name
            </label>
            <input
              type="text"
              name="company"
              value={values.company}
              onChange={handleChange}
              className="form-input w-full rounded-full text-gray-700"
              placeholder="Enter your company "
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="form-input w-full rounded-full text-gray-700"
              placeholder="Password (at least 8 characters)"
              required
            />
          </div>
        </div>
        <p className="flex justify-center items-center text-red-600">
          {message}
        </p>

        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            {/* <Link to="/services"> */}
            <button

              type="submit"
              className="font-bold text-white bg-gradient-to-r from-[#9394d2] to-[#4446e4] py-3 w-full">

              Add New User
            </button>
            {/* </Link> */}
          </div>
          {loading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"> <Puff
            height="100"
            width="100"
            color="#4446e4"
            secondaryColor='#4446e4'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          </div>}
        </div>
      </form>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </div>
  );
}

export default CreateNewUser;
