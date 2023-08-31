import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
// import Sidebar from "../partials/Sidebar";
import PricingTables from "../partials/PricingTables";
import PlansCheckBox from "../partials/PlansCheckBox";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { clearPlan } from "../redux/ui-slice";
import { TailSpin } from "react-loader-spinner";

function Payment() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [message, setMessage] = useState(false)

    const [planInfos, setPlanInfos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getPlanInfos = async () => {
        //   setIsPlansLoading(true)
        setIsLoading(true)
        await axios.get(`https://seashell-app-2-n2die.ondigitalocean.app//api/v1/plans`)
            .then((res) => {
                setPlanInfos(res?.data.planInfos)
                console.table(res?.data.planInfos)

            })
        //   setIsPlansLoading(false)
        setIsLoading(false)
    }
    const [selected, setSelected] = useState(null)
    useEffect(() => {
        getPlanInfos()
    }, [])

    const { plan } = useSelector((state) => state.uiSlice)
    const { user, hasSubscription } = useSelector((state) => state.auth)

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
        location.reload();
    }

    function openModal() {
        setIsOpen(true)
    }

    const [isSwitching, setSwitching] = useState(false)
    const handleSwitchPlan = async () => {
        setSwitching(true)
        try {
            const response = await axios.post("https://seashell-app-2-n2die.ondigitalocean.app//api/v1/update-subscription", {
                customerId: user?.customerId,
                currentSubscriptionId: user?.subscriptionId,
                newPlanId: plan.id
            });


            // Handle success response if needed
            setIsOpen(true)
            dispatch(clearPlan({}))

            console.log("Success:", response.data);
        } catch (error) {
            // Handle error
            setMessage(error.response ? error.response.data : error.message)
            console.error("Error:", error.response ? error.response.data : error.message);
        }
        setSwitching(false)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearPlan({}))
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
                            {hasSubscription && <>
                                <h2 className="my-4 text-xl text-blue-500 font-bold">Update plan</h2>
                                <PlansCheckBox selected={selected} setSelected={setSelected} plans={planInfos} />
                                <p className="my-3 text-red-600">{message ? message : ""}</p>
                                <div className="flex flex-col justify-center items-center">
                                    <button disabled={plan === null}
                                        onClick={handleSwitchPlan}
                                        className="mx-auto w-full max-w-md mb-2 rounded-md cursor-pointer  font-bold text-center z-6 text-white bg-blue-500 py-3">
                                        {isSwitching ? "Switching..." : "Switch plan"}
                                    </button>
                                    <p className="text-red-600 text-center">{message}</p>
                                    {isLoading && <TailSpin
                                        height="80"
                                        width="80"
                                        color="#1b54f0"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />}
                                </div>
                            </>}

                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-gray-900"
                                                    >
                                                        Plan Switched
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Your plan has been switched successfully
                                                        </p>
                                                    </div>

                                                    <div className="mt-4">
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>

                        </div>
                        {/* Toast container */}
                    </div>
                </main>

            </div>

        </div>
    );
}

export default Payment;
