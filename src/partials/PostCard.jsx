import { faDownload, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
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


function PostCard({
  MediaUrl,
  Caption,
  Date: postDate,
  deleteFeedPost,
  handleCopyText,
  Accounts,
  DownloadButton,
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
    setEditing(true);
    //Update caption on the backend + setSaving(true)
    try {
      const response = await axios.put(
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/feed-posts/${id}`,
        {
          NewCaption: caption
        });
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

  // const navigate = useNavigate

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4
     bg-white shadow-md rounded-md border
      border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-200">
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-snug font-semibold">{Accounts}</h2>
            <div className="flex">
              <div
                onClick={() => handleCopyText(Caption)}
                className="text-xl cursor-pointer leading-snug font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-copy"
                  width="32"
                  height="32"
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
              {!isEditing && <div className="mt-1">
                <button className="" onClick={handleEditClick}>
                  <FontAwesomeIcon icon={faPencil} className="border-2 border-[#00abfb] ml-1 p-[5px] w-3 h-3  rounded-full" color='#00abfb' /></button>
              </div>}
            </div>
          </div>
        </header>
        <div className="grow mt-2">

          {/* condition socials connected */}

          {isAnAccountConnected ? (

            <div className="text-sm mb-2">
              <span className="font-medium">Scheduled for</span>{" "}
              <p className="text-pink-500 font-bold" target="_blank">
                {dateUpdate(localDate)}
              </p>
            </div>
          ) : (
            <div className="text-sm mb-2 text-blue-500 font-bold">

              <button onClick={getClientConnect} className="hover:underline">
                Connect your socials to schedule this post
              </button>


            </div>
          )}



          <div className="text-sm  overflow-y-scroll font-medium mb-2">
            {isEditing ? (
              <div>
                <textarea
                  className='w-full text-sm'
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <div className='flex'>
                  <button className="bg-green-500 w-[15%] cursor-pointer
                           text-center rounded-lg py-1 mr-2 text-white"
                    onClick={handleSaveClick}>Save</button>
                  <button className='text-red-400'
                    onClick={handleSaveClick}>Cancel</button>

                </div>
              </div>
            ) : (
              <div className='flex flex-col max-h-[90px] overflow-y-scroll'>
                <p className='pr-2'> {caption}
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

        <div className="my-2">{/* Engagement card link */}</div>
        <footer className="mt-2">
          <div className="flex justify-between items-center">
            <div
              onClick={() => deleteFeedPost(id)}
              className="text-sm text-white rounded bg-[#ef3d22] p-2  cursor-pointer"
            >
              {/* Not Active */}
              <FontAwesomeIcon className="px-2" icon={faTrash} />
            </div>
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