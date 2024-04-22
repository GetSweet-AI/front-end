import { faClone, faEye, faImage, faPaperclip, faTrash, faVideo } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { clearActiveBrandEngagement, setActiveBrandEngagement } from "../redux/message";
import { Dialog, Transition } from '@headlessui/react'
import { Badge } from '@radix-ui/themes';

function BrandEngagementCard({
  id,
  brandName,
  websiteUrl,
  timeZone,
  companySector,
  brandTone,
  targetAudience,
  postType,
  fetchEngagements,
  relatedPostsStatus,
  postContent,
  checkConnectLinkExistsByBrandEngagementID,
  isArchive,
  userId,
  setFormValues,
  isAdminPage,
  setIsVisible,
  endDate,
  lifeCycleStatus,
  setSelectedOption,
  setEndDate,
  setEnabled,
  campaignTitle
}) {
  const navigate = useNavigate();

  const [isArchiveLoading, setIsArchiveLoading] = useState(false)
  const deleteBrandEngagement = async (brandEngagementId) => {
    setIsArchiveLoading(true)
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/brand-engagements/${brandEngagementId}`
      );
      console.log(response.data); // Success message or response data
      fetchEngagements();
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.log(error); // Handle error
    }
    setIsArchiveLoading(false)
  };

  const handleCloneClick = () => {
    // Create an object with the current brand engagement data
    const brandEngagementData = {
      brandName,
      websiteUrl,
      timeZone: { label: timeZone, value: timeZone },
      companySector,
      brandTone: { label: brandTone, value: brandTone },
      targetAudience,
      postType,
    };

    // Call the setFormValues function to set the form values
    setFormValues(brandEngagementData);
    setIsVisible(true)

    console.log("End Date : " + endDate)

    //Apply life cycle status here
    // const endDateValue = lifeCycleStatus === "HasEndDate" ? endDate : ""
    // setEndDate(endDateValue)
    // setSelectedOption(lifeCycleStatus)
    // lifeCycleStatus === "HasEndDate" ? setEnabled(true) : ""

  };


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearActiveBrandEngagement())
  }, [])
  const handleAttachAssets = () => {
    navigate('/assets')
    dispatch(setActiveBrandEngagement(id))
  }



  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const confirmDelete = () => {
    deleteBrandEngagement(id); // Call your delete function
    toggleModal(); // Close the modal
  };

  const [editedCampaignTitle, setEditedCampaignTitle] = useState(campaignTitle);

  const handleCampaignTitleChange = (e) => {
    setEditedCampaignTitle(e.target.value);
  };



  const [isSaving, setIsSaving] = useState(false);
  const handleSaveCampaignTitle = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/update-campaign/${id}`, {
        campaignTitle: editedCampaignTitle
      });
      // Assuming successful update, update campaign title locally
      setCampaignTitle(editedCampaignTitle);
    } catch (error) {
      console.error("Error updating campaign title:", error);
    }
    setIsSaving(false);
  };



  return (
    <><div className=" col-span-full sm:col-span-6 xl:col-span-4">
      <div className="bg-white shadow-lg rounded-lg border border-slate-200 hover:shadow-blue-200 hover:shadow-xl hover:border-blue-500">

        <div className="flex flex-col h-full p-5">
          <header className="bg-blue-500 max-h-[4.4rem]  overflow-hidden text-white py-4 px-6 rounded-t-lg">
            <div className="flex items-center justify-between h-full">
              <h2 className="text-xl leading-tight font-semibold overflow-hidden">
                {brandName}
              </h2>
            </div>
          </header>
          {/* <div className="text-sm my-1 flex"> */}
          {/* <span className="font-medium">Post Type : </span> */}
          <div className="flex justify-between bg-blue-50 rounded-es-xl rounded-ee-xl  p-2 space-x-2 pt-2">
            {/* <p className="font-bold  text-blue-600">
              {campaignTitle && campaignTitle}
            </p> */}
            <div className="relative flex">
              <input
                type="text"
                value={editedCampaignTitle}
                onChange={handleCampaignTitleChange}
                className="font-bold text-blue-600 outline-none border-none rounded-lg pr-10"
              />
              <button
                onClick={handleSaveCampaignTitle}
                className="absolute right-0 top-0 bottom-0 bg-blue-100 text-blue-600 cursor-pointer py-1 px-2 rounded-r-lg"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>



            <div className="flex space-x-2 pt-2">{postType === "TextImagePost" && <FontAwesomeIcon icon={faImage} color="#0967eb" size="xl" />}
              {postType === "TextVideoPost" && <FontAwesomeIcon icon={faVideo} color="#0967eb" size="xl" />}
              {postType === "Both" &&
                <>
                  <FontAwesomeIcon icon={faImage} color="#0967eb" size="xl" />
                  <FontAwesomeIcon icon={faVideo} color="#0967eb" size="xl" />
                </>
              }
            </div>


          </div>
          {/* </div> */}

          <div className="grow mt-2">
            {websiteUrl ?
              <div className="text-sm mb-2 ">
                <span className="font-medium">websiteUrl</span> :{" "}
                <a
                  className="underline text-blue-500"
                  href={websiteUrl}
                  target="_blank"
                >
                  {websiteUrl}
                </a>
              </div>
              :
              <div className="text-sm mb-2"></div>
            }
            <div className="text-sm mb-2 ">
              <span className="font-medium">Time Zone</span>: {timeZone}
            </div>
            {" "}
            <div className="text-sm mb-2 ">
              <span className="font-medium">Brand Tone</span>: {brandTone}
            </div>
            <div className="text-sm mb-2 h-12 overflow-y-hidden">
              <span className="font-medium">Brand Description</span>:{" "}
              {companySector}
            </div>
            {/* {endDate && <div className="text-sm mb-2 h-6 bg-slate-400 overflow-y-hidden">
            <span className="font-medium">End Date</span>:{" "}
            {endDate}
          </div>} */}
            {postContent && <div className="flex flex-col">
              <div className="text-sm mb-2 text-center col-span-1">
                <div className="flex items-center">
                  <div className="flex-1 h-0.5 bg-gray-300 mr-2"></div>
                  <span className="font-bold">Post Content</span>
                  <div className="flex-1 h-0.5 bg-gray-300 ml-2"></div>
                </div>
              </div>
              <div className={`text-sm mb-2 h-16 text-gray-900 ${postContent ? "overflow-y-scroll" : ""} col-span-3`}>
                {postContent && ReactHtmlParser(postContent)}
              </div>
            </div>}
            <div class="bg-blue-500 text-white p-[1px] my-4"></div>
            {
              !isArchive && <div className="text-sm mb-2">
                {relatedPostsStatus === "Posts generating..." ? (
                  <div className="flex my-2 justify-center space-x-4 items-center">
                    <Badge color="orange" size={"2"}>Generating posts...</Badge>
                  </div>
                ) : (
                  <div className="flex my-2 justify-center space-x-4 items-center">
                    <Badge color="green" size={"2"}>Posts are ready</Badge>   </div>
                )}
              </div>
            }
          </div>
          {!isArchive &&
            <footer className="mt-2 flex-col">
              <div className="flex justify-between space-x-2 items-center">
                {
                  !isAdminPage &&
                  <button

                    onClick={handleCloneClick}
                    className="text-sm flex justify-center
             items-center font-medium md:flex-[0.3]
              flex-[0.3] bg-white hover:text-white text-blue-700 
                p-2.5 cursor-pointer
                    shadow-md rounded-lg
               hover:bg-blue-700 hover:font-bold 
               "

                  >
                    {/* Not Active */}

                    <FontAwesomeIcon className="mr-2" icon={faClone} /> Clone
                  </button>
                }
                <div

                  onClick={() => navigate(`/brand-engagements/${id}`)}
                  className="text-sm flex justify-center
                  items-center font-medium md:flex-[0.3]
                   flex-[0.3] bg-white text-blue-700
                    rounded-md  p-2 cursor-pointer
                    border-2 border-blue-600 hover:bg-blue-600
                    hover:text-white hover:font-bold 
                    "
                >
                  {/* Not Active */}
                  <FontAwesomeIcon className="mr-2" icon={faEye} />
                  View
                </div>


                <button
                  onClick={toggleModal}
                  className="text-sm text-white hover:font-bold rounded text-center bg-red-500 hover:bg-red-600 flex-[0.3] p-2 cursor-pointer"
                >
                  {isArchiveLoading ? "Archiving.." : <> <FontAwesomeIcon className="mr-2" icon={faTrash} />
                    Archive</>}
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="text-md flex justify-center items-center font-medium bg-white text-blue-700 rounded-md py-2 px-3 cursor-pointer hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  onClick={handleAttachAssets}
                >
                  Attach assets
                  <FontAwesomeIcon className="ml-2" icon={faPaperclip} />
                </button>

              </div>


            </footer>}
        </div>
      </div >
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>


          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full w-full bg-black bg-opacity-30 items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-4">

                    <p className="mt-3 text-xl text-start text-red-500 font-bold">
                      Archiving is irreversible. </p>
                    <p className="mb-6 mt-3 text-xl">
                      Are you sure you want to proceed?</p>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={confirmDelete}
                      >
                        Yes, Archive
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ml-4"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div >{/* Modal for archive confirmation */}
    </>

  );
}

export default BrandEngagementCard;