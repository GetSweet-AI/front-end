import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Bars, MutatingDots, Puff } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
// import Sidebar from "../partials/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser, setUserData } from "../redux/auth";
import MyModal from "../partials/Modal";
import PostCard from "../partials/PostCard";
import Video from "../partials/Video";
import SwitchButton from "../partials/SwitchButton";
import CheckConnectedAccount from '../utils/ChechConnectedAccount';
import FeedPostCard from "../partials/FeedPostCard";
import FilterComponent from "../components/FilterComponent";
import PostBadge from "../components/PostBadge";
import { faCalendar, faCalendarCheck, faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "../components/Select";
import LazyLoadedFeedPosts from "../components/FeedPosts/LazyLoadedFeedPosts";
import noData from '../images/NoData.svg'


async function downloadVideo(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = getFilenameFromUrl(url);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    return true;
  } catch (error) {
    console.error("Error downloading video:", error);
    return false;
  }
}

function getFilenameFromUrl(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

function PostsFeed() {

  const { token, user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedPosts, setFeedPosts] = useState([]);
  const [filteredFeedPosts, setFilteredFeedPosts] = useState([])

  const [isLoading, setIsLoading] = useState(false);
  const [isFeedPostsLoading, setIsFeedPostsLoading] = useState(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);

  const [engagements, setEngagements] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const [campaigns, setCampaigns] = useState(null);

  const [staData, setData] = useState(null);

  const [brandEngagementData, setBrandEngagementData] = useState('')

  const [isConnected, setIsConnected] = useState(false);

  //Fetch client connect data
  const [clientConnectData, setClientConnectData] = useState("")

  const deletePostFeed = async (id) => {
    await axios
      .delete(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${id}`
      )
      .then((res) => {
        console.log("Post feed deleted");
        fetch(
          `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${user?._id}?page=${pageNumber}`
        )
          .then((response) => response.json())
          .then(({ totalPages, feedPosts }) => {
            setFeedPosts(feedPosts);
            setNumberOfPages(totalPages);
          });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyText = (result) => {
    // Convert HTML to plain text
    const tempElement = document.createElement("div");
    tempElement.innerHTML = result;
    const plainText = tempElement.innerText;

    // Copy the plain text to the clipboard
    navigator.clipboard.writeText(plainText);

    // Show a toast message
    toast.success("Text copied successfully!");
  };

  const [enabled, setEnabled] = useState(false);

  // Function to fetch brand engagement data
  const fetchBrandEngagementData = async (BrandEngagementID) => {
    try {
      const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagement/${BrandEngagementID}`);
      setBrandEngagementData(response.data.brandEngagement);
    } catch (error) {
      console.error("Error fetching brand engagement data: ", error);
      return null;
    }
  };

  useEffect(() => {
    fetchBrandEngagementData(selectedBrand)
  }, [selectedBrand])

  const fetchData = async () => {
    const data = await fetchBrandEngagementData(selectedBrand);
    setBrandEngagementData(data);
  };

  const fetchCampaigns = async (BrandEngagementId) => {
    if (BrandEngagementId) {
      try {
        const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/campaign-titles/${BrandEngagementId}`); // replace userId with the actual user ID
        setCampaigns(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error.message);
      }
    }

  };

  const handleBEChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const getClientConnectData = async (selectedBrand) => {
    try {
      const response = await axios.get(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/client-connect/${selectedBrand}`
      );
      console.log("Client connect data :" + JSON.stringify(response.data)); // Success message or response data
      // Perform any additional actions after successful deletion
      setClientConnectData(response.data)

    } catch (error) {
      console.log(error); // Handle error
    }
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const fetchFeedPosts = async (brandId) => {
    setIsFeedPostsLoading(true)
    await axios
      .get(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${brandId}`
      ).then((response) => {
        setFeedPosts(response.data?.feedPosts);
        setFilteredFeedPosts(response.data?.feedPosts)
        getClientConnectData(brandId)
      })
      .catch((err) => {
        console.log(err);
      })
    setIsFeedPostsLoading(false)

    const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${brandId}?page=${pageNumber}`);

    setNumberOfPages(response.data?.totalPages);

  };

  useEffect(() => {
    fetchFeedPosts(selectedBrand)
  }, [selectedBrand])


  const fetchEngagements = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements-np/${user?._id}`);
      const { brandEngagements } = response.data;

      fetchBrandEngagementData(brandEngagements[0]?._id);
      setEngagements(brandEngagements);
      fetchFeedPosts(brandEngagements[0]?._id);
      checkConnectLinkExists(brandEngagements[0]?._id);

      setSelectedBrand(brandEngagements[0]?._id);
      fetchData(brandEngagements[0]?._id);
      getClientConnectData(brandEngagements[0]?._id);

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEngagements()
  }, [])

  useEffect(() => {
    const fetchStatusData = async () => {
      const url = `https://seal-app-dk3kg.ondigitalocean.app/api/v1/total-client-connect-status/${user?._id}`;
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatusData();
  }, []);

  // const [filterOptions, setFilterOptions] = useState({
  //   isImage: true,
  //   isVideo: true,
  // });

  const [isImage, setIsImage] = useState(false)
  const [isVideo, setIsVideo] = useState(false)

  const applyFilter = async () => {
    const url = `https://seal-app-dk3kg.ondigitalocean.app/api/v1/brandEngagement/${selectedBrand}/filter?isImage=${isImage}&isVideo=${isVideo}`;

    try {
      const response = await axios.get(url);
      const filteredData = response.data.feedPosts;

      // Set the filtered feed posts
      setFilteredFeedPosts(filteredData);

      // // Set all feed posts (optional, if needed)
      // setFeedPosts(response.data.feedPosts);
    } catch (error) {
      // Handle errors
      console.error('Error fetching filtered data:', error);
    }
  };

  useEffect(() => {
    applyFilter()
  }, [isImage, isVideo])

  // console.log(filterOptions)




  useEffect(() => {
    getClientConnectData(selectedBrand)
  }, [selectedBrand])

  const checkConnectLinkExists = async (BrandEngagementID) => {
    try {
      // if (BrandEngagementID) {
      const response = await axios.get(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/check-connect-link-exists/${BrandEngagementID}`
      );
      setIsConnected(response.data?.hasConnectLinkURL);
      // }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  useEffect(() => {
    checkConnectLinkExists(selectedBrand);
  }, [selectedBrand]);

  const handleLoadMore = async () => {
    try {
      const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${selectedBrand}?page=${pageNumber}`);
      // Update the state by appending new feed posts to the existing list
      setFilteredFeedPosts(prevFeedPosts => [
        ...prevFeedPosts,
        ...response.data?.feedPosts
      ]);

      setNumberOfPages(response.data?.totalPages);
      // Optionally, increment the page number to fetch the next set of posts in subsequent calls
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    } catch (error) {
      console.error('Failed to load more feed posts:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden md:p-4">
        {/*  Site header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          header={`${enabled ? "Admin" : "My"} Feed Posts`}
        />

        <main>

          {isLoading && enabled && (
            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
              <Bars
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

          {isUserDataLoading && !enabled && (
            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
              <Bars
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
          <div className="flex justify-around space-x-2  w-full p-5">
            <PostBadge
              icon={faCalendarCheck}
              number={staData?.totalPostsLive}
              label="Posts are live"
              iconColor="white"
            />

            <PostBadge
              icon={faCalendar}
              number={staData?.totalPostsScheduled}
              label="Scheduled posts"
              bgColor="blue-400"
              iconColor="white"
            />
            <PostBadge
              icon={faCalendarXmark}
              number={staData?.totalPostsNeedSocial}
              label="Posts need socials"
              bgColor="red-400"
              iconColor="white"
            />

            {/* Add more instances of PostBadge with different data as needed */}
          </div>
          <div className="p-5">
            {/* Get brand engagement */}
            <div className="flex justify-between mx-auto py-4 bg-white-50 rounded-lg  p-2 ">
              <div className="md:w-1/3 w-full">
                <Select
                  options={engagements.map(brand => ({
                    value: brand._id,
                    label: brand.BrandName
                  }))}
                  value={selectedBrand}
                  onChange={handleBEChange}
                />
              </div>
              <div className="md:w-full">
              </div>

            </div>
          </div>
          <div className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            {/* Page header */}

            <div className="flex flex-col w-full h-full space-y-2  flex-[0.25] p-2">

              <FilterComponent label="Media Type" isImage={isImage} isVideo={isVideo}
                setIsImage={setIsImage} setIsVideo={setIsVideo} applyFilter={applyFilter} />
              {/* <FilterComponent options={statusOptions} label="Status" /> */}
            </div>

            <div className="flex flex-col flex-[0.75]">
              <div className="flex flex-col md:flex-row justify-between  p-2 ">
                <div className="mb-4 sm:mb-0 flex flex-col">
                  <h1 className="text-xl mb-2 text-blue-500 md:hidden font-bold" >
                    {enabled ? "Admin" : "My"} Feed Posts
                  </h1>
                </div>
                <div className=" flex  items-center flex-row space-x-3 ">

                  <div
                    className="flex justify-center items-center"> {user?.role === "admin" ? (
                      <>
                        {/* <SwitchButton enabled={enabled} setEnabled={setEnabled} /> */}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                </div>
              </div>

              <div>
                <ToastContainer />

                <div className="">
                  <div className="grid grid-cols-1 gap-3">
                    {
                      (filteredFeedPosts.length > 0) ?
                        filteredFeedPosts?.map((item) => {
                          return (
                            <FeedPostCard
                              feedPostId={item._id}
                              key={item._id}
                              id={item._id}
                              MediaUrl={item.MediaUrl}
                              deleteFeedPost={deletePostFeed}
                              Caption={item.Caption}
                              Date={item.Date}
                              handleCopyText={handleCopyText}
                              Accounts={item.Accounts}
                              DownloadButton={downloadVideo}
                              unixTimestamp={item.unixTimestamp}
                              BrandEngagementID={item.BrandEngagementID}
                              brandEngagementData={brandEngagementData}
                              clientConnectData={clientConnectData}

                            />
                          );
                        }) :
                        <div className="flex flex-col justify-center items-center">
                          <img src={noData} alt="no data" className="w-20 h-20" />
                          <p className="p-3">No Feed posts Found</p>
                        </div>
                    }
                  </div>

                  {pageNumber < numberOfPages - 1 && (
                    <div className="flex justify-center items-center m-2"> <button onClick={handleLoadMore}
                      type="button"
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none
                    bg-white rounded-lg border border-gray-200 hover:bg-gray-100
                   hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100
                    ">Load More</button>
                    </div>)
                  }

                </div>


                {isFeedPostsLoading && (
                  <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                    {" "}
                    <Puff
                      height="100"
                      width="100"
                      color="#eb22b2"
                      secondaryColor="#4446e4"
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                )}


              </div>
            </div>
          </div>
        </main>

      </div>

    </div>
  );
}

export default PostsFeed;
