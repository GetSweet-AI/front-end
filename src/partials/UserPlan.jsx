import React from "react";

export default function UserPlan({ planName, sideBarOpen }) {
    const getShortForm = (planName) => {
        switch (planName) {
            case "Free":
                return "Fr";
            case "Premium":
                return "PR";
            case "Business":
                return "Bus";
            case "Growth":
                return "Gr";
            default:
                return "Free";
        }
    };

    return (
        <div
            id="toast-default"
            className="flex items-center w-full max-w-xs p-3 text-gray-200 rounded-l-lg bg-gray-800"
            role="alert"
        >
            {planName === "Free" &&
                <div className="inline-flex items-center justify-center flex-shrink-0 px-2 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                    <strong>{sideBarOpen ? planName : getShortForm(planName)}</strong>
                </div>
            }
            {sideBarOpen ? (
                <div className="">
                    {planName !== "Free" && <p className="text-sm font-normal mr-3">Current Plan</p>
                    }    {planName === "Free" ? (
                        <a className="block mt-0.1 ml-3 text-sm text-red-500 font-medium hover:scale-x-105" href="/payment">
                            Upgrade
                        </a>
                    ) : null}
                </div>
            ) : (
                <></>
            )}
            {planName !== "Free" &&
                <div className="inline-flex items-center justify-center flex-shrink-0 px-2 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                    <strong>{sideBarOpen ? planName : getShortForm(planName)}</strong>
                </div>
            }
        </div>
    );
}
