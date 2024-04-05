import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchForm from '../partials/SearchForm';
import FilterButton from '../components/DropdownFilter';
import BrandEngagementCard from '../partials/BrandEngagementCard';
import PaginationNumeric from '../partials/PaginationNumeric';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faPinterest, faSnapchat, faTiktok, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArchive, faBlog, faFaceMehBlank, faLink, faUsers } from "@fortawesome/free-solid-svg-icons";
import Image01 from '../images/user-28-01.jpg';
import Image02 from '../images/user-28-02.jpg';
import DashboardHeader from '../partials/DashboardHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MutatingDots, ThreeDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import PostCard from '../partials/PostCard';
import CheckConnectedAccount from '../utils/ChechConnectedAccount';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from '../components/Confetti';
import ProgressBarWithMessages from '../components/ProgressBarWithMessages';

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
                `https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagement/${id}`
            )
            .then((res) => {
                setEngagement(res.data?.brandEngagement);
                // console.log("brandEngagements" + JSON.stringify(res?.data))
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false)
    };

    //Fetch related feed posts with pagination
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    const fetchFeedPosts = async () => {
        setIsLoading(true)
        await axios
            .get(
                `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${id}?page=${pageNumber}`
            ).then((response) => {
                setFeedPosts(response.data?.feedPosts);
                setNumberOfPages(response.data?.totalPages)
                console.log("feedPosts" + JSON.stringify(response?.data))
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false)
    };

    useEffect(() => {
        fetchFeedPosts()
    }, [pageNumber])

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
                `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${id}`
            )
            .then((res) => {
                console.log("Post feed deleted")
                fetchUserFeedPosts()
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [isLoadingCC, setIsLoadingCC] = useState(false);

    const getClientConnect = async () => {
        setIsLoadingCC(true)
        try {
            const response = await axios.get(
                `https://seal-app-dk3kg.ondigitalocean.app/api/v1/client-connect/${id}`
            );
            console.log("Client connect :" + response.data); // Success message or response data
            // Perform any additional actions after successful deletion
            // window.location.href = response.data?.ConnectLinkURL
            // Open the URL in a new window or tab
            window.open(response.data?.ConnectLinkURL, '_blank');
        } catch (error) {
            console.log(error); // Handle error
        }
        setIsLoadingCC(false)
    };

    //Check if BE has connectURL or no
    const [hasConnectUrl, setHasConnectUrl] = useState(false)
    async function checkConnectLinkExistsByBrandEngagementID() {
        // setIsLoadingCC(true)
        try {
            // Make a request to the endpoint to get the ConnectLinkURL
            const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/check-connect-link-exists/${id}`);

            // Extract the hasConnectLinkURL from the response
            setHasConnectUrl(response.data?.hasConnectLinkURL)
            console.log("hasConnectUrl : " + response.data?.hasConnectLinkURL)
        } catch (error) {
            // Handle errors if necessary
            console.error('Error   :', error);
        }
        // setIsLoadingCC(false)
    }

    useEffect(() => {
        checkConnectLinkExistsByBrandEngagementID()
    }, [])

    //Fetch clinet connect data
    const [clientConnectData, setClientConnectData] = useState("")
    const getClientConnectData = async () => {
        try {
            const response = await axios.get(
                `https://seal-app-dk3kg.ondigitalocean.app/api/v1/client-connect/${id}`
            );
            console.log("Client connect data :" + JSON.stringify(response.data)); // Success message or response data
            // Perform any additional actions after successful deletion
            setClientConnectData(response.data)

        } catch (error) {
            console.log(error); // Handle error
        }
    };

    useEffect(() => {
        getClientConnectData()
    }, [])

    const isAnAccountConnected = CheckConnectedAccount(clientConnectData)
    // console.log("isAnAccountConnected :" + isAnAccountConnected)

    const urlParams = new URLSearchParams(window.location.search);

    const [showConfetti, setShowConfetti] = useState(false); // Initialize as false
    useEffect(() => {
        // In the component where you render the modal, check for the modal parameter in the URL
        const modalType = urlParams.get('modal');

        // Then, conditionally render the modal based on the modalType
        if (modalType === 'congratulations') {
            // Render your congratulations modal
            setShowConfetti(true)
        }
    }, [])

    //  ProgressBarWithMessages 
    const [previewProgress, setPreviewProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState("Starting Generation Process");


    useEffect(() => {
        const interval = setInterval(() => {
            // Increment progress every second until it reaches 100
            setPreviewProgress(prevProgress =>
                prevProgress < 100 ? prevProgress + 1 : prevProgress
            );
        }, 6000); // Delay to simulate the progress (6000 milliseconds = 6 seconds)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (previewProgress >= 90) {
            setProgressMessage("Rounding up emojis and hashtags... 🚀 #AlmostThere");
        } else if (previewProgress >= 80) {
            setProgressMessage("Brewing some fresh content... ☕ Stay tuned!");
        } else if (previewProgress >= 70) {
            setProgressMessage("Gathering your likes and shares from the digital universe... 🌌");
        } else if (previewProgress >= 60) {
            setProgressMessage("Putting the final sparkle on your post... ✨ Almost done!");
        } else if (previewProgress >= 50) {
            setProgressMessage("Consulting the meme lords for inspiration... 🐸");
        } else if (previewProgress >= 40) {
            setProgressMessage("Mixing the perfect blend of wit and wisdom... 🧠💬");
        } else if (previewProgress >= 30) {
            setProgressMessage("Summoning viral vibes... 🌟 Your post is coming up!");
        } else if (previewProgress >= 20) {
            setProgressMessage("Charging up with social media magic... 🔮");
        } else if (previewProgress >= 10) {
            setProgressMessage("Crafting your post with care... 🛠️ Perfection takes time!");
        } else {
            setProgressMessage("Dancing through the algorithms... 💃🕺 Just a moment more!");
        }
    }, [previewProgress]);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {showConfetti && <Confetti />}
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Page header */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">{engagement?.BrandName}</h1>
                            </div>

                            {/* Center */}

                            {/* Right: Actions */}

                            <div className={`grid grid-flow-col ${isAnAccountConnected && "bg-white shadow-md border-t-2 border-blue-400 border-l-2 "} rounded-lg p-3
                              sm:auto-cols-max justify-start sm:justify-end gap-2`}>

                                {isAnAccountConnected && <span className="font-medium "> Connected to </span>}
                                {!isAnAccountConnected && <div className="flex items-center bg-orange-200 text-gray-400 text-sm font-bold px-4 py-3" role="alert">
                                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                                    <p>No socials connected</p>
                                </div>}
                                <span>
                                    {clientConnectData?.FacebookConnected && clientConnectData?.FacebookConnected !== "no" &&
                                        <> <FontAwesomeIcon
                                            className="text-[#3e4ef5]"
                                            icon={faFacebook}
                                        />
                                        </>
                                    }  </span>
                                <span> {clientConnectData?.TwitterConnected && clientConnectData?.TwitterConnected !== "no" && <FontAwesomeIcon
                                    className="text-[#3b82f6]"
                                    icon={faTwitter}
                                />}   </span>
                                <span> {clientConnectData?.LinkedInConnected && clientConnectData?.LinkedInConnected !== "no" && <FontAwesomeIcon
                                    className="text-[#3b82f6]"
                                    icon={faLinkedin}
                                />}   </span>
                                <span> {clientConnectData?.TikTokConnected && clientConnectData?.TikTokConnected !== "no" && <FontAwesomeIcon
                                    className="text-[#3b82f6]"
                                    icon={faTiktok}
                                />}   </span>
                                <span> {clientConnectData?.YoutubeConnected && clientConnectData?.YoutubeConnected !== "no" && <FontAwesomeIcon
                                    className="text-[#f63e3b]"
                                    icon={faYoutube}
                                />}   </span>
                                <span> {clientConnectData?.InstagramConnected && clientConnectData?.InstagramConnected !== "no" && <FontAwesomeIcon
                                    // className="text-[#3b82f6]"
                                    icon={faInstagram}
                                />}   </span>
                            </div>   {clientConnectData?.ConnectLinkURL ?
                                <button
                                    disabled={isLoadingCC}
                                    onClick={getClientConnect}
                                    className="text-sm font-medium md:mt-0 mt-3 flex justify-center 
                              text-white  hover:font-bold shadow-xl bg-blue-500 md:w-auto w-full  rounded  p-3 cursor-pointer"
                                >

                                    {isLoadingCC ? "Connecting" : " Connect it to social media Account"} <FontAwesomeIcon className='mt-1 ml-1' icon={faLink} color="white" size={24} />


                                </button> : <div className='text-center text-red-500 font-medium my-2'>
                                    This Brand Engagement has no ConnectUrl
                                </div>}


                        </div>


                        <div className='my-2  grid grid-cols-1  md:grid-cols-2 gap-3
                         text-lg  text-sm font-medium
                         text-blue-900focus:outline-none focus-visible:ring
                          focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                            {/* {id} */}

                            <div className='bg-blue-100 h-12 flex justify-between p-3 rounded-xl'>     <p className='font-bold'>Website</p>
                                <a className='underline text-blue-600' href={engagement?.WebSite}> {engagement?.WebSite}</a>
                            </div>
                            <div className='bg-blue-100 flex h-12 justify-between p-3 rounded-xl'><span className='font-bold'>Brand Tone</span>   <p> {engagement?.BrandTone}</p></div>

                            <div className='bg-blue-100 flex h-12 justify-between p-3 rounded-xl'><p className='font-bold'>Timezone</p> <p> {engagement?.Timezone}</p></div>
                            <div className='bg-blue-100 flex flex-col h-20 overflow-y-scroll  justify-between p-3 rounded-xl'>
                                <p className='font-bold'>Brand Description</p>
                                <p> {engagement?.CompanySector}</p></div>
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
                        {feedPosts.length > 0 && <>
                            <div className='text-xl font-bold mt-2 mb-4  text-white'>
                                <span className='text-blue-600 w-auto p-3  '> Generated feed posts
                                </span>
                            </div>
                            <div className="grid grid-cols-12 gap-6">
                                {feedPosts.map((item) => {
                                    return (
                                        <PostCard
                                            key={item._id}
                                            feedPostId={item._id}
                                            MediaUrl={item.MediaUrl}
                                            deleteFeedPost={deletePostFeed}
                                            Caption={item.Caption}
                                            Date={item.Date}
                                            handleCopyText={handleCopyText}
                                            Accounts={item.Accounts}
                                            DownloadButton={downloadVideo}
                                            unixTimestamp={item.unixTimestamp}
                                            fetchFeedPosts={fetchFeedPosts}


                                        />
                                    );
                                })}
                            </div>
                        </>}
                        {engagement?.relatedPostsStatus === "Posts generating..." ?
                            <ProgressBarWithMessages
                                previewProgress={previewProgress}
                                progressMessage={progressMessage}
                            />
                            : <></>}
                        {
                            feedPosts.length > 0 && <div className="mt-8">
                                <div class="flex flex-wrap md:flex-nowrap  md:mx-4 items-center md:mt-4 overflow-x-scroll py-2  justify-center space-x-2">
                                    <button
                                        className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                                        onClick={gotoPrevious}
                                    >
                                        Previous
                                    </button>

                                    <select
                                        value={pageNumber}
                                        onChange={(e) => setPageNumber(parseInt(e.target.value))}
                                        className="rounded-md h-9 bg-white border border-gray-300 text-gray-600 "
                                    >
                                        {pages.map((pageIndex) => (
                                            <option
                                                key={pageIndex}
                                                value={pageIndex}
                                                className="text-black"
                                            >
                                                {pageIndex + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                                        onClick={gotoNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }


                    </div>


                </main>
                < ToastContainer
                    position="top-right"
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
            </div>
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

        </div>
    );
}

export default BrandEngagementDetails;