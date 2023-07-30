import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
// import Sidebar from "../partials/Sidebar";
import PricingTables from "../partials/PricingTables";


const initialState = {
    email: "",
    password: "",
    company: "",
    fullName: ''
};

function ManageSubscription() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold"> Manage subscription</h1>
                            </div>
                        </div>

                        <div >
                            {/* <PricingTables /> */}
                            <div className="flex justify-between mt-6">
                                <div className="md:w-[200px]">
                                    <a
                                        href={user?.invoiceUrl}
                                        target="_blank"
                                    >
                                        <button className="flex px-2 items-center justify-center w-full bg-[green] font-semibold py-[6px] text-white rounded-md text-sm">
                                            Download Invoice
                                        </button>
                                    </a>
                                    {/* <a
                                        href="https://billing.stripe.com/p/login/test_00g7vnfPXaLh6zu288"
                                        target="_blank"
                                    >
                                        <button className="flex px-2 items-center justify-center w-full bg-[green] font-semibold py-[6px] text-white rounded-md text-sm">
                                            Manage Subscription
                                        </button>
                                    </a> */}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Toast container */}
                    {/* </div> */}
                </main>

            </div >

        </div >
    );
}

export default ManageSubscription;
