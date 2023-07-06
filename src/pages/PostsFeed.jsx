import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
// import Sidebar from "../partials/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser, setUserData } from "../redux/auth";
import MyModal from "../partials/Modal";
import PostCard from "../partials/PostCard";
import Video from "../partials/Video";



function PostsFeed() {

    const { token, user } = useSelector((state) => state.auth)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [engagements, setEngagements] = useState([]);

    const fetchEngagements = async () => {
        await axios
            .get(
                `https://seashell-app-8amlb.ondigitalocean.app/api/v1/feed-posts/${user?._id}`
            )
            .then((res) => {
                setEngagements(res.data?.feedPosts);
                console.log("res?.data :" + JSON.stringify(res?.data))
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deletePostFeed = async (id) => {
        await axios
            .delete(
                `https://seashell-app-8amlb.ondigitalocean.app/api/v1/feed-posts/${id}`
            )
            .then((res) => {
                console.log("Post feed deleted")
                fetchEngagements()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchEngagements();
    }, []);


    // console.log("Token " + token)
    const handleCopyText = (result) => {
        // Convert HTML to plain text
        const tempElement = document.createElement('div');
        tempElement.innerHTML = result;
        const plainText = tempElement.innerText;

        // Copy the plain text to the clipboard
        navigator.clipboard.writeText(plainText);

        // Show a toast message
        toast.success('Text copied successfully!');
    };

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
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">Posts Feed</h1>
                            </div>

                        </div>

                        <div >
                            <ToastContainer />
                            {engagements?.length > 0 && (
                                <div className="">
                                    <div className="grid grid-cols-12 gap-6">
                                        {engagements.map((item) => {
                                            return (
                                                <PostCard
                                                    key={item._id}
                                                    id={item._id}
                                                    MediaUrl={item.MediaUrl}
                                                    deleteFeedPost={deletePostFeed}
                                                    Caption={item.Caption}
                                                    Date={item.Date}
                                                    handleCopyText={handleCopyText}
                                                    Accounts={item.Accounts}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Toast container */}

                    </div>
                </main>
            </div>

        </div>
    );
}

export default PostsFeed;
