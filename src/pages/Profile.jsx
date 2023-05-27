import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useSelector } from "react-redux";
// import Sidebar from "../partials/Sidebar";


const initialState = {
    email: "",
    password: "",
    company: "",
    fullName: ''
};

function Profile() {

    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [visible, setIsVisible] = useState(false)
    const [message, setMessage] = useState(false)

    const { token } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    // Set the Authorization header with the token
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const updateUserInfo = async (currentUser) => {
        await axios.patch("https://seashell-app-8amlb.ondigitalocean.app/api/v1/auth/update-profile", currentUser, { headers })
            .then(response => {
                // Handle the response
                console.log(response.data);
                alert("User Infos updated")

            })
            .catch(error => {
                // Handle the error
                console.error(error);
                setMessage(error.response.data.msg)
            });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, fullName, company } = values;

        updateUserInfo(values)
        console.log(JSON.stringify(values))

    }


    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                {/*  Site header */}
                <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Page header */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Update Profile ✨</h1>
                            </div>
                        </div>

                        <div >


                            <form onSubmit={onSubmit} className="max-w-sm mx-auto md:mt-8 ">
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

                                <p className="flex justify-center items-center text-red-600">
                                    {message}
                                </p>

                                <div className="flex flex-wrap -mx-3 mt-6">
                                    <div className="w-full px-3">
                                        {/* <Link to="/services"> */}
                                        <button

                                            type="submit"
                                            className="font-bold text-white bg-gradient-to-r from-[#9394d2] to-[#4446e4] py-3 w-full">

                                            Update User Info
                                        </button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </form>


                        </div>



                    </div>
                </main>

            </div>

        </div>
    );
}

export default Profile;
