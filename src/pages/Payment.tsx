import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
// import Sidebar from "../partials/Sidebar";
import PricingTables from "../partials/PricingTables";
import PlansCheckBox from "../partials/PlansCheckBox";


function Payment() {

    // let [isOpen, setIsOpen] = useState(false)

    // function closeModal() {
    //     setIsOpen(false)
    // }

    // function openModal() {
    //     setIsOpen(true)
    // }

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [planInfos, setPlanInfos] = useState([])
    const getPlanInfos = async () => {
        //   setIsPlansLoading(true)
        await axios.get(`http://localhost:5000/api/v1/plans`)
            .then((res) => {
                setPlanInfos(res?.data.planInfos)
            })
        //   setIsPlansLoading(false)
    }
    const [selected, setSelected] = useState(null)
    useEffect(() => {
        getPlanInfos()
    }, [])
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
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold"> Purchase tokens</h1>
                            </div>
                        </div>

                        <div >
                            <PricingTables planInfos={planInfos} />
                            <h2 className="my-4 text-xl text-blue-500 font-bold">Update plan</h2>
                            <PlansCheckBox selected={selected} setSelected={setSelected} plans={planInfos} />
                            <div className="mx-auto w-full max-w-md mb-2 rounded-md  cursor-pointer  font-bold text-center z-6 text-white bg-blue-500 py-3">
                                <button>
                                    Switch plan
                                </button>
                            </div>

                        </div>
                        {/* Toast container */}
                    </div>
                </main>

            </div>

        </div>
    );
}

export default Payment;
