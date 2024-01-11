import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import userPicture from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AvatarEditor from "react-avatar-editor";

//funcion actualizar foto
export const updateUserPicture = async (newPictureUrl) => {
  try {
    const response = await axios.put(
      `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/users`,
      { picture: newPictureUrl }
    );

    if (response.status === 200) {
      console.log("Picture updated successfully");
    } else {
      console.error(
        "Error updating profile picture - Status:",
        response.status
      );
      console.error("Response data:", response.data);
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

//funcion borrar foto
export const deleteUserPicture = async () => {
  try {
    const response = await axios.put(
      `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/update-profile-picture`,
      { picture: "" }
    );
    if (response.status === 200) {
      console.log("Profile picture deleted successfully");
      return true;
    } else {
      console.log("Error deleting profile picture - Status: ", response.status);
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

function ChangePic({ isOpen, setIsOpenPic, picture }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const userPic = picture || userPicture;
  const editorRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log("Nueva URL picture: ", newPictureUrl);
  };

  const handleCropImage = () => {
    if (editorRef.current) {
      const croppedImageURL = editorRef.current
        .getImage()
        .toBlob((blob) => {}, "image/jpeg", 1);
      console.log("imagen recortada : ", croppedImageURL);
    }
  };

  const handleDeleteImage = async () => {
    const success = await deleteUserPicture();
    if (success) {
      setSelectedImage(null);
      setIsOpenPic(false);
    } else {
      console.error("Error al eliminar la imagen");
    }
  };

  const handleCloseChanger = () => {
    setIsOpenPic(false);
    setSelectedImage(null);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 mx-auto max-w-md">
            <div className="flex justify-end">
              <button
                onClick={handleCloseChanger}
                className="text-red-300 hover:text-red-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faTimes} size="2x" />{" "}
              </button>
            </div>
            <div className="text-center mx-2">
              <div className="mb-6 text-lg font-bold text-blue-800 border-b-2 border-blue-200 pb-2 ">
                Profile Picture
              </div>

              <AvatarEditor
                ref={editorRef}
                image={selectedImage || userPic}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.6]}
                scale={1}
              />

              <input
                type="file"
                accept="image/"
                id="profilePic"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="flex flex-col items center ">
                <label
                  htmlFor="profilePic"
                  className="mt-2 cursor-pointer bg-blue-500 hover:bg-blue-800 text-white py-2 px-2 rounded-lg mt-2 w-full"
                >
                  Select Image
                </label>

                <div className="flex mt-2">
                  <button
                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mr-2 cursor-pointer w-[50%]"
                    onClick={async () => {
                      if (selectedImage) {
                        handleCropImage();
                      } else {
                        console.error("No image selected");
                      }
                    }}
                  >
                    Change
                  </button>
                  <button
                    onClick={handleDeleteImage}
                    className="w-[50%] mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg ml-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ChangePic;