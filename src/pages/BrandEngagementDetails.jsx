import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchForm from '../partials/SearchForm';
import FilterButton from '../components/DropdownFilter';
import BrandEngagementCard from '../partials/BrandEngagementCard';
import PaginationNumeric from '../partials/PaginationNumeric';

import Image01 from '../images/user-28-01.jpg';
import Image02 from '../images/user-28-02.jpg';
import DashboardHeader from '../partials/DashboardHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MutatingDots, ThreeDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import PostCard from '../partials/PostCard';


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
const disclosureData = [
    {
        title: "What is your refund policy?",
        content: "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
    },
    {
        title: "Do you offer technical support?",
        content: "No.",
    },
    // Add more disclosure items as needed
];

// Usage:
// <TheDisclosure data={disclosureData} />

function BrandEngagementDetails() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [engagement, setEngagement] = useState([]);
    const [feedPosts, setFeedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isCloseVisible, setIsCloseVisible] = useState(true)
    const [result, setResult] = useState(null);
    const { token, user } = useSelector((state) => state.auth)

    let { id } = useParams();


    //Fetch brand engagements by ID
    const fetchEngagement = async () => {
        setIsLoading(true)
        await axios
            .get(
                `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/brand-engagement/${id}`
            )
            .then((res) => {
                setEngagement(res.data?.brandEngagement);
                console.log("brandEngagements" + JSON.stringify(res?.data))
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false)
    };
    const fetchFeedPosts = async () => {
        // setIsLoading(true)
        await axios
            .get(
                `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/feed-posts-engagements/${id}`
            )
            .then((res) => {
                setFeedPosts(res.data?.feedPosts);
                console.log("feedPosts" + JSON.stringify(res?.data))
            })
            .catch((err) => {
                console.log(err);
            });
        // setIsLoading(false)
    };

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

    useEffect(() => {
        fetchEngagement();
        fetchFeedPosts()
    }, []);

    const deletePostFeed = async (id) => {
        await axios
            .delete(
                `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/feed-posts/${id}`
            )
            .then((res) => {
                console.log("Post feed deleted")
                fetchUserFeedPosts()
            })
            .catch((err) => {
                console.log(err);
            });
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

                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">{engagement?.BrandName}</h1>
                            </div>

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                {/* Search form */}
                                {/* <SearchForm /> */}
                                {/* Filter button */}
                                {/* <FilterButton align="right" /> */}
                                {/* Create campaign button */}
                                {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 ">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden xs:block ml-2">Create Worflow</span>
                                </button> */}
                            </div>

                        </div>

                        {/* Cards */}
                        {/* {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
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
                        </div>} */}
                        <div className='rounded-lg md:space-y-2 bg-blue-100 text-lg px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                            {/* {id} */}
                            <p><span className='font-bold'>Website:</span> {engagement?.WebSite}</p>
                            <p><span className='font-bold'>Brand Tone:</span> {engagement?.BrandTone}</p>
                            <p><span className='font-bold'>Brand Description:</span> {engagement?.CompanySector}</p>
                            <p><span className='font-bold'>Timezone:</span> {engagement?.Timezone}</p>
                            {/*                            <p><span className='font-bold'>PostType:</span> {engagement?.PostType}</p>
                            <p><span className='font-bold'>Target audience:</span> {engagement?.TargetAudience}</p>*/}
                        </div>
                        {/* <div className="bg-white bg-opacity-10 px-2 shadow-2xl py-5 opacity-90 md:w-[70%] lg:w-[45%] w-full rounded-xl">
                            {engagement.WebSite}
                        </div> */}

                        {/* Pagination */}
                        <div className="mt-8">
                            {/* <PaginationNumeric /> */}
                        </div>
                        {feedPosts.length > 0 && <> <div className='text-xl font-bold my-2 text-blue-600'>
                            Generated feed posts
                        </div>
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
                        </>}
                        {(engagement?.relatedPostsStatus === "Posts generating..." && isCloseVisible) ?
                            <div id="toast-success" className="flex items-center w-full p-4 mt-8 mb-4 text-gray-600 bg-gray-800 text-white rounded-lg shadow  " role="alert">

                                <ThreeDots
                                    height="10"
                                    width="40"
                                    radius="9"
                                    color="#f725b6"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                                <div className="ml-3 text-sm font-medium">New posts are currently generating</div>
                            </div>
                            : <></>}

                    </div>


                </main>

            </div>

        </div>
    );
}

export default BrandEngagementDetails;