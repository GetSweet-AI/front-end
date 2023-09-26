import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser from "react-html-parser";

function BrandEngagementCard({
  id,
  brandName,
  website,
  timeZone,
  companySector,
  brandTone,
  targetAudience,
  postType,
  fetchEngagements,
  relatedPostsStatus,
  postContent,
  checkConnectLinkExistsByBrandEngagementID,
  isArchive
}) {
  const navigate = useNavigate();

  const deleteBrandEngagement = async (brandEngagementId) => {
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
  };

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-md rounded-md border border-slate-200">
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-snug font-semibold">{brandName}</h2>
          </div>
        </header>
        <div className="grow mt-2">
          <div className="text-sm mb-2">
            <span className="font-medium">Website</span> :{" "}
            <a
              className="underline text-blue-500"
              href={website}
              target="_blank"
            >
              {website}
            </a>
          </div>
          <div className="text-sm mb-2">
            <span className="font-medium">Time Zone</span>: {timeZone}
          </div>{" "}
          <div className="text-sm mb-2">
            <span className="font-medium">Brand Tone</span>: {brandTone}
          </div>
          <div className="text-sm mb-2 h-12 overflow-y-hidden">
            <span className="font-medium">Brand Description</span>:{" "}
            {companySector}
          </div>
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
                  <p className="font-medium text-gray-600">Posts generating...</p>
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
                  <p className="font-medium text-gray-600 ">Posts are ready</p>
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
              className="text-sm font-medium md:flex-[0.3] flex-[0.3] bg-slate-200 text-blue-700 rounded  p-2 cursor-pointer"
            >
              {/* Not Active */}
              <FontAwesomeIcon className="mr-2" icon={faEye} />
              View
            </div>

            <div
              className="text-sm text-white rounded text-center bg-[#d7364b] flex-[0.4] p-2 cursor-pointer"
              onClick={() => deleteBrandEngagement(id)}
            >
              <FontAwesomeIcon className="mr-2" icon={faTrash} />
              Delete
            </div>
          </div>
        </footer>}
      </div>
    </div >
  );
}

export default BrandEngagementCard;
