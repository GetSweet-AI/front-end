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

const url = "http://localhost:5000/uploads"

function Assets() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const { token, user } = useSelector((state) => state.auth);


    const [postImage, setPostImage] = useState({ myFile: "" })

    const createPost = async (newImage) => {
        try {
            await axios.post(url, newImage)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postImage)
        console.log("Uploaded")
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setPostImage({ ...postImage, myFile: base64 })
    }





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
                                    Assets
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
                        {/* {engagements?.length > 0 && (
              <div className="">
                <div className="grid grid-cols-12 gap-6">
                  {engagements.
                    filter((brand) => {
                      // const { email } = brand?.user;
                      if (search == "") {
                        return brand;
                      } else if (brand?.email !== null &&
                        (brand?.WebSite.toLowerCase().includes(search.toLocaleLowerCase()) || brand?.BrandName.toLowerCase().includes(search.toLocaleLowerCase()))
                      ) {
                        return brand;
                      }
                    }).
                    map((item) => {
                      return (
                        <BrandEngagementCard
                          key={item._id}
                          id={item._id}
                          brandName={item?.BrandName}
                          postContent={item?.postContent}
                          website={item.WebSite}
                          timeZone={item.Timezone}
                          companySector={item.CompanySector}
                          brandTone={item.BrandTone}
                          targetAudience={item.TargetAudience}
                          postType={item.PostType}
                          relatedPostsStatus={item.relatedPostsStatus}
                          fetchEngagements={fetchEngagements}
                          isArchive={true}

                        />
                      );
                    })}
                </div>
              </div>
            )} */}

                        {/* <UploadImage /> */}




                    </div>
                    <div className="App">
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="file-upload" className='custom-file-upload'>
                                <img src={postImage.myFile} alt="" />
                            </label>

                            <input
                                type="file"
                                lable="Image"
                                name="myFile"
                                id='file-upload'
                                accept='.jpeg, .png, .jpg'
                                onChange={(e) => handleFileUpload(e)}
                            />

                            <h3>Doris Wilder</h3>
                            <span>Designer</span>

                            <button type='submit'>Submit</button>
                        </form>
                    </div>



                </main>
            </div>
        </div>
    );
}

export default Assets;


function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}