import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, switchLoginStatus } from "../redux/auth";
import { useDispatch } from "react-redux";
import { Puff } from "react-loader-spinner";
import EmailSentModal from "../partials/EmailSentModal";
import { clearMessage } from "../redux/message";
import logo from "../images/logogetsweet.png";

const initialState = {
  email: "",
  password: "",
  company: "",
  fullName: "",
};

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(false);

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
    dispatch(clearMessage());
  }, []);

  const registerUser = async (currentUser) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/register",
        currentUser
      );
      const { user, token } = data;
      console.log("Data : " + data);
      axios
        .post(
          `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/users/${user?._id}/send-email-verification`,
          {
            email: user?.email,
          }
        )
        .then((re) => {
          navigate("/check-email");
          setValues(initialState);
        });
      // navigate('/brand-engagement-builder')
      // dispatch(switchLoginStatus(token))
      dispatch(setUserData(user));
    } catch (error) {
      // alert(error.response.data.msg)
      setMessage(error.response.data.msg);
    }
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    registerUser(values);
    console.log(JSON.stringify(values));
  };

  return (
    <div className="flex flex-col min-h-screen  relative overflow-hidden ">
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <style>
        {`
          .overlay {
            z-index: 1; 
            position: relative; 
            background-color: rgba(255, 255, 255, 0.9); 
            padding: 2rem; 
          }
        `}
      </style>
      {/* Header */}

      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className=" flex lg:flex-1">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <img
                className=" h-10 w-auto mr-2" // <-- Moved the comment out of the JSX attribute area
                src={logo}
                alt="GetSweet.AI logo icon"
              />
              {/* Added 'mr-2' for some spacing between the logo and the text */}
              <span className="font-bold text-xl text-gray-900">
                GetSweet.AI
              </span>
            </a>
          </div>
        </nav>
      </header>

      {/*  Site header */}

      {/*  Page content */}
      <main className=" ">
        {/*  Page illustration */}

        <section className="relative  ">
          <div className="max-w-7xl md:mx-auto px-4 md:px-6 ">
            <div
              className="pt-32 pb-10 md:translate-y-[20%]  lg:translate-y-0   lg:pb-16 
            flex justify-center items-center"
            >
              <div className="overlay bg-white bg-opacity-10 px-2 shadow-2xl py-5 opacity-90 md:w-[70%] lg:w-[45%] w-full rounded-xl">
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10">
                  {/* <h3 className="text-2xl font-bold  text-[#6366F1]">
                    Login to your account
                  </h3> */}
                  <div className="max-w-sm mx-auto text-start ">
                    <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">
                      Create Your GetSweet.AI Account
                    </h1>
                    <h1 className=" font-cabinet-grotesk">
                      Already have an account?{" "}
                      <a
                        href="/signin"
                        className="underline pl-2 cursor-pointer"
                      >
                        Sign-in
                      </a>{" "}
                    </h1>
                  </div>
                </div>

                {/* Form */}
                <div>
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
                        <label className="block text-gray-700 text-sm font-medium mb-1">
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
                          className="font-bold text-white bg-gradient-to-r from-[#9394d2] to-[#4446e4] py-3 w-full"
                        >
                          Sign Up
                        </button>
                        {/* </Link> */}
                      </div>
                      {loading && (
                        <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                          {" "}
                          <Puff
                            height="100"
                            width="100"
                            color="#4446e4"
                            secondaryColor="#4446e4"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        </div>
                      )}
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
