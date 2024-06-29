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
import { faCalendar, faCalendarCheck, faCalendarXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import Select from "../components/Select";
import LazyLoadedFeedPosts from "../components/FeedPosts/LazyLoadedFeedPosts";
import noData from '../images/NoData.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CalendarView from "../components/FeedPosts/CalendarView";
import noEngagement from '../images/noengegement.png'
import groupPostsByDate from "../utils/GroupPostsByDate";

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
  const [scheduledFeedPosts, setScheduledFeedPosts] = useState([]);
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

  const [isImage, setIsImage] = useState(true)
  const [isVideo, setIsVideo] = useState(true)
  const [isScheduled, setIsScheduled] = useState(false)
  const [isNotScheduled, setIsNotScheduled] = useState(false)
  const [isArchived, setIsArchived] = useState(false)

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
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${brandId}?page=${pageNumber}
        &isArchived=${isArchived}&isScheduled=${isScheduled}&isNonScheduled=${isNotScheduled}`
        , {
          headers: {
            'Cache-Control': 'no-cache'
          }
        }).then((response) => {
          setFeedPosts(response.data?.feedPosts);
          setFilteredFeedPosts(response.data?.feedPosts)
          getClientConnectData(brandId)
          setNumberOfPages(response.data?.totalPages);
        })
      .catch((err) => {
        console.log(err);
      })
    setIsFeedPostsLoading(false)

  };

  useEffect(() => {
    fetchFeedPosts(selectedBrand)
  }, [selectedBrand, isArchived, isScheduled]);

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

  const applyFilter = () => {
    const shouldApplyFilter = isImage !== isVideo;
    shouldApplyFilter ? setFilteredFeedPosts(feedPosts.filter(post => {
      return (isImage && post.MediaUrl.endsWith('.jpeg')) ||
        (isVideo && post.MediaUrl.endsWith('.mp4'));
    })) : setFilteredFeedPosts(feedPosts)
  };

  // useEffect(() => {
  //   applyFilter();
  // }, [isImage, isVideo]);

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

  // console.log(selectedEngagement)

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

  // Utility function to debounce any function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const debouncedHandleLoadMore = debounce(handleLoadMore, 300);

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        debouncedHandleLoadMore();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    observer.observe(button);

    return () => observer.disconnect();
  }, [handleLoadMore]); // Ensure debounce doesn't recreate on every render

  const [activeIcon, setActiveIcon] = useState(1);

  const handleClick = (iconId) => {
    setActiveIcon(activeIcon === iconId ? 1 : iconId); // Toggle active state
  };

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        const response = await axios.get(
          `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${selectedBrand}?page=${pageNumber}&isArchived=false&isScheduled=true`,
          {
            headers: {
              'Cache-Control': 'no-cache'
            }
          }
        );
        setScheduledFeedPosts(response.data?.feedPosts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFeedPosts();

  }, [selectedBrand, pageNumber, activeIcon]);

  const groupedPosts = groupPostsByDate(filteredFeedPosts);

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

        {engagements?.length !== 0 &&
          <main>

            {isLoading
              && enabled && (
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
              <div className="flex md:flex-row flex-col  md:justify-between  bg-white border-[1px] border-gray-100 mx-auto py-4 bg-white-50 rounded-lg p-2 ">

                <div className="md:w-1/3 w-full ">
                  <Select
                    options={engagements.map(brand => ({
                      value: brand._id,
                      label: brand.BrandName
                    }))}
                    value={selectedBrand}
                    onChange={handleBEChange}
                  />
                </div>

                <div className="border-[1px] hidden md:mt-0 mt-3 py-2 hover:bg-gray-500 hover:text-white flex justify-center items-center px-3 rounded-lg text-center">
                  {/* Download Calendar */}
                  <button>
                    Download Calendar
                  </button>
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

            <div className="flex flex-col  px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
              {/* Page header */}

              {/* <div className="flex flex-col w-full h-full md:space-y-2   p-2">


                <FilterComponent
                  label="Status"
                  isFilterOne={isScheduled}
                  isFilterTwo={isArchived}
                  setIsFilterOne={setIsScheduled}
                  setIsFilterTwo={setIsArchived}
                  applyFilter={applyFilter}
                  filterOneLabel="Scheduled"
                  filterTwoLabel="Archived"
                  setIsScheduled={setIsScheduled}
                  setIsNonScheduled={setIsNotScheduled}
                />

              </div> */}

              <div className="flex flex-col ">
                <div className="flex flex-col  p-2 ">
                  <h1 className="md:text-2xl w-full text-xl mb-4 text-gray-700   font-bold" >
                    Your upcoming posts for <span className=''>{selectedEngagement?.BrandName}</span>
                  </h1>


                  <div className="flex  w-full justify-between bg-white  md:p-5 p-2 rounded-md md:mb-4 mb-6">
                    <div className="flex space-x-2">
                      <div
                        className={`px-2 py-1 h-9 rounded ${activeIcon === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} shadow`}
                        onClick={() => handleClick(1)}
                      >
                        <FontAwesomeIcon icon={faBars} className="w-5 h-5 pt-1" />
                      </div>
                      <div
                        className={`px-2 py-1 h-9 rounded ${activeIcon === 2 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} shadow`}
                        onClick={() => handleClick(2)}
                      >
                        <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 pt-1" />
                      </div>
                    </div>  
                     <div>
                      <FilterComponent
                        label="Status"
                        isFilterOne={isScheduled}
                        isFilterTwo={isArchived}
                        setIsFilterOne={setIsScheduled}
                        setIsFilterTwo={setIsArchived}
                        applyFilter={applyFilter}
                        filterOneLabel="Scheduled"
                        filterTwoLabel="Archived"
                        setIsScheduled={setIsScheduled}
                        setIsNonScheduled={setIsNotScheduled}
                      />
                    </div>


                  </div>



                </div>
                <div>
                  <ToastContainer />
                  {activeIcon === 2 && <CalendarView feedPosts={scheduledFeedPosts} />}

                  {
                    activeIcon === 1 &&
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {
                          Object.keys(groupedPosts).length > 0 ? (
                            Object.keys(groupedPosts).map((date) => (
                              <div key={date} className="flex flex-col gap-3">
                                <h2 className="font-bold ml-2 text-gray-600 text-xl">{date}</h2>
                                {
                                  groupedPosts[date].map((item) => (
                                    <FeedPostCard
                                      groupedPosts={groupedPosts}
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
                                  ))
                                }
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col justify-center items-center">
                              <img src={noData} alt="no data" className="w-20 h-20" />
                              <p className="p-3">No Feed posts Found</p>
                            </div>
                          )
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
                  }

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
          </main>}

        {
          engagements?.length === 0 &&
          <div className="flex justify-center font-medium leading-7 flex-col items-center bg-blue-50 shadow-md p-8 md:mt-10">

            You don't have any brand engagements yet. Get started by creating one here:
            <Link to="/brand-engagement-builder"><span className='underline text-blue-500'>Create Brand Engagement</span> </Link>
            <img src={noData} className='w-44 mt-5' />
          </div>
        }


      </div>
    </div>
  );
}

export default PostsFeed;
