import { faDownload, faTrash, faPencil, faMicrochip, faLink, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Video from "./Video";
import { dateUpdate, postStatus } from "./Time";
import { parseISO, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import logo from '../images/jouer.png'
import CheckConnectedAccount from '../utils/ChechConnectedAccount';
import EditCaptionModal from "../components/EditCaptionModal";
import CustomActionItem from "../components/CustomActionItem";
import { faFacebook, faInstagram, faLinkedin, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import isMobile from 'is-mobile';
import FeedPostStatusCard from "./FeedPost/FeedPostStatusCard";

function FeedPostCard({
  MediaUrl,
  Caption,
  Date: postDate,
  deleteFeedPost,
  handleCopyText,
  Accounts,
  DownloadButton,
  unixTimestamp,
  fetchFeedPosts,
  feedPostId,
  BrandEngagementID,
  brandEngagementData,
  clientConnectData,
  groupedPosts
}) {


  const parsedDate = parseISO(postDate);
  const localDate = utcToZonedTime(
    parsedDate,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [isLoadingCC, setIsLoadingCC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isAnAccountConnected, setIsAnAccountConnected] = useState(false)

  useEffect(() => {
    clientConnectData && setIsAnAccountConnected(CheckConnectedAccount(clientConnectData))
  }, [clientConnectData])
  useEffect(() => {
    clientConnectData && setIsAnAccountConnected(CheckConnectedAccount(clientConnectData))
  }, [])



  const [isEditing, setEditing] = useState(false);
  const [caption, setCaption] = useState(Caption);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    // Save the edited caption and exit edit mode

    // //Update caption on the backend + setSaving(true)
    try {
      const response = await axios.put(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${feedPostId}`,
        {
          NewCaption: Caption
        });

      fetchFeedPosts()

    } catch (error) {
      console.log("error :" + error)
    } finally {
      setEditing(false);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    setCaption(Caption)
  };

  const isJpeg = MediaUrl.endsWith('.jpeg');
  const isMp4 = MediaUrl.endsWith('.mp4');
  // console.log("caption :" + caption)
  // const navigate = useNavigate

  const [promptInput, setPromptInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleGenerateClick = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/new-caption`,
        {
          prompt: promptInput,
          caption: Caption
        }
      );

      // Assuming feedPostId is defined somewhere in your code

      // Update the feed post with the new caption
      await axios.put(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${feedPostId}`,
        {
          NewCaption: response.data.newCaption
        }
      );

      setCaption(response.data.newCaption)
      // fetchFeedPosts();
      setPromptInput(""); // Clear input after submission
      setShowModal(false);
    } catch (error) {
      console.log("error:", error);
      setShowModal(false);
    } finally {
      setEditing(false);
      setIsLoading(false)
      setShowModal(false);
    }
  };

  const handleInputChange = (e) => {
    setPromptInput(e.target.value);
  };

  const handleModalButtonClick = (promptInput) => {
    handleGenerateClick()
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get the current pathname
  const currentPath = window.location.pathname;
  // Check if the pathname starts with '/posts-feed'
  const isPostsFeed = currentPath.startsWith('/posts-feed');
  const isMobileDevice = isMobile()

  const hideDeleteAndArchive = postStatus(unixTimestamp, isAnAccountConnected)

  const renderCase = (date, timestamp) => {
    if (!(timestamp)) {
      return (
        <>
          <span>Required: add social accounts to post</span>
        </>
      );
    }

    // const dayOfWeek = getDayOfWeek(timestamp);

    if (timestamp < Date.now()) {
      return (
        <>
          <span>Posted on {date}</span>
        </>
      );
    } else {
      return (
        <p className=''>
          Ready to post on  <span className='font-bold'> {date}</span>
        </p>
      );
    }
  };

  return (
    <div className={`my-2 col-span-full sm:col-span-6 xl:col-span-4
     bg-white shadow-md rounded-md border 
    relative border-slate-200 hover:border-blue-500
     hover:shadow-xl`}>
      <div className="flex md:flex-row flex-col ">
        {/* Image/Video Section */}
        <div className="md:flex-[0.3] justify-center items-center h-[50vh] md:p-2 relative">
          {/* Adjustments for both mobile and desktop */}
          {isMp4 && (
            <ReactPlayer
              playIcon={<img src={logo} width={60} height={60} alt="thumbnail" />}
              controls={true}
              width="100%"
              height="100%" // Ensure ReactPlayer covers the container height
              url={MediaUrl}
            />
          )}
          {isJpeg && (
            <img
              src={MediaUrl}
              className="h-full w-full object-cover rounded-md" // Adjusted for consistent height and to cover the area
            />
          )}
        </div>

        {/* Right side section */}
        <div className="md:flex-[0.7]  md:px-0 px-2 py-3 flex flex-col flex-wrap">
          <header className="">
            {/* Connected accounts */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              {isAnAccountConnected ? (
                <>
                  <div className="flex items-center mb-2 md:mb-0 bg-gray-50 p-2">
                    {/* <svg className="w-6 h-6 text-pink-600 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg> */}
                    {/* <span className="font-medium p-1">Scheduled for</span> */}
                    <p className=" text-sm rounded-lg ml-2 px-1 mt-[1px]">
                      {/* {dateUpdate(unixTimestamp)} */}
                      {renderCase(dateUpdate(unixTimestamp), groupedPosts[dateUpdate(unixTimestamp)][0].unixTimestamp)}
                    </p>
                  </div>
                  <FeedPostStatusCard unixTimestamp={unixTimestamp} isAccountConnected={isAnAccountConnected} />
                </>
              ) : (
                <div className="flex  md:justify-end md:items-end text-end mr-2">
                  <Link to={clientConnectData?.ConnectLinkURL}>
                    <button className="flex text-sm items-center px-4 py-2 bg-red-50 rounded-md text-red-500  space-x-2">
                      Add Social Connect
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon ml-1 icon-tabler icon-tabler-info-circle-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" stroke-width="0" fill="currentColor" />
                      </svg>
                    </button>
                  </Link>
                </div>
              )}
            </div>


            {/* <div className="text-sm mb-2 text-blue-500 font-bold">
              <button onClick={getClientConnect} className="hover:underline flex items-center my-1">
                <span>Connect your socials to schedule this post</span>
                <FontAwesomeIcon
                  icon={faLink}
                  className="ml-2 w-4 h-4 rounded-full"
                  color="#058cfb"
                />
              </button>
            </div> */}

          </header>
          <div className="h-[1px] my-1 bg-gray-200 md:mx-3 mx-1" />
          <section className="flex  md:space-x-2 flex-wrap py-1">
            {
              brandEngagementData?.campaignTitle && <div className="bg-gray-100 m-1 text-gray-700 py-1 px-2 text-sm  rounded-2xl w-max">
                {brandEngagementData?.campaignTitle}
              </div>
            }
            <div className="bg-gray-100 m-1 text-gray-700 py-1 px-2 text-sm  rounded-2xl w-max">
              {brandEngagementData?.language}
            </div>
            {(brandEngagementData?.days)?.length > 0 && <div className="bg-gray-100 m-1 text-gray-700 py-1 px-2 text-sm  rounded-2xl w-max">
              {brandEngagementData.days.join(", ")}
            </div>}
          </section>
          <div className="h-[1px] my-1 mx-1 md:mx-3 bg-gray-100" />
          <div className="grow mt-2 ">
            {/* condition socials connected */}

            {/* {!isAnAccountConnected && <div className="flex items-center  text-gray-500 text-sm font-bold px-4 " role="alert">
              <p>No socials connected</p>
            </div>} */}
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <span>
                  {clientConnectData?.FacebookConnected && clientConnectData?.FacebookConnected !== "no" &&
                    <> <FontAwesomeIcon
                      className="text-[#3e4ef5]"
                      icon={faFacebook}
                    />
                    </>
                  }  </span>
                <span>
                  {clientConnectData?.TwitterConnected && clientConnectData?.TwitterConnected !== "no" && <FontAwesomeIcon
                    className="text-[#3b82f6]"
                    icon={faTwitter}
                  />}
                </span>
                <span> {clientConnectData?.LinkedInConnected && clientConnectData?.LinkedInConnected !== "no" && <FontAwesomeIcon
                  className="text-[#3b82f6]"
                  icon={faLinkedin}
                />}
                </span>
                <span>
                  {clientConnectData?.TikTokConnected && clientConnectData?.TikTokConnected !== "no" && <FontAwesomeIcon
                    className="text-[#3b82f6]"
                    icon={faTiktok}
                  />}
                </span>
                <span>
                  {clientConnectData?.YoutubeConnected && clientConnectData?.YoutubeConnected !== "no" && <FontAwesomeIcon
                    className="text-[#f63e3b]"
                    icon={faYoutube}
                  />}
                </span>
                <span>
                  {clientConnectData?.InstagramConnected && clientConnectData?.InstagramConnected !== "no" &&
                    <FontAwesomeIcon
                      // className="text-[#3b82f6]"
                      icon={faInstagram}
                    />}
                </span>
              </div>

              {
                clientConnectData?.ConnectLinkURL &&
                <Link to={clientConnectData?.ConnectLinkURL}>
                  <div className="mr-6 flex cursor-pointer" >
                    {/* <span className="pb-1 text-sm text-gray-500 hover:font-bold">Connect socials</span> */}
                    <FontAwesomeIcon
                      className="ml-2 mt-[4px] text-gray-700"
                      icon={faEllipsisV}
                      className='w-5 h-5'
                    />
                  </div>
                </Link>
              }
            </div>


            <div className="text-sm overflow-y-scroll font-medium mb-2">
              {isEditing ? (
                <div>
                  <textarea
                    name="caption"
                    className='w-full text-sm '
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                  <div className='flex'>
                    <button className="bg-green-500 w-[15%] cursor-pointer
                 text-center rounded-lg py-1 mr-2 text-white"
                      onClick={handleSaveClick}>Save</button>
                    <button className='text-red-400'
                      onClick={handleCancelClick}>Cancel</button>

                  </div>
                </div>
              ) : (
                <div className='flex flex-col max-h-[90px] overflow-y-scroll'>
                  <p className='px-4 leading-6 my-4 '> {caption}
                  </p>
                </div>
              )}

            </div>
            <div className="flex items-center justify-between">
              {/* <h2 className="text-xl leading-snug font-semibold">{Accounts}</h2> */}
              {/* Actions */}
              <div className="flex space-x-2">
                <CustomActionItem
                  text="Copy to clipboard"
                  onClick={() => handleCopyText(Caption)}
                  icon={<svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-copy mt-[3px] p-[1px]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#0f96f7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>}
                />
                {!isEditing &&
                  <CustomActionItem
                    text="Manually edit post"
                    onClick={handleEditClick}
                    icon={<button className="text-sm flex">
                      <FontAwesomeIcon icon={faPencil} className="ml-1 p-[5px] w-[13.5px] h-[13.5px]" color='#00abfb' />
                    </button>}
                  />
                }
                {/* User click here, open modal and receive prompt  */}
                <CustomActionItem
                  text="Generate new copy via AI"
                  onClick={handleOpenModal}
                  icon={<FontAwesomeIcon
                    icon={faMicrochip}
                    className="ml-1 p-[4.3px] mt-[2.7px] w-4 h-4 rounded-full"
                    color="#00abfb"
                  />}
                />

              </div>
            </div>
          </div>

          <EditCaptionModal
            isLoading={isLoading}
            isOpen={showModal}
            onClose={handleCloseModal}
            promptInput={promptInput}
            setPromptInput={setPromptInput}
            handleInputChange={handleInputChange}
            handleModalButtonClick={handleModalButtonClick}
          />

          {
            (hideDeleteAndArchive !== 'Successfully Posted') &&
            <footer className="w-full pr-3 flex space-x-2 items-end justify-end">
              <button
                onClick={() => deleteFeedPost(feedPostId)}
                className="text-sm flex text-white rounded bg-[#ef3d22] p-2  cursor-pointer"
              >
                {/* Not Active */}
                <FontAwesomeIcon className="mt-1" icon={faTrash} />
                <p className="md:block hidden ml-2">Delete</p>
              </button>
              {
                isMp4 ?
                  <button
                    onClick={() => DownloadButton(MediaUrl)}
                    className="text-sm flex text-white rounded bg-[#1fb42b] p-2 cursor-pointer"
                  >
                    <FontAwesomeIcon className="mt-1" icon={faDownload} />
                    <p className="md:block hidden ml-2">Downlaod</p>
                  </button>
                  :
                  <Link to={MediaUrl}>
                    <button

                      // onClick={() => DownloadButton(MediaUrl)}
                      className="text-sm flex text-white rounded bg-[#36d74b] p-2 cursor-pointer"
                    >
                      <FontAwesomeIcon className="mt-1" icon={faDownload} />
                      <p className="md:block hidden ml-2">Downlaod</p>
                    </button>
                  </Link>
              }
            </footer>
          }

        </div>
      </div >

    </div >
  );
}

export default FeedPostCard;