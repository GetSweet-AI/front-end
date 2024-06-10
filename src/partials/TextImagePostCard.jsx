import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Video from "./Video";
import { dateUpdate } from "./Time";
import { parseISO, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

function TextImagePostCard({
  id,
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

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4
     bg-white shadow-md rounded-md border
      border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-200">
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-snug font-semibold">{Accounts}</h2>
            <div
              onClick={() => handleCopyText(Caption)}
              className="text-xl cursor-pointer leading-snug font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-copy"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#00abfb"
                fill="none"
                stroke-linecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
              </svg>
            </div>
          </div>
        </header>
        <div className="grow mt-2">
          <div className="text-sm mb-2">
            <span className="font-medium">Scheduled for</span>{" "}
            <p className="text-pink-500 font-bold" target="_blank">
              {dateUpdate(localDate)}
            </p>
          </div>
          <div className="text-sm font-medium mb-2">{Caption}</div>
        </div>
        <div className="my-3 h-[60%] bg-red-400 relative">
          image here
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
            <div
              onClick={() => DownloadButton(MediaUrl)}
              className="text-sm text-white rounded bg-[#36d74b] p-2 cursor-pointer"
            >
              <FontAwesomeIcon className=" px-2" icon={faDownload} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TextImagePostCard;
