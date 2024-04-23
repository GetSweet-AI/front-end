import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
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
        fetchFeedPosts(selectedBrand)
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
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${brandId}?page=${pageNumber}`
      ).then((response) => {
        setFeedPosts(response.data?.feedPosts);
        setFilteredFeedPosts(response.data?.feedPosts)
        getClientConnectData(brandId)
        setNumberOfPages(response.data?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      })
    setIsFeedPostsLoading(false)

    // const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${brandId}?page=${pageNumber}`);


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

  const [isImage, setIsImage] = useState(true)
  const [isVideo, setIsVideo] = useState(true)
  const [isScheduled, setIsScheduled] = useState(true)
  const [isArchived, setIsArchived] = useState(true)

  const applyFilter = () => {
    const shouldApplyFilter = isImage !== isVideo;
    shouldApplyFilter ? setFilteredFeedPosts(feedPosts.filter(post => {
      return (isImage && post.MediaUrl.endsWith('.jpeg')) ||
        (isVideo && post.MediaUrl.endsWith('.mp4'));
    })) : setFilteredFeedPosts(feedPosts)
  };

  useEffect(() => {
    applyFilter();
  }, [isImage, isVideo]);


  useEffect(() => {
    getClientConnectData(selectedBrand)
    setPageNumber(0)
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


  // Use the find method to get the engagement with the matching _id
  const selectedEngagement = engagements.find(engagement => engagement._id === selectedBrand);

  console.log(selectedEngagement)

  const buttonRef = useRef(null);

  const handleLoadMore = async () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);  // Optimistically increment page number
    try {
      const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${selectedBrand}?page=${pageNumber + 1}`);
      const newPosts = response.data?.feedPosts;

      setFilteredFeedPosts(prevFeedPosts => {
        const existingIds = new Set(prevFeedPosts.map(post => post._id));

        // Determine if the filter should be applied based on the image/video checkbox states
        const shouldApplyFilter = isImage !== isVideo;

        // Apply the appropriate filtering logic
        const filteredNewPosts = newPosts.filter(post => {
          const isUnique = !existingIds.has(post._id);
          // Apply media type filters if shouldApplyFilter is true
          if (shouldApplyFilter) {
            const isMediaFiltered = (isImage && post.MediaUrl.endsWith('.jpeg')) ||
              (isVideo && post.MediaUrl.endsWith('.mp4'));
            return isUnique && isMediaFiltered;
          }
          // If filter should not be applied, just check uniqueness
          return isUnique;
        });

        // If no filter should be applied, the new posts are not filtered by type, just added if they're unique
        return [...prevFeedPosts, ...filteredNewPosts];
      });
      setNumberOfPages(response.data?.totalPages);
    } catch (error) {
      console.error('Failed to load more feed posts:', error);
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const observer = new IntersectionObserver(entries => {
      // When the button is visible in the viewport, trigger handleLoadMore
      if (entries[0].isIntersecting) {
        handleLoadMore();
      }
    }, {
      root: null, // Observe visibility in the viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the button is visible
    });

    // Start observing the button
    observer.observe(button);

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore]); // Effect dependencies

  console.log(selectedBrand)

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
          <div className="p-5">
            {/* Get brand engagement */}
            <div className="flex justify-between bg-white border-[1px] border-gray-100 mx-auto py-4 bg-white-50 rounded-lg  p-2 ">
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

          <div className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            {/* Page header */}

            <div className="flex flex-col w-full h-full space-y-2  flex-[0.25] p-2">

              {/* <FilterComponent options={statusOptions} label="Status" /> */}
              <FilterComponent label="Media Type" isFilterOne={isImage} isFilterTwo={isVideo}
                setIsFilterOne={setIsImage} setIsFilterTwo={setIsVideo} applyFilter={applyFilter}
                filterOneLabel="Image" filterTwoLabel="Video"
              />
              {/* <FilterComponent label="Status" isFilterOne={isScheduled} isFilterTwo={isArchived}
                setIsFilterOne={setIsScheduled} setIsFilterTwo={setIsArchived} applyFilter={applyFilter}
                filterOneLabel="Scheduled" filterTwoLabel="Archived"
              /> */}

            </div>

            <div className="flex flex-col flex-[0.75]">
              <div className="flex flex-col md:flex-row justify-between  p-2 ">
                <div className="mb-4 sm:mb-0 flex flex-col md:p-4">
                  <h1 className="md:text-2xl text-xl mb-2 text-gray-700   font-bold" >
                    Your upcoming posts for <span className=''>{selectedEngagement?.BrandName}</span>
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
                    <div className="flex justify-center items-center m-2">
                      <div
                        ref={buttonRef}
                        // onClick={handleLoadMore}
                        className="py-2.5 my-4 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none
                   hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100
                    ">
                        Loading ...
                      </div>

                    </div>
                  )
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
                {/* <div className="flex flex-col justify-end items-center">
                  <button ref={buttonRef} onClick={handleClick} className="p-4 bg-blue-500 text-white rounded">
                    Click Me
                  </button>
                </div> */}

              </div>
            </div>
          </div>
        </main>

      </div>

    </div>
  );
}

export default PostsFeed;
