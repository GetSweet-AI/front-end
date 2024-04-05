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

  const [adminFeedPosts, setAdminFeedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  let { id } = useParams();

  // const fetchUserFeedPosts = async () => {
  //   setIsUserDataLoading(true);
  //   await axios
  //     .get(
  //       `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${user?._id}`
  //     )
  //     .then((res) => {
  //       setFeedPosts(res.data?.feedPosts);
  //       // console.log("res?.data :" + JSON.stringify(res?.data))
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setIsUserDataLoading(false);
  // };

  // const fetchAllFeedPosts = async () => {
  //   setIsLoading(true);

  //   await axios
  //     .get(
  //       `https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/feedposts?userId=${user?._id}`
  //     )
  //     .then((res) => {
  //       setAdminFeedPosts(res.data);
  //       // console.log("AdminFeedPosts :" + JSON.stringify(res?.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setIsLoading(false);
  // };
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

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const [adminPageNumber, setAdminPageNumber] = useState(0);
  const [adminNumberOfPages, setAdminNumberOfPages] = useState(0);

  const AdminPages = new Array(adminNumberOfPages).fill(null).map((v, i) => i);

  // useEffect(() => {
  //   fetch(
  //     `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${user?._id}?page=${pageNumber}`
  //   )
  //     .then((response) => response.json())
  //     .then(({ totalPages, feedPosts }) => {
  //       setFeedPosts(feedPosts);
  //       setNumberOfPages(totalPages);
  //     });
  // }, [pageNumber]);


  useEffect(() => {
    fetch(
      `https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/feedposts?userId=${user?._id}&page=${adminPageNumber}`
    )
      .then((response) => response.json())
      .then(({ totalPages, feedPosts }) => {
        setAdminFeedPosts(feedPosts);
        setAdminNumberOfPages(totalPages);
      });
  }, [adminPageNumber]);
  // Fetch data when the currentPage changes

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  const gotoPreviousAdmin = () => {
    setPageNumber(Math.max(0, adminPageNumber - 1));
  };

  const gotoNextAdmin = () => {
    setPageNumber(Math.min(adminNumberOfPages - 1, adminPageNumber + 1));
  };

  const [search, setSearch] = useState('')
  const handleChange = (e) => {
    setSearch(e.target.value)
  };

  const [clientConnectData, setClientConnectData] = useState("")
  const isAnAccountConnected = CheckConnectedAccount(clientConnectData)


  // Function to fetch brand engagement data
  const fetchBrandEngagementData = async (BrandEngagementID) => {
    try {
      const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagement/${BrandEngagementID}`);
      return response.data.brandEngagement;
    } catch (error) {
      console.error("Error fetching brand engagement data: ", error);
      return null;
    }
  };


  const [brandEngagementData, setBrandEngagementData] = useState('')
  const fetchData = async () => {
    const data = await fetchBrandEngagementData(selectedBrand);
    setBrandEngagementData(data);
  };

  const [campaigns, setCampaigns] = useState(null);
  const fetchCampaigns = async (BrandEngagementId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/campaign-titles/${BrandEngagementId}`); // replace userId with the actual user ID
      setCampaigns(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [engagements, setEngagements] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const handleBEChange = (e) => {
    setSelectedBrand(e.target.value);
  };
  const fetchEngagements = async (brandId) => {
    setIsLoading(true);
    try {
      fetch(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements-np/${user?._id}`)
        .then((response) => response.json())
        .then(({ brandEngagements }) => {
          setEngagements(brandEngagements);
          // console.log("eee" + brandEngagements)
          if (brandId) {
            fetchFeedPosts(brandId)
            setSelectedBrand(brandId)
            fetchCampaigns(brandId)
            fetchData(brandId)
          } else {
            fetchFeedPosts(brandEngagements[0]?._id)
            setSelectedBrand(brandEngagements[0]?._id)
            fetchCampaigns(brandEngagements[0]?._id)
            fetchData(brandEngagements[0]?._id)
          }

          // Create unique filter options
          const uniqueFilterOptions = brandEngagements.reduce((acc, engagement) => {
            const existingLabel = acc.find(option => option.label === engagement.campaignTitle);
            if (!existingLabel) {
              acc.push({
                id: engagement._id,
                label: engagement.campaignTitle,
                checked: false,
              });
            }
            return acc;
          }, []);

          setFilterOptions(uniqueFilterOptions);
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEngagements()
  }, [])


  // useEffect(() => {
  //   fetchEngagements(selectedBrand)
  // }, [selectedBrand])

  const fetchFeedPosts = async (selectedBrand) => {
    setIsLoading(true)
    await axios
      .get(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts-engagements/${selectedBrand}?page=${pageNumber}`
      ).then((response) => {
        setFeedPosts(response.data?.feedPosts);
        setFilteredFeedPosts(response.data?.feedPosts)
        setNumberOfPages(response.data?.totalPages)
        // console.log("feedPosts" + JSON.stringify(response?.data))
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false)
  };

  useEffect(() => {
    fetchFeedPosts(selectedBrand)
  }, [pageNumber, selectedBrand])
  // useEffect(() => {
  //   fetchFeedPosts(engagements[0]?._id)
  // }, [])

  useEffect(() => {
    setPageNumber(0)
  }, [selectedBrand])

  const [staData, setData] = useState(null);
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


  const [filterOptions, setFilterOptions] = useState({
    isImage: true,
    isVideo: true,
  });

  const applyFilter = (filterOptions) => {
    const { isImage, isVideo } = filterOptions;

    // No filter applied
    if (!isImage && !isVideo) {
      setFilteredFeedPosts(feedPosts); // Set filteredPosts to feedPosts values
      return;
    }

    // Both image and video filters applied
    if (isImage && isVideo) {
      const filteredPosts = feedPosts.filter((item) => {
        const isJpeg = item.MediaUrl.endsWith('.jpeg');
        const isMp4 = item.MediaUrl.endsWith('.mp4');
        return isJpeg || isMp4;
      });
      setFilteredFeedPosts(filteredPosts);
      return;
    }

    // Image filter applied
    if (isImage) {
      const filteredPosts = feedPosts.filter((item) => {
        const isJpeg = item.MediaUrl.endsWith('.jpeg');
        return isJpeg;
      });
      setFilteredFeedPosts(filteredPosts);
      return;
    }

    // Video filter applied
    if (isVideo) {
      const filteredPosts = feedPosts.filter((item) => {
        const isMp4 = item.MediaUrl.endsWith('.mp4');
        return isMp4;
      });
      setFilteredFeedPosts(filteredPosts);
      return;
    }
  };


  // useEffect(() => {
  //   setFilterOptions({
  //     isImage: true,
  //     isVideo: true,
  //   }) && applyFilter(filterOptions)
  // }, [])
  useEffect(() => {
    applyFilter(filterOptions)
  }, [filterOptions])


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
          {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
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
          </div>}

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
              icon={faCalendarXmark}
              number={staData?.totalPostsNeedSocial}
              label="Posts need socials"
              bgColor="red-400"
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
              icon={faCalendarCheck}
              number={staData?.totalPostsLive}
              label="Posts are live"
              bgColor="red-400"
              iconColor="white"
            />
            {/* Add more instances of PostBadge with different data as needed */}
          </div>
          <div className="p-5">
            {/* Get brand engagement */}
            <div className="flex justify-between mx-auto py-4 bg-white-50 rounded-lg shadow-md p-2 ">
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

            <div className="flex flex-col w-full h-full space-y-2 bg-white  flex-[0.25] p-2">

              {/* {
                campaigns && <FilterComponent
                  options={campaigns}
                  label="Campaigns"
                />
              } */}
              <FilterComponent label="Media Type" applyFilter={applyFilter} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
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
                  {/* <div className="flex justify-center items-center ">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by Title"
                    onChange={handleChange}
                    className="form-input focus:border-slate-300"
                  />
                </div> */}
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
                {/* {enabled ?
                  adminFeedPosts?.length > 0 && (
                    <div className="">
                      <div className="grid grid-cols-1 gap-3">
                        {adminFeedPosts.
                          filter((feedPost) => {
                            // const { email } = feedPost?.user;
                            if (search == "") {
                              return feedPost;
                            } else if (feedPost?.email !== null &&
                              (feedPost?.Caption.toLowerCase().includes(search.toLocaleLowerCase()))
                            ) {
                              return feedPost;
                            }
                          }).map((item, idx) => {
                            return (
                              <FeedPostCard
                                key={idx}
                                feedPostId={item._id}
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
                                fetchBrandEngagementData={fetchBrandEngagementData}
                              />
                            );
                          })}
                      </div>
                    </div>
                  ) : */}

                <div className="">
                  <div className="grid grid-cols-1 gap-3">
                    {
                      (filteredFeedPosts.length > 0 && engagements.length > 0) ?
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

                            />
                          );
                        }) :
                        <div className="flex flex-col justify-center items-center">
                          <img src={noData} alt="no data" className="w-20 h-20" />
                          <p className="p-3">No Feed posts Found</p>
                        </div>
                    }

                  </div>
                </div>
                {/* )} */}

                {/* {enabled && adminFeedPosts.length > 5 && (
                  <div className="mt-8">
                    <div class="flex flex-wrap md:flex-nowrap  md:mx-4 items-center md:mt-4 overflow-x-scroll py-2  justify-center space-x-2">
                      <button
                        className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                        onClick={gotoPreviousAdmin}
                      >
                        Previous
                      </button>

                      <select
                        value={adminPageNumber}
                        onChange={(e) => setAdminPageNumber(parseInt(e.target.value))}
                        className="rounded-md h-9 bg-white border border-gray-300 text-gray-600 "
                      >
                        {AdminPages.map((pageIndex) => (
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
                        onClick={gotoNextAdmin}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )} */}
                {filteredFeedPosts.length > 0 && (
                  <div className="mt-8">
                    <div class="flex items-center md:mt-4 py-2 md:overflow-hidden overflow-x-scroll  justify-center space-x-2">

                      {pages.length === 0 &&
                        <div> Hmmm… it seems as though you do not have any posts generated right now.  <a className="text-[#6366F1]" href="/brand-engagement-builder">Let us fix that!.</a>
                        </div>}
                      {pages.length !== 0 && <button
                        className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                        onClick={gotoPrevious}
                      >
                        Previous
                      </button>}

                      {pages.length !== 0 && <select
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
                      </select>}

                      {pages.length !== 0 && <button
                        className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                        onClick={gotoNext}
                      >
                        Next
                      </button>}
                    </div>
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
