import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, switchLoginStatus } from "../redux/auth";


const initialState = {
  email: "",
  password: "",
};

function SignIn() {

  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false)
  const [message, setMessage] = useState(false)



  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch()

  const loginUser = async (currentUser) => {
    try {
      const { data } = await axios.post("https://seashell-app-8amlb.ondigitalocean.app/api/v1/auth/login", currentUser);
      const { user, token } = data;
      console.log("Data : " + data)
      navigate('/brand-engagement-builder')
      dispatch(switchLoginStatus(token))
      dispatch(setUserData(user))
    } catch (error) {
      // alert(error.response.data.msg)
      setMessage(error.response.data.msg)
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    loginUser(values)
    // console.log(JSON.stringify(values))

  }


  return (
    <div className="flex flex-col min-h-screen  relative overflow-hidden ">
      {/*  Site header */}


      {/*  Page content */}
      <main className=" ">
        {/*  Page illustration */}


        <section className="relative  ">
          <div
            className="max-w-7xl md:mx-auto px-4 md:px-6 ">
            <div className="pt-32 pb-10 md:translate-y-[20%]  lg:translate-y-0   lg:pb-16 
            flex justify-center items-center">
              <div className="bg-white bg-opacity-10 px-2 shadow-2xl py-5 opacity-90 md:w-[70%] lg:w-[45%] w-full rounded-xl">
                {/* Page header */}
                {/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
                  <h3 className="text-2xl font-bold  text-[#6366F1]">
                    Login to your account
                  </h3>

                </div> */}
                <div className="max-w-sm mx-auto text-start pb-12 md:pb-10">
                  <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">Login to your account</h1>
                  <h1 className=" font-cabinet-grotesk">Didn't sign up yet? <a href="/signup" className='underline pl-2 cursor-pointer'>Sign-Up</a> </h1>
                </div>

                {/* Form */}
                <div >


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

                          Sign in
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </form>


                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
