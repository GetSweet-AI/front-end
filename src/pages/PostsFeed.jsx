import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { MutatingDots, Puff } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
// import Sidebar from "../partials/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [adminFeedPosts, setAdminFeedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserFeedPosts = async () => {
    setIsUserDataLoading(true);
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
    setIsUserDataLoading(false);
  };
  const fetchAllFeedPosts = async () => {
    setIsLoading(true);

    await axios
      .get(
        `http://localhost:5000/api/v1/admin/feedposts?userId=${user?._id}`
      )
      .then((res) => {
        setAdminFeedPosts(res.data);
        console.log("AdminFeedPosts :" + JSON.stringify(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };
  const deletePostFeed = async (id) => {
    await axios
      .delete(
        `http://localhost:5000/api/v1/feed-posts/${id}`
      )
      .then((res) => {
        console.log("Post feed deleted");
        fetchUserFeedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //     fetchUserFeedPosts();
  //     fetchAllFeedPosts();
  // }, []);

  // console.log("Token " + token)
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

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/feed-posts/${user?._id}?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then(({ totalPages, feedPosts }) => {
        setFeedPosts(feedPosts);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/admin/feedposts?userId=${user?._id}&page=${adminPageNumber}`
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
          {isLoading && enabled && (
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
          {isUserDataLoading && !enabled && (
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="flex flex-col md:flex-row justify-between items-center ">
              <div className="mb-4 sm:mb-0 flex flex-col">
                <h1 className="text-2xl md:text-3xl mb-2 text-blue-500 font-bold" >
                  {enabled ? "Admin" : "User"} Feed Posts
                </h1>

              </div>
              <div className=" flex justify-center items-center flex-row space-x-3 ">
                <div className="flex justify-center items-center ">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by Title"
                    onChange={handleChange}
                    className="form-input focus:border-slate-300"
                  />
                </div> <div className="flex justify-center mt-1 items-center"> {user?.role === "admin" ? (
                  <SwitchButton enabled={enabled} setEnabled={setEnabled} />
                ) : (
                  <></>
                )}
                </div>

              </div>
            </div>

            <div>
              <ToastContainer />

              {enabled
                ? adminFeedPosts?.length > 0 && (
                  <div className="">
                    <div className="grid grid-cols-12 gap-6">
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
                            <PostCard
                              key={idx}
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
                : feedPosts?.length > 0 && (
                  <div className="">
                    <div className="grid grid-cols-12 gap-6">
                      {feedPosts.filter((feedPost) => {
                        // const { email } = feedPost?.user;
                        if (search == "") {
                          return feedPost;
                        } else if (feedPost?.email !== null &&
                          (feedPost?.Caption.toLowerCase().includes(search.toLocaleLowerCase()) || feedPost?.MediaUrl.toLowerCase().includes(search.toLocaleLowerCase()))
                        ) {
                          return feedPost;
                        }
                      }).map((item) => {
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
                )}

              {enabled && (
                <div className="mt-8">
                  <div class="flex items-center md:mt-4 md:overflow-hidden overflow-x-scroll py-2  justify-center space-x-2">
                    <button
                      className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                      onClick={gotoPreviousAdmin}
                    >
                      Previous
                    </button>

                    {AdminPages.map((pageIndex) => (
                      <button
                        key={pageIndex}
                        className={`${adminPageNumber === pageIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                          } px-3 py-1 rounded-lg`}
                        onClick={() => setAdminPageNumber(pageIndex)}
                      >
                        {pageIndex + 1}
                      </button>
                    ))}

                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                      onClick={gotoNextAdmin}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {!enabled && (
                <div className="mt-8">
                  <div class="flex items-center md:mt-4 py-2 md:overflow-hidden overflow-x-scroll  justify-center space-x-2">

                    {pages.length === 0 && <div> No recent posts on your feed. <a className="text-[#6366F1]" href="/brand-engagement-builder">Time for a new one?</a>
                    </div>}
                    {pages.length !== 0 && <button
                      className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                      onClick={gotoPrevious}
                    >
                      Previous
                    </button>}

                    {pages.map((pageIndex) => (
                      <button
                        key={pageIndex}
                        className={`${pageNumber === pageIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                          } px-3 py-1 rounded-lg`}
                        onClick={() => setPageNumber(pageIndex)}
                      >
                        {pageIndex + 1}
                      </button>
                    ))}

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
            {/* Toast container */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PostsFeed;
