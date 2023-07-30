import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { MutatingDots, Puff } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
// import Sidebar from "../partials/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser, setUserData } from "../redux/auth";
import MyModal from "../partials/Modal";
import PostCard from "../partials/PostCard";
import Video from "../partials/Video";
import SwitchButton from "../partials/SwitchButton";

async function downloadVideo(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = getFilenameFromUrl(url);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        return true;
    } catch (error) {
        console.error('Error downloading video:', error);
        return false;
    }
}

function getFilenameFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

function PostsFeed() {

    const { token, user } = useSelector((state) => state.auth)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [feedPosts, setFeedPosts] = useState([]);
    const [adminFeedPosts, setAdminFeedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isUserDataLoading, setIsUserDataLoading] = useState(false)

    const [isAdmin, setIsAdmin] = useState(false)

    const fetchUserFeedPosts = async () => {
        setIsUserDataLoading(true)
        await axios
            .get(
                `http://localhost:5000/api/v1/feed-posts/${user?._id}`
            )
            .then((res) => {
                setFeedPosts(res.data?.feedPosts);
                // console.log("res?.data :" + JSON.stringify(res?.data))
            })
            .catch((err) => {
                console.log(err);
            });
        setIsUserDataLoading(false)
    };
    const fetchAllFeedPosts = async () => {
        setIsLoading(true)

        await axios
            .get(
                `http://localhost:5000/api/v1/admin/feedposts?userId=${user?._id}`
            )
            .then((res) => {
                setAdminFeedPosts(res.data);
                console.log("AdminFeedPosts :" + JSON.stringify(res?.data))
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false)
    };
    const deletePostFeed = async (id) => {
        await axios
            .delete(
                `http://localhost:5000/api/v1/feed-posts/${id}`
            )
            .then((res) => {
                console.log("Post feed deleted")
                fetchUserFeedPosts()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchUserFeedPosts();
        fetchAllFeedPosts();
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

    const [enabled, setEnabled] = useState(false)

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
                    {isLoading && enabled && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                        <MutatingDots
                            height="100"
                            width="100"
                            color="#1c7aed"
                            secondaryColor='#3078fd'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>}
                    {isUserDataLoading && !enabled && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                        <MutatingDots
                            height="100"
                            width="100"
                            color="#1c7aed"
                            secondaryColor='#3078fd'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>}
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Page header */}
                        <div className="flex justify-between items-center ">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">{enabled ? "Admin" : "User"} Feed Posts</h1>
                            </div>
                            <div>
                                {user?.role === "admin" ? <SwitchButton enabled={enabled} setEnabled={setEnabled} /> : <></>}
                            </div>

                        </div>

                        <div >
                            <ToastContainer />


                            {enabled ?
                                adminFeedPosts?.length > 0 && (
                                    <div className="">
                                        <div className="grid grid-cols-12 gap-6">
                                            {adminFeedPosts.map((item) => {
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
                                                        DownloadButton={downloadVideo}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                                :
                                feedPosts?.length > 0 && (
                                    <div className="">
                                        <div className="grid grid-cols-12 gap-6">
                                            {feedPosts.map((item) => {
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
                                                        DownloadButton={downloadVideo}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )

                            }
                        </div>
                        {/* Toast container */}

                    </div>
                </main>
            </div>

        </div>
    );
}

export default PostsFeed;
