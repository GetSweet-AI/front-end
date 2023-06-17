import React from 'react'

export default function CheckEmail() {
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
                                    <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">Email confirmation sent</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check mt-6" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6366F1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                    <h1 className="h5 mt-4 font-cabinet-grotesk text-[#1a1a2d]">Please check your email</h1>
                                </div>

                                {/* <h2>{userId}</h2> */}

                                {/* Form */}
                                <div >

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
