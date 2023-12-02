import React from "react";
import { useState } from "react";
import assets from "../images/assets.gif";
import axios from "axios";

export default function UploadImage({ brandEngagementId, fetchEngagements }) {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [urls, setUrls] = useState([]);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    async function uploadSingleImage(base64) {
        setLoading(true);
        await axios
            .post("https://seashell-app-2-n2die.ondigitalocean.app/api/uploadImage", { image: base64, brandEId: brandEngagementId })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Succesfully");
            })
            .then(() => {
                fetchEngagements()
                setLoading(false)
            })
            .catch(console.log);
    }

    async function uploadImages(files) {
        setLoading(true);
        const uploadPromises = Array.from(files).map(async (file) => {
            const base64 = await convertBase64(file);
            return axios.post("https://seashell-app-2-n2die.ondigitalocean.app/api/uploadImage", {
                image: base64,
                brandEId: brandEngagementId,
            });
        });

        try {
            const responses = await Promise.all(uploadPromises);
            const uploadedUrls = responses.map((res) => res.data);
            setUrls(uploadedUrls);
            console.log('uploadedUrls :' + JSON.stringify(uploadedUrls))
            alert("Images uploaded successfully");
            fetchEngagements()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }


        if (files.length > 0) {
            uploadImages(files);
        }

        fetchEngagements()

    };

    function UploadInput() {
        return (
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and
                            drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        onChange={uploadImage}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*" // This restricts selection to image files
                    />
                </label>
            </div>
        );
    }




    return (
        <div className="flex justify-center flex-col p-2 ">
            <div>
                <h2 className="mb-4  tracking-tight ">
                    Attach image to the chosen brand engagement 📸
                </h2>
            </div>

            <div>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <img src={assets} />{" "}
                    </div>
                ) : (
                    <UploadInput />
                )}
            </div>
            {/* <div>
                {url && (
                    <div className="text-gray-700 mt-2">
                        <span className="font-bold text-blue-600">Access your image at :</span>
                        <a href={url[0]} target="_blank" className="ml-2 hover:underline" rel="noopener noreferrer">
                            {url[0]}
                        </a>
                        <img
                            src={url[0]}
                        />
                    </div>
                )}
                <div className="text-gray-700 mt-2">
                    <span className="font-bold text-blue-600">Access your images at :</span>
                    {urls?.map((uploadedUrl, index) => (
                        <div key={index}>
                            <a href={uploadedUrl} target="_blank" className="ml-2 hover:underline" rel="noopener noreferrer">
                                {uploadedUrl}
                            </a>
                            <img src={uploadedUrl} alt={`uploaded-${index}`} />
                        </div>
                    ))}
                </div>

            </div> */}
        </div>
    );
}