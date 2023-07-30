import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import PopupDelCard from "./PopupDeleteCard";

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
}) {
  const deleteBrandEngagement = async (brandEngagementId) => {
    try {
      const response = await axios.delete(
        `https://seashell-app-8amlb.ondigitalocean.app/api/v1/brand-engagements/${brandEngagementId}`
      );
      console.log(response.data); // Success message or response data
      fetchEngagements();
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.log(error); // Handle error
    }
  };
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm hover:bg-gray-50 hover:translate-y-1 hover:translate-x-1 border border-slate-200">
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
            <span className="font-medium">Time Zone</span> : {timeZone}
          </div>
          <div className="text-sm mb-2">
            <span className="font-medium">Company Sector</span> :{" "}
            {companySector}
          </div>
          <div className="text-sm mb-2">
            <span className="font-medium">Brand Tone</span> : {brandTone}
          </div>
          <div className="text-sm mb-2">
            <span className="font-medium">Target Audience</span> :{" "}
            {targetAudience}
          </div>
        </div>
        <footer className="mt-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-white rounded  p-2 cursor-pointer">
              {/* Not Active */}
            </div>

            <PopupDelCard
              deleteBrandEngagement={deleteBrandEngagement}
              id={id}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default BrandEngagementCard;
