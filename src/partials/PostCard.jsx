import { faDownload, faTrash, faPencil, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Video from "./Video";
import { dateUpdate } from "./Time";
import { parseISO, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import logo from '../images/jouer.png'
import CheckConnectedAccount from '../utils/ChechConnectedAccount';
import EditCaptionModal from "../components/EditCaptionModal";


function PostCard({
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
  isGuest
}) {

  const parsedDate = parseISO(postDate);
  const localDate = utcToZonedTime(
    parsedDate,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  //https://seal-app-dk3kg.ondigitalocean.app/api/v1/client-connect/6509eb6b6a20f499452b2186

  let { id } = useParams();

  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingCC, setIsLoadingCC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkConnectLinkExists = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `https://seal-app-dk3kg.ondigitalocean.app/api/v1/check-connect-link-exists/${id}`
        );
        setIsConnected(response.data?.hasConnectLinkURL);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  useEffect(() => {
    checkConnectLinkExists();
  }, [id]);

  useEffect(() => {
    checkConnectLinkExists();
  }, [id]);

  //Fetch client connect data
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

  const getClientConnect = async () => {
    if (id) {
      setIsLoadingCC(true);

      try {
        const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/client-connect/${id}`);

        if (response.status === 200) {
          console.log("Client connect: ", response.data);
          setIsConnected(true);
          window.location.href = response.data?.ConnectLinkURL;
        } else {
          console.error("Error en la respuesta: ", response.status);
        }
      } catch (error) {
        console.log("Error en la solicitud: ", error.message);
      } finally {
        setIsLoadingCC(false);
      };
    }
  };

  const isAnAccountConnected = CheckConnectedAccount(clientConnectData)

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
          NewCaption: caption
        });

      fetchFeedPosts()

    } catch (error) {
      console.log("error :" + error)
    } finally {
      setEditing(false);
    }
    console.log("captioncaptioncaption :" + caption)
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

      fetchFeedPosts();
      setPromptInput(""); // Clear input after submission
      setShowModal(false);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setEditing(false);
      setIsLoading(false)
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



  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4
     bg-white shadow-md rounded-md border relative
      border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-200">
      <div className="flex flex-col h-full p-5">
        <header>

          {isAnAccountConnected ? (

            <div className="text-sm flex mb-2">
              <svg className="w-6 h-6 mt-[1px] text-pink-600 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="font-medium p-1">Scheduled for</span>{" "}
              <p className="text-pink-500 font-bold rounded-lg ml-2 p-1 bg-gray-100" target="_blank">
                {dateUpdate(unixTimestamp)}
              </p>
            </div>
          ) : (
            <div className="text-sm mb-2 text-blue-500 font-bold">

              <button disabled={isGuest} onClick={getClientConnect} className="hover:underline">
                Connect your socials to schedule this post
              </button>

            </div>
          )}
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-snug font-semibold">{Accounts}</h2>
            <div className="flex">
              <div
                onClick={() => handleCopyText(Caption)}
                className="text-xl cursor-pointer leading-snug font-semibold  mt-[2.7px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-copy p-[1.5px] border-2 hover:border-[#00abfb] rounded-full"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#00abfb"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
              </div>
              {!isEditing &&
                <div className="mt-[3px]">
                  <button disabled={isGuest} onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faPencil} className="border-2 hover:border-[#00abfb] ml-1 p-[5px] w-[13.5px] h-[13.5px]  rounded-full" color='#00abfb' /></button>
                </div>
              }

              {/* User click here, open modal and receive prompt  */}
              {!isPostsFeed &&
                <button onClick={handleOpenModal} disabled={isGuest}>
                  <FontAwesomeIcon
                    icon={faMicrochip}
                    className="border-2 hover:border-[#00abfb] ml-1 p-[4.3px] mt-[2.7px] w-4 h-4  rounded-full"
                    color="#00abfb"

                  />
                </button>
              }
            </div>
          </div>
        </header>
        <div className="grow mt-2">

          {/* condition socials connected */}


          <div className="text-sm  overflow-y-scroll font-medium mb-2">
            {isEditing ? (
              <div>
                <textarea
                  name="caption"
                  className='w-full text-sm'
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <div className='flex'>
                  <button disabled={isGuest} className="bg-green-500 w-[15%] cursor-pointer
                           text-center rounded-lg py-1 mr-2 text-white"
                    onClick={handleSaveClick}>Save</button>
                  <button className='text-red-400'
                    onClick={handleCancelClick}>Cancel</button>

                </div>
              </div>
            ) : (
              <div className='flex flex-col max-h-[90px] overflow-y-scroll'>
                <p className='pr-2'> {Caption}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="my-3 h-[60%] relative">

          {isMp4 && <ReactPlayer playIcon={<img src={logo}

            width={60} height={60} alt="thumbnail" />}
            controls={true} width="100%" url={MediaUrl} />}
          {isJpeg &&
            <img src={MediaUrl} className="h-[50vh]  w-full object-contain" />
          }
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

        <div className="my-2">{/* Engagement card link */}</div>
        <footer className="mt-2">
          <div className="flex justify-between items-center">
            <button
              disabled={isGuest}
              onClick={() => deleteFeedPost(feedPostId)}
              className="text-sm text-white rounded bg-[#ef3d22] p-2  cursor-pointer"
            >
              {/* Not Active */}
              <FontAwesomeIcon className="px-2" icon={faTrash} />
            </button>
            {isMp4 ?
              <div
                onClick={() => DownloadButton(MediaUrl)}
                className="text-sm text-white rounded bg-[#36d74b] p-2 cursor-pointer"
              >
                <FontAwesomeIcon className=" px-2" icon={faDownload} />
              </div>
              :

              <Link to={MediaUrl}>
                <div
                  // onClick={() => DownloadButton(MediaUrl)}
                  className="text-sm text-white rounded bg-[#36d74b] p-2 cursor-pointer"
                >
                  <FontAwesomeIcon className=" px-2" icon={faDownload} />
                </div>
              </Link>
            }
          </div>
        </footer>
      </div>

    </div>
  );
}

export default PostCard;