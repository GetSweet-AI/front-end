import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/auth";

export default function Success() {

    const dispatch = useDispatch()
    const updateTokens = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/update-available-tokens/64a58d8481e0231585e5f2f0', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // You can include a request body if needed
                // body: JSON.stringify({}),
            });

            if (response.ok) {
                // Handle success
                console.log('Tokens updated successfully');
            } else {
                // Handle error
                console.error('Failed to update tokens');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const { user } = useSelector((state) => state.auth)

    const getUserData = async () => {
        await axios.get(`http://localhost:5000/api/v1/auth/users/${user?._id}`).then(() => {
            dispatch(setUserData(res?.data.user))
        })
    }

    useEffect(() => {
        getUserData()
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

                                <div className="max-w-sm mx-auto flex flex-col justify-center items-center text-start pb-12 md:pb-10">
                                    <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">      Thanks for your purchase</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check mt-6" width="140" height="140" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6366F1" fill="none" stroke-linecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                </div>

                                {/* <h2>{userId}</h2> */}

                                {/* Form */}
                                <div className='flex flex-col '>
                                    <Link to='/brand-engagement-builder'>                 <div className='flex space-x-8 justify-center'>

                                        <button

                                            type="submit"
                                            className="font-bold  text-white bg-gradient-to-r from-[#9394d2] to-[#4446e4] py-4 w-[60%]">
                                            Let's generate your first post!
                                        </button>
                                    </div></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}