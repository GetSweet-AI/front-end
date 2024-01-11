import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
// import Sidebar from "../partials/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser, setUserData } from "../redux/auth";
import MyModal from "../partials/Modal";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  company: "",
  fullName: "",
};

function TheProfile() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [userData, setUser] = useState([]);
  const fetchUserData = async () => {
    await axios
      .get(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/users/${user?._id}`
      )
      .then((res) => {
        setUser(res.data);
        // dispatch(setUserData(res?.data.user))
        console.log("res?.data :" + JSON.stringify(res?.data));
        if (res.data) {
          const { email, password, company, fullName } = res.data?.user;
          setValues({ email, password, company, fullName });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
    fetchUserData();
  }, []);

  const updateAuthInfos = async (currentUser) => {
    setLoading(true);

    const { password, confirmPassword } = values

    try {
      if (isChecked) {

        await axios
          .put(
            `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/update/${user?._id}`,
            { email: currentUser?.email }
          )
          .then((res) => {
            axios.post(
              "https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/reset-password",
              {
                email: res?.data.user?.email,
                newPassword: values.password,
              }
            ).then((res) => {
              dispatch(clearMessage())
            })
          });

      } else {
        await axios.put(
          `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/update/${user?._id}`,
          currentUser
        );
      }

      fetchUserData()
      setLoading(false);
      // alert("");
      // alert("User info updated")
      // Show a toast message
      toast.success("User info updated");
      dispatch(
        setUserData({
          ...user,
          company: values.company,
          fullName: values.fullName,
          email: values.email,
        })
      );
    } catch (error) {
      // console.log("Error updating user info:", error.response.data.msg);
      // alert("Failed to update user info");
      dispatch(setMessage(error.response.data.error));
      setLoading(false);
    }

    setLoading(false);
  };

  const updateGeneralInfo = async (currentUser) => {
    setLoading(true);

    try {

      await axios.put(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/update-general-info/${user?._id}`,
        currentUser
      );
      fetchUserData()
      setLoading(false);
      // alert("");
      // alert("User info updated")
      // Show a toast message
      toast.success("General info updated");
      dispatch(
        setUserData({
          ...user,
          company: values.company,
          fullName: values.fullName,
        })
      );
    } catch (error) {
      // console.log("Error updating user info:", error.response.data.msg);
      // alert("Failed to update user info");
      dispatch(setMessage(error.response.data.error));
      setLoading(false);
    }

    setLoading(false);
  };

  const deleteUser = async () => {
    await axios.delete(
      `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/users/${user?._id}`, {
      email: user?.email
    }
    )
      .then((res) => {
        toast.success("User deleted successfully");

      }).then((res) => {
        dispatch(logoutUser());
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, fullName, company, password, confirmPassword } = values;

    if (isChecked && (password !== confirmPassword)) {
      dispatch(setMessage("Passwords do not match"))
    } else {
      updateAuthInfos(values);
      console.log(JSON.stringify(values));
    }

  };
  const onSubmitTwo = async (e) => {
    e.preventDefault();
    const { email, fullName, company } = values;

    updateGeneralInfo(values);
    console.log(JSON.stringify(values));
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [editGeneralInfo, setEditGeneralInfo] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/*  Site header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}


            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                  {" "}
                  Edit personal info
                </h1>
              </div>
            </div>

            <div>
              <div className="max-w-8xl shadow-md bg-blue-50 md:mx-auto px-4 md:px-6 ">
                <div
                  className="pt-10 pb-10 md:translate-y-[20%]  lg:translate-y-0   lg:pb-16 
            flex justify-center items-center"
                >

                  <div className="bg-white bg-opacity-10 px-2 
                   py-5 opacity-90 md:space-y-0 space-x-3
                    rounded-xl  grid grid-cols-1 md:grid-cols-2 gap-3 w-full">

                    {/* Update General Infos form */}
                    <form
                      onSubmit={onSubmit}
                      className="max-w-sm mx-auto md:mt-8 "
                    >
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-700 text-sm font-medium mb-1"
                            htmlFor="email"
                          >
                            Email address
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

                        <div className="w-full my-4 flex px-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <label
                            className="block ml-2 text-gray-700 text-sm font-medium mb-1"
                            htmlFor="email"
                          >
                            {" "}
                            Reset password
                          </label>
                        </div>
                        {isChecked && (
                          <div className="flex w-full flex-col">
                            <div className="w-full px-3">
                              <label
                                className="block mb-2 text-gray-700 text-sm font-medium "
                                htmlFor="email"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className="form-input w-full rounded-full text-gray-700"
                                placeholder="Password"
                              />
                            </div>
                            <div className="w-full px-3">
                              <label
                                className="block text-gray-700 text-sm font-medium my-2"
                                htmlFor="email"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                className="form-input w-full rounded-full text-gray-700"
                                placeholder="Confirm Password"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="flex justify-center items-center text-red-600">
                        {message}
                      </p>

                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          {/* <Link to="/services"> */}
                          <button
                            type="submit"
                            className="font-bold 
                             text-gray-800 bg-gradient-to-r
                              from-gsBlue to-gsBlueTwo py-3 w-full"
                          >
                            Update
                          </button>

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
                          {/* </Link> */}
                        </div>
                      </div>
                    </form>


                    {/* Update AUth Infos form */}
                    <div> <form
                      onSubmit={onSubmitTwo}
                      className="max-w-sm mx-auto md:mt-8 "
                    >
                      <div className="flex flex-wrap -mx-3 mb-4">

                        <div className="w-full px-3">
                          <label
                            className="block text-gray-700 text-sm font-medium mb-1"
                            htmlFor="email"
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
                            className="block my-2 text-gray-700 text-sm font-medium mb-1"
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
                            placeholder="Enter your brand name "
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
                            className="font-bold 
                            text-gray-800 bg-gradient-to-r
                             from-gsBlue to-gsBlueTwo py-3 w-full"
                          >
                            Update
                          </button>

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
                          {/* </Link> */}
                        </div>
                      </div>
                    </form>

                      <div className="max-w-sm mx-auto">
                        <button
                          onClick={openModal}
                          className="font-bold w-full text-white mt-3 bg-[#ef3717] py-3"
                        >
                          Delete my account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Toast container */}
            <ToastContainer />

            <MyModal
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
              deleteAccount={deleteUser}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default TheProfile;
