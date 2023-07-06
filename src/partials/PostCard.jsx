import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import Video from "./Video";

function PostCard({ id, MediaUrl, Caption, Date, deleteFeedPost, handleCopyText, Accounts }) {

    return (
        <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm hover:bg-gray-50 hover:translate-y-1 hover:translate-x-1 border border-slate-200">
            <div className="flex flex-col h-full p-5">
                <header>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl leading-snug font-semibold">
                            {Accounts}
                        </h2>
                        <div onClick={() => handleCopyText(Caption)} className="text-xl cursor-pointer leading-snug font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                            </svg>
                        </div>
                    </div>
                </header>
                <div className="grow mt-2">
                    <div className="text-sm mb-2">
                        <span className="font-medium">Ponsting on</span> :{" "}
                        <a className="underline text-blue-500" target="_blank">
                            {Date}
                        </a>
                    </div>
                    <div className="text-sm font-medium mb-2">
                        {Caption}
                    </div>

                </div>
                <div className="my-3 bg-red-400 h-[60%] relative">
                    <ReactPlayer controls={true} width="100%" url="https://brandable.cldportal.com/c84d3214-9b5d-41ed-ad30-d9badbe4edbd" />
                </div>

                <div className="my-2">
                    {/* Engagement card link */}
                </div>
                <footer className="mt-2">
                    <div className="flex justify-between items-center">
                        <div onClick={() => deleteFeedPost(id)} className="text-sm text-white rounded bg-[#ef3d22] p-2  cursor-pointer" >
                            {/* Not Active */}
                            <FontAwesomeIcon className="px-2" icon={faTrash} />
                        </div>
                        <div className="text-sm text-white rounded bg-[#36d74b] p-2 cursor-pointer" >

                            <FontAwesomeIcon className=" px-2" icon={faDownload} />
                        </div>

                    </div>
                </footer>

            </div>
        </div>
    );
}

export default PostCard;
