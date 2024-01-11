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
import { Link } from 'react-router-dom'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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



    const { message, activeBrandID } = useSelector((state) => state.message);

    //Get brand engagement by userId
    const [activeBrandId, setActiveBrandId] = useState(null)
    console.log("active :" + activeBrandId)
    const [engagements, setEngagements] = useState([]);
    const [engagementsData, setEngagementsData] = useState([]);
    const fetchEngagements = async () => {
        setIsLoading(true);
        try {
            fetch(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements-np/${user?._id}`)
                .then((response) => response.json())
                .then(({ brandEngagements }) => {
                    const brandEngagementsNewArray = brandEngagements.map(({ _id, BrandName }) => ({
                        label: BrandName,
                        value: _id,
                    }));
                    setEngagementsData(brandEngagements)
                    // setEngagementsData(brandEngagements.filter(
                    //     (brandEngagement) => brandEngagement.attachedPicture.length > 0
                    // ))

                    // brandEngagementsNewArray[0] && handleSelectChange("brandEngagementId", brandEngagementsNewArray[0])
                    if (activeBrandID) {
                        handleSelectChange("brandEngagementId", brandEngagementsNewArray.find((item) => item.value === activeBrandID))
                    } else if (brandEngagementsNewArray[0]) {
                        handleSelectChange("brandEngagementId", brandEngagementsNewArray[0])
                    }

                    setEngagements(brandEngagementsNewArray);

                    if (activeBrandId === null) {
                        setActiveBrandId(brandEngagements[0]?._id)
                    }

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

    const deleteImage = async (picture) => {
        console.log('imageUrl :' + picture)

        // Check if imageUrl is a valid string
        if (typeof picture !== 'string') {
            console.error('Invalid picture:', picture);
            return;
        }
        const be = activeBrandId
        try {
            await axios.delete(`https://seal-app-dk3kg.ondigitalocean.app/api/delete-image?brandEngagementID=${activeBrandId}&imageUrl=${picture}`, {
                imageUrl: picture
            }).then(() => {
                toast.success("Picture deleted successfully");
                fetchEngagements()
            })


        } catch (error) {
            console.log('An error ocurred')
        }
    }


    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Toast container */}
            < ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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

                        {engagementsData.length > 0 ?
                            <>
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
                            </>
                            :
                            <p className="">
                                You have to create a brand engagement to link it with pictures. <a href="/brand-engagement-builder" className="text-blue-600 underline">Add brand voice</a>
                            </p>
                        }

                        {/* <div className='grid grid-cols-1 content-center relative sm:grid-cols-2 md:grid-cols-6 gap-4 p-4'> */}
                        <div className='flex flex-wrap p-4 space-x-2'>
                            {/* {
                                engagementsData.length > 0 ? */}
                            <>  {engagementsData.map((brandEngagement) => (
                                <section key={brandEngagement._id}
                                    className={`shadow-xl text-md   rounded-xl             ${brandEngagement._id === activeBrandId ? 'bg-blue-400 text-white' : ''}`}>
                                    <div
                                        onClick={() => setActiveBrandId(brandEngagement._id)}
                                        className={`p-2 text-center cursor-pointer 
   `}>
                                        <h3 className="text-md font-medium ">{brandEngagement.BrandName}</h3>
                                    </div>



                                </section>

                            ))}
                            </>
                            {/* :
                                    <p className="">
                                        You haven't yet saved any brand engagement. <a href="/brand-engagement-builder" className="text-blue-600 underline">Add brand voice</a>

                                    </p>

                            } */}
                        </div>
                        <div className=''>
                            {engagementsData.map((brandEngagement) => (

                                brandEngagement._id === activeBrandId && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  ">

                                        {brandEngagement.attachedPicture.length > 0 ?
                                            <> {brandEngagement.attachedPicture.map((picture, index) => (
                                                <div className="p-2">
                                                    <button onClick={() => deleteImage(picture)} className="flex  text-end justify-end">

                                                        <p className="border-2 border-red-400 
                                                        cursor-pointer  hover:bg-red-400 
                                                        text-center px-[8px] rounded-full font-bold
                                                          hover:text-white text-red-500  ">x</p>
                                                    </button>
                                                    <Link to={picture}>
                                                        <img
                                                            key={index}
                                                            src={picture}
                                                            alt={`Brand Engagement - ${brandEngagement.BrandName}`}
                                                            className="h-48  w-[28rem] object-contain  hover:scale-105 rounded-xl"
                                                        /></Link>
                                                </div>
                                            ))}
                                            </>
                                            :
                                            <p className="text-red-700 p-2">You haven't attached any image yet </p>
                                        }



                                    </div>
                                )




                            ))}
                        </div>
                    </div>




                </main>
            </div>
        </div>
    );
}

export default Assets;


