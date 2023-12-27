import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, switchLoginStatus } from "../redux/auth";
import { MutatingDots, Puff } from 'react-loader-spinner'
import { clearMessage, setMessage } from "../redux/message";
import logo from "../images/logogetsweet.png";

const initialState = {
    verificationCode: null
};

function VerifyEmail() {

    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [visible, setIsVisible] = useState(false)

    const { message } = useSelector((state) => state.message)
    const { email } = useSelector((state) => state.auth)
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch()

    const verifyVerificationCode = async () => {
        setLoading(true)
        try {
            await axios.post("https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/verify-email", {
                email: email,
                verificationCode: parseInt(values.verificationCode, 10)
            });
            navigate('/reset-password')
        } catch (error) {
            dispatch(setMessage(error.response.data.error))
        }
        setLoading(false)
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = values;

        // loginUser(values)
        // console.log(JSON.stringify(values))
        verifyVerificationCode()

    }
    useEffect(() => {
        dispatch(clearMessage())
    }, [])

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
                                    <a href="/" className="flex w-[20%] ml-[40%] py-4 rounded-full  border border-[#6366F1] justify-center mb-6 items-center">
                                        <img src={logo} alt="logo" className="w-10 h-10 animate-bounce " />
                                    </a>
                                    <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">Verification Code Entry</h1>
                                    <h1 className=" font-cabinet-grotesk">Please enter the verification code you have received. </h1>
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
                                                    Verification Code
                                                </label>
                                                <input
                                                    type="number"
                                                    name="verificationCode"
                                                    value={values.verificationCode}
                                                    onChange={handleChange}
                                                    className="form-input w-full rounded-full text-gray-700"
                                                    placeholder="Enter your verification code "
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

                                                    Verify Email
                                                </button>
                                                {/* </Link> */}
                                            </div>

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

export default VerifyEmail;
