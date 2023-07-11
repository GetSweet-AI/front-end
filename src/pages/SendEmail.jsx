import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, settEmail, switchLoginStatus } from "../redux/auth";
import { clearMessage, setMessage } from "../redux/message";
import { ColorRing, MutatingDots, Puff } from 'react-loader-spinner'

const initialState = {
    email: "",
};

function SendEmail() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [visible, setIsVisible] = useState(false)

    const { message } = useSelector((state) => state.message)


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        dispatch(clearMessage())
    }, [])


    const sendVerificationCode = async (currentUser) => {
        setLoading(true)
        try {
            const { data } = await axios.post("https://seashell-app-8amlb.ondigitalocean.app/api/v1/auth/send-verification-code", {
                email: values.email
            });
            // const { user, token } = data;
            console.log("Data : ")
            navigate('/verify-email')
            dispatch(settEmail(values.email))
        } catch (error) {
            // alert(error.response.data.msg)
            setMessage(error.response.data.msg)
            console.log("error " + error.response.data.error)
            dispatch(setMessage(error.response.data.error))
        }
        setLoading(false)
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email } = values;
        // loginUser(values)
        // console.log(JSON.stringify(values))
        // navigate('/verify-email')
        sendVerificationCode()
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

                                <div className="max-w-sm mx-auto text-start pb-12 md:pb-10">
                                    <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">Send verification code</h1>
                                    <h1 className=" font-cabinet-grotesk">You will receive a verification code</h1>
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

                                        <p className="flex text-sm my-1 justify-center items-center text-red-600">
                                            {message}
                                        </p>

                                        <div className="flex flex-col flex-wrap -mx-3 mt-6">
                                            <div className="w-full px-3">

                                                <button
                                                    type="submit"
                                                    className="font-bold text-white bg-gradient-to-r from-[#9394d2] to-[#4446e4] py-3 w-full">

                                                    Send verification code
                                                </button>
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
                                                {/* </Link> */}
                                            </div>
                                            <div className="mt-5">
                                                <label className="flex items-start">
                                                    {/* <input type="checkbox" className="form-checkbox mt-0.5" defaultChecked /> */}
                                                    <span className="text-xs text-gray-500 ml-3">
                                                        Please allow-1-2 minutes for the email to arrive.

                                                    </span>
                                                </label>
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

export default SendEmail;
