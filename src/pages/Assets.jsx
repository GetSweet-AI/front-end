import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/SearchForm";
import FilterButton from "../components/DropdownFilter";
import BrandEngagementCard from "../partials/BrandEngagementCard";
import PaginationNumeric from "../partials/PaginationNumeric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image01 from "../images/user-28-01.jpg";
import Image02 from "../images/user-28-02.jpg";
import DashboardHeader from "../partials/DashboardHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import UploadImage from "../components/UploadImage";
import Select from "react-select";

function Assets() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const { token, user } = useSelector((state) => state.auth);



    //Drop down here
    const [values, setValues] = useState({
        brandEngagementId: "",
        brandEngagementName: ""
    });

    const handleSelectChange = (name, selectedOption) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
    };

    //Get brand engagement by userId

    const [engagements, setEngagements] = useState([]);
    const [engagementsData, setEngagementsData] = useState([]);
    const fetchEngagements = async () => {
        setIsLoading(true);
        try {
            fetch(`https://seashell-app-2-n2die.ondigitalocean.app/api/v1/brand-engagements-np/${user?._id}`)
                .then((response) => response.json())
                .then(({ brandEngagements }) => {
                    const brandEngagementsNewArray = brandEngagements.map(({ _id, BrandName }) => ({
                        label: BrandName,
                        value: _id,
                    }));
                    setEngagementsData(brandEngagements)
                    setEngagements(brandEngagementsNewArray);
                    console.log("brandEngagements :" + JSON.stringify(brandEngagementsNewArray))
                });
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchEngagements()
    }, [])

    const isImageExist = async (imageUrl) => {
        try {
            const response = await fetch(`${imageUrl}?type=fetch&fetch_format=auto`, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error('Error checking image existence:', error);
            return false;
        }
    };

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
                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0 ">
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                                    Assets Page
                                </h1>

                            </div>

                            {/* Right: Actions */}
                            <div className="">

                                {/* <input
                                    type="text"
                                    name="search"
                                    placeholder="Search by brandName or website"
                                    onChange={handleChange}
                                    className="form-input focus:border-slate-300"
                                /> */}
                            </div>
                        </div>



                        {/* Cards */}
                        {isLoading && (
                            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                                <MutatingDots
                                    height="100"
                                    width="100"
                                    color="#1c7aed"
                                    secondaryColor="#3078fd"
                                    radius="12.5"
                                    ariaLabel="mutating-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        )}
                        <div className="w-full md:w-1/2 p-2">
                            <label htmlFor="select3" className="block mb-1">
                                Choose a Brand Engagement 🎈
                            </label>
                            <Select
                                id="select3"
                                className="w-full"
                                placeholder="Brand Tone"
                                name="brandEngagementId"
                                value={values.brandEngagementId}
                                onChange={(selectedOption) =>
                                    handleSelectChange("brandEngagementId", selectedOption)
                                }
                                options={engagements}
                            />
                        </div>

                        <UploadImage brandEngagementId={values.brandEngagementId?.value} fetchEngagements={fetchEngagements} />

                        <div className="my-4 sm:mb-0  ">
                            <h1 className="text-xl md:text-3xl text-gray-600 font-bold">
                                Uploaded Images
                            </h1>

                        </div>
                        <div className='grid grid-cols-1 relative sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
                            {engagementsData.filter(
                                (brandEngagement) => brandEngagement.attachedPicture !== ""
                            ).map((brandEngagement) => (
                                <section key={brandEngagement._id} className="shadow-xl p-2 rounded-xl">
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{brandEngagement.BrandName}</h3>
                                        {/* Add other details or components here */}
                                    </div>  {brandEngagement.attachedPicture.length > 0 && (
                                        <div className="flex overflow-x-scroll space-x-2">
                                            {brandEngagement.attachedPicture.map((picture, index) => (
                                                <div>
                                                    <img
                                                        key={index}
                                                        src={picture}
                                                        alt={`Brand Engagement - ${brandEngagement.BrandName}`}
                                                        className="h-48 max-w-xs object-contain"
                                                    />
                                                </div>
                                            ))}

                                        </div>
                                    )}


                                </section>

                            ))}
                        </div>
                    </div>




                </main>
            </div>
        </div>
    );
}

export default Assets;


