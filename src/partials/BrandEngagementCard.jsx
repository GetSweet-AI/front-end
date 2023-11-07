import { faClone, faEye, faImage, faTrash, faVideo } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser from "react-html-parser";

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
  setEnabled
}) {
  const navigate = useNavigate();

  const [isArchiveLoading, setIsArchiveLoading] = useState(false)
  const deleteBrandEngagement = async (brandEngagementId) => {
    setIsArchiveLoading(true)
    try {
      const response = await axios.delete(
        `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/brand-engagements/${brandEngagementId}`
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

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4">
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
          <div className="flex justify-center bg-blue-50 rounded-es-xl rounded-ee-xl  p-2 space-x-2 pt-2">
            <FontAwesomeIcon icon={faImage} color="#0967eb" size="xl" />
            <FontAwesomeIcon icon={faVideo} color="#0967eb" size="xl" />
          </div>
          {/* </div> */}

          <div className="grow mt-2">
            {websiteUrl ? <div className="text-sm mb-2">
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
            <div className="text-sm mb-2">
              <span className="font-medium">Time Zone</span>: {timeZone}
            </div>
            {" "}
            <div className="text-sm mb-2">
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
              <div className="text-sm  mb-2 col-span-1">
                <span className="font-bold">Post Content </span>
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
                    <p className="text-lg font-semibold text-blue-500">Posts generating...</p>
                    <ThreeDots
                      height="10"
                      width="40"
                      radius="9"
                      color="#0967eb"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <div className="flex my-2 justify-center space-x-4 items-center">
                    {" "}
                    <p className="text-lg font-semibold text-blue-500">Posts are ready</p>
                    <FontAwesomeIcon icon={faCheck} color="#0967eb" size={24} />
                  </div>
                )}
              </div>
            }
          </div>
          {!isArchive && <footer className="mt-2">
            <div className="flex justify-between space-x-2 items-center">
              <div

                onClick={() => navigate(`/brand-engagements/${id}`)}
                className="text-sm flex justify-center items-center font-medium md:flex-[0.3] flex-[0.3] bg-slate-200 text-blue-700 rounded  p-2 cursor-pointer"
              >
                {/* Not Active */}
                <FontAwesomeIcon className="mr-2" icon={faEye} />
                View
              </div>
              {
                !isAdminPage && <button

                  onClick={handleCloneClick}
                  className="text-sm flex justify-center
             items-center font-medium md:flex-[0.3]
              flex-[0.3] bg-white text-blue-700
               rounded-md  p-2 cursor-pointer
               border-2 border-blue-600
               hover:bg-gray-100
               "

                >
                  {/* Not Active */}

                  <FontAwesomeIcon className="mr-2" icon={faClone} /> Clone
                </button>
              }

              <button
                className="text-sm text-white rounded text-center bg-[#d7364b] flex-[0.3] p-2 cursor-pointer"
                onClick={() => deleteBrandEngagement(id)}
                disabled={isArchiveLoading}
              >
                {isArchiveLoading ? "Archiving.." : <> <FontAwesomeIcon className="mr-2" icon={faTrash} />
                  Archive</>}
              </button>
            </div>
          </footer>}
        </div>
      </div >
    </div >
  );
}

export default BrandEngagementCard;
