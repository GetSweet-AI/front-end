import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, switchLoginStatus } from "../redux/auth";
import { useDispatch } from "react-redux";
import { Puff } from "react-loader-spinner";
import EmailSentModal from "../partials/EmailSentModal";
import { clearMessage } from "../redux/message";
import logo from "../images/logogetsweet.png";
import LoginGoogle from "../partials/LoginGoogle";


const initialState = {
  email: "",
  password: "",
  company: "",
  fullName: ''
};

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false)
  const [message, setMessage] = useState(false)

  // let [isOpen, setIsOpen] = useState(false)

  // function closeModal() {
  //   setIsOpen(false)
  // }

  // function openModal() {
  //   setIsOpen(true)
  // }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(clearMessage())
  }, [])

  const registerUser = async (currentUser) => {
    setLoading(true)
    try {
      const { data } = await axios.post("https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/register", currentUser);
      const { user, token } = data;
      console.log("Data : " + data)
      axios.post(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/users/${user?._id}/send-email-verification`, {
        email: user?.email
      }).then((re) => {
        navigate('/check-email')
        setValues(initialState)

      })
      // navigate('/brand-engagement-builder')
      // dispatch(switchLoginStatus(token))
      dispatch(setUserData(user))
    } catch (error) {
      // alert(error.response.data.msg)
      setMessage(error.response.data.msg)
    }
    setLoading(false)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    registerUser(values)
    console.log(JSON.stringify(values))

  }


  return (
    <div className="flex flex-col min-h-screen  relative overflow-hidden ">
      {/*  Site header */}


      {/*  Page content */}
      <main className=" ">
        {/*  Page illustration */}

        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
        <section className="relative  ">
          <div
            className="max-w-7xl md:mx-auto px-4 md:px-6 ">
            <div className="pt-32 pb-10 md:translate-y-[20%]  lg:translate-y-0   lg:pb-16 
            flex justify-center items-center">
              <div className="bg-white bg-opacity-10 px-2 shadow-2xl py-5 opacity-90 md:w-[70%] lg:w-[45%] w-full rounded-xl">
                {/* Page header */}
                <div className="max-w-sm mx-auto text-start pb-12 md:pb-10">
                  {/* <h3 className="text-2xl font-bold  text-[#6366F1]">
                    Login to your account
                  </h3> */}
                  <a href="/" className="flex w-[20%] ml-[40%] py-4 rounded-full  border border-[#6366F1] justify-center mb-6 items-center">
                    <img src={logo} alt="logo" className="w-10 h-10 animate-bounce " />
                  </a>
                  <div className="max-w-sm mx-auto text-start ">
                    <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">Create Your GetSweet.AI Account</h1>
                    <h1 className=" font-cabinet-grotesk">Already have an account? <a href="/signin" className='underline pl-2 cursor-pointer'>Sign-in</a> </h1>
                  </div>
                </div>

                <div className="justify-center flex items-center ">   <LoginGoogle title='Sign-up with Google' /></div>
                <hr className="max-w-sm mx-auto my-8" />

                {/* Form */}
                <div >


                  <form onSubmit={onSubmit} className="max-w-sm mx-auto ">
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="email"
                        >
                          Work email address
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
                          Full name
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
                          Company or Brand name
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

                          Sign Up
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


                </div>
              </div>

            </div>
          </div>
        </section>
        {/* <EmailSentModal
          isOpen={isOpen}
          closeModal={closeModal}
          title=" Email confirmation sent"
          desc=' A confirmation email has been sent to your gmail' /> */}
      </main>
    </div>
  );
}

export default SignUp;
