import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/SearchForm";
import FilterButton from "../components/DropdownFilter";
import BrandEngagementCard from "../partials/BrandEngagementCard";
import rolling from "../images/rolling.svg";
import Image01 from "../images/user-28-01.jpg";
import Image02 from "../images/user-28-02.jpg";
import image from "../images/photo.png";
import video from "../images/movie.png";
import DashboardHeader from "../partials/DashboardHeader";
import Select from "react-select";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faL, faPlus, faRefresh, faSave, faUser, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { languageOptions, targetAudienceOptions, timeZoneOptions } from "../constants/objects";
import brandTones from "../constants/brandTones";
import postTypeOptions from "../constants/postTypeOtions";
import { clearMessage, setMessage } from "../redux/message";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserData } from "../redux/auth";
import PaymentSuccessMessage from "../partials/PaymentSuccessMessage ";
import Onboarding from "../components/OnBoarding/Onboarding";
import SwitchButton from "../partials/SwitchButton";
import RadioButton from "../components/RadioButton";
import { debounce } from 'lodash';
import { Line } from 'rc-progress';
import DayPicker from "../components/DaysPicker";
import { Dialog, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { Callout } from '@radix-ui/themes';
import { Link, useNavigate } from "react-router-dom";
import AddNewBrandModal from "../partials/brand-engagments/AddNewBrandModal";

function BrandEngagementBuilder() {
  const dispatch = useDispatch();

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("Starting Generation Process");

  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // State to track visibility
  const [isVisible, setIsVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState('HasEndDate');

  // Create a new Date object for the current date
  const currentDate = new Date();

  // Format the date to yyyy-mm-dd
  const formattedDate = currentDate.toISOString().split('T')[0];

  const [endDate, setEndDate] = useState(''); // Initialize endDate state
  const [startDate, setStartDate] = useState(formattedDate); // Initialize endDate state
  const [selectedPostType, setSelectedPostType] = useState('TextImagePost');
  const [selectedDays, setSelectedDays] = useState(["Mon", "Wed", "Fri"]);

  // console.log("User :" + JSON.stringify(user))


  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then(({ totalPages, brandEngagements }) => {
        setEngagements(brandEngagements);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);

  const getUserData = async () => {
    await axios
      .get(
        `http://localhost:5000/api/v1/auth/users/${user?._id}`
      )
      .then((res) => {
        dispatch(setUserData(res?.data.user));
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [values, setValues] = useState({
    brandName: "",
    websiteUrl: "",
    timeZone: { value: "UTC (Coordinated Universal Time)", label: "UTC (Coordinated Universal Time)" },
    language: { value: "English", label: "English" },
    companySector: null,
    brandTone: { value: "Friendly", label: "Friendly" },
    targetAudience: null,
    postType: "",

  });

  const handleSelectChange = (name, selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const postData = {
    Timezone: values.timeZone?.value,
    language: values.language?.value,
    CompanySector: values.companySector,
    BrandTone: values.brandTone?.value,
    TargetAudience: values.targetAudience?.value,
    postContent: result,
    WebSite: values.websiteUrl,
    BrandName: values.brandName,
    endDate: endDate,
    startDate: startDate,
    lifeCycleStatus: selectedOption,
    PostType: selectedPostType,
    days: selectedDays
  };

  // console.log('selectedPostType :' + selectedPostType)

  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const handlePreview = async () => {
    setResult("");
    dispatch(clearMessage());

    if (!brandName) {
      dispatch(setMessage("Please provide the brand name"));
    } else if (!brandDescription) {
      dispatch(setMessage("Please provide the company sector"));
    } else {
      setPreviewLoading(true);
      setPreviewProgress(0);

      let interval = setInterval(() => {
        setPreviewProgress(oldProgress => {
          if (oldProgress < 90) {
            let newProgress = oldProgress + 10;

            // Update the message based on progress
            if (newProgress >= 20 && newProgress < 40) {
              setProgressMessage("Tailoring Unique Voice Traits");
            } else if (newProgress >= 40 && newProgress < 60) {
              setProgressMessage("Crafting a Distinctive Brand Voice");
            } else if (newProgress >= 60 && newProgress < 90) {
              setProgressMessage("Polishing Your Brand's Voice");
            }
            return newProgress;
          } else {
            clearInterval(interval);
            return oldProgress;
          }
        });
      }, 1500); // Adjust the interval as needed

      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/generate-blog-post",
          {
            brandName: brandName,
            companySector: brandDescription,
          }
        );
        setResult(res.data.postContent);

      } catch (err) {
        console.error(err);
        dispatch(setMessage("An error occurred"));
      } finally {
        clearInterval(interval);
        setPreviewProgress(100); // Set progress to 100% on completion
        setPreviewLoading(false);
      }
    }
  };

  const navigate = useNavigate()
  const handleSave = async () => {
    setSaveLoading(true);

    if (!brandName || !brandDescription) {
      dispatch(setMessage("Please provide all values "));
      setSaveLoading(false);
      return;
    }

    const postData = {
      BrandName: brandName,
      CompanySector: brandDescription,
      postContent: result
      // include other required fields here if necessary
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/save-brand-engagement/${user?._id}`,
        postData
      );

      getUserData();
      handleReset();
      setSaveLoading(false);
      toast.success("Brand Engagement saved successfully");

      const engagementResponse = await axios.get(
        `http://localhost:5000/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
      );

      const { totalPages, brandEngagements } = engagementResponse.data;
      setEngagements(brandEngagements);
      setNumberOfPages(totalPages);

      navigate(`/brand-engagements/${brandEngagements[0]?._id}?modal=congratulations`);
      fetchEngagements();
      dispatch(clearMessage());
      setBrandDescription('')
      setBrandName('')
      setIsOpen(false)
    } catch (error) {
      setSaveLoading(false);
      if (error.message === "Request failed with status code 400") {
        dispatch(setMessage('BrandName must be unique'));
      } else {
        dispatch(setMessage('An error occurred'));
      }
    }
  };

  const handleReset = () => {
    setValues({
      brandName: "",
      websiteUrl: "",
      timeZone: null,
      companySector: "",
      brandTone: null,
      targetAudience: null
    });
    setResult(null);
    dispatch(clearMessage());
  };
  // console.log("_id :" + user?._id)

  const fetchEngagements = async () => {
    await fetch(
      `http://localhost:5000/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then(({ totalPages, brandEngagements }) => {
        setEngagements(brandEngagements);
        setNumberOfPages(totalPages);
      });
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  // console.log("Token " + token)
  const handleCopyText = () => {
    // Convert HTML to plain text
    const tempElement = document.createElement("div");
    tempElement.innerHTML = result;
    const plainText = tempElement.innerText;

    // Copy the plain text to the clipboard
    navigator.clipboard.writeText(plainText);

    // Show a toast message
    toast.success("Text copied successfully!");
  };

  // console.log("Post type :" + JSON.stringify(values.postType));
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  //Handle notification on payment 
  const handleNotificationClose = async () => {

    try {
      // Make a POST request to update the notificationMessage in the backend using Axios
      // Replace 'YOUR_UPDATE_NOTIFICATION_ENDPOINT' with your actual endpoint
      await axios.put(`http://localhost:5000/api/v1/auth/update-notification-message/${user._id}`, {
        notificationMessage: 'none',
      }).then((res) => {
        fetchUserData()
      })
    } catch (error) {
      // console.error('Error updating notificationMessage:', error);
    }
  }

  const fetchUserData = async () => {
    await axios
      .get(
        `http://localhost:5000/api/v1/auth/users/${user?._id}`
      )
      .then((res) => {
        dispatch(setUserData(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //Handle template button clicked
  const handleButtonClick = (template) => {
    setValues({
      brandName: template.BrandName,
      websiteUrl: template.WebSite,
      timeZone: { label: template.Timezone, value: template.Timezone },
      companySector: template.CompanySector,
      brandTone: { label: template.BrandTone, value: template.BrandTone },
    });

    const endDateValue = template.lifeCycleStatus === "HasEndDate" ? template.endDate : ""
    const startDateValue = template.lifeCycleStatus === "HasEndDate" ? template.startDate : ""
    setEndDate(endDateValue)
    setStartDate(startDateValue)
    setSelectedOption(template.lifeCycleStatus)
    template.lifeCycleStatus === "HasEndDate" ? setEnabled(true) : ""

  };

  //Get template + add delete icon
  const [templates, setTemplates] = useState([])
  const getTemplates = async () => {
    try {
      await axios.get(`http://localhost:5000/api/v1/admin/templates?userId=${user?._id}`).then((res) => {
        setTemplates(res.data.templates)
        console.log(res.data.templates)
      })

    } catch (error) {

    }
  }

  useEffect(() => {
    getTemplates()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTargetAudienceInputChange = (e) => {
    const { name, value } = e.target;

    // Call the debounced function
    // debouncedGetTargetAudiences();

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (enabled) {
      //Show endDate field
      setSelectedOption("HasEndDate")
    } else {
      setSelectedOption("RunForEver")
      setEndDate("")
    }
  }, [enabled])

  const handlePostTypeChange = (event) => {
    setSelectedPostType(event.target.value);
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleResultChange = (event) => {
    setResult(event.target.value);
  };

  const disableFirstLogin = async () => {
    try {

      await axios.put(`http://localhost:5000/api/v1/auth/users/disable-first-login/${user?._id}`);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("Selected Days:", selectedDays);
  }, [selectedDays]);

  // useEffect(() => {
  //   setIsVisible(!(engagements.length > 0));
  // }, [engagements]);

  function closeModal() {
    setIsOpen(false)
  }

  console.log(brandName)
  console.log(brandDescription)
  console.log({
    BrandName: brandName,
    CompanySector: brandDescription,
    postContent: result
    // include other required fields here if necessary
  })

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <AddNewBrandModal
        isOpen={isOpen}
        onCancel={closeModal}
        handlePreview={handlePreview}
        brandName={brandName}
        setBrandName={setBrandName}
        brandDescription={brandDescription}
        setBrandDescription={setBrandDescription}
        isLoading={previewLoading}
        userId={user?._id}
      >
        <div className="flex flex-wrap bg-blue-50  rounded-lg mt-2">

          {result &&
            <div className="w-full flex-col mt-2 md:mx-4  text-white md:px-4  bg-[#333333] rounded-lg p-4">
              {result && (
                <div className="flex justify-end mb-4">
                  {!isEditing && <button className="bg-green-500 w-[15%] cursor-pointer
                         text-center rounded-lg py-1 mr-2" onClick={handleEditClick}>Edit</button>}
                  <div
                    onClick={handleCopyText}
                    className="bg-slate-600 w-[15%] cursor-pointer text-center  rounded-lg py-1 "
                  >
                    <p className=" ">

                      Copy
                    </p>
                  </div>
                </div>
              )}
              <div className=" md:space-y-3 md:mt-0 mt-2">
                {isEditing ? (
                  <div>
                    <textarea
                      value={result}
                      rows={10}
                      onChange={handleResultChange}
                      className="text-white bg-[#333333] w-full"
                    />
                    <div className="flex mt-3">  <button className="bg-green-500 w-[15%] cursor-pointer
                         text-center rounded-lg py-1 mr-2" onClick={handleSaveClick}>Save</button>
                      <button className="text-red-400" onClick={handleCancelClick}>Cancel</button></div>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-medium h-60 overflow-y-scroll">
                    {result !== null ? ReactHtmlParser(result) : "Results will be added here."}

                  </pre>
                )}
              </div>
            </div>
          }
          {(result && !previewLoading) ?
            <div className="w-full   mt-2">
              <button
                type="button"
                onClick={() => {
                  !saveLoading && handleSave();
                }}
                className="flex justify-center items-center w-full hover:bg-green-600 hover:font-bold bg-green-500 text-white rounded p-2"
              >
                {saveLoading ? (
                  <>
                    <img
                      className="mr-2"
                      width={20}
                      src={rolling}
                    />
                    Saving...
                  </>
                ) : (
                  "Save your brand "
                )}
                <FontAwesomeIcon className="ml-2" icon={faSave} color="white" size={24} />
              </button>
            </div>
            :
            <></>
          }
        </div>
      </AddNewBrandModal>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          header="Brand Engagement Builder"
        />

        <main>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="md mb-8">
              {/* Left: Title */}
              <div className="mb-4 flex md:justify-between md:flex-row flex-col sm:mb-0">
                <h1 className="text-xl   text-blue-500 font-bold flex justify-between items-center">
                  <span className="md:hidden ">Brand Builder</span>
                </h1>
                <button
                  className="px-2 py-2.5 bg-pink-500 md:mt-0 mt-2  text-center text-white rounded text-sm flex items-center font-normal"
                  onClick={() => setIsOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 text-pink-500 text-center  bg-white py-1 px-[5px] mb-[1px] rounded-full" />
                  <span className="hover:font-bold"> Add Brands</span>
                </button>
              </div>


              <div className="my-4 sm:mb-8 flex flex-col">  {/* Increased the bottom margin to mb-8 */}
                {user.notificationMessage !== 'none' &&
                  <PaymentSuccessMessage
                    onClose={handleNotificationClose}
                    text={(user.notificationMessage === 'payment_failed') ? 'Payment Failed!' : user.notificationMessage === 'payment_succeeded' ? "Payment succeeded" : ""} />
                }                <p className="text-slate-800">
                  Welcome to
                  <span className='text-pink-600 font-medium'>Get Sweet’s brand engagement builder</span>, your home for building your voice as a company and will empower your input to be transformed into actual posts for your social media platforms.
                  Be sure to be specific about what your brand offers and the overall objective you would like to get out of your brand.
                </p>
                {
                  isVisible &&
                  <>
                    {
                      templates.length > 0 && <h1 className="text-md md:text-xl my-3 text-gray-500 font-bold flex justify-between items-center">
                        Start from template
                      </h1>
                    }


                    <div className="flex flex-wrap">
                      {
                        templates?.map((template, idx) => (
                          <button
                            key={idx}
                            className="border-2 cursor-pointer text-sm m-1 text-md hover:bg-blue-600
                            hover:text-white border-blue-600 py-2 px-3 rounded-xl"
                            onClick={() => handleButtonClick(template)}
                          >
                            {template.Title}
                          </button>
                        ))
                      }</div>
                  </>
                }
              </div>

              {/* Element that will be shown/hidden */}
              <div className="hidden">

                {/*Brand Engagement Card Form*/}
                {/* {user?.availableTokens === 0 ? (

                  <div className=''>
                    <Callout.Root color="red">
                      <Callout.Icon>
                        <FontAwesomeIcon className="mb-[2px]" icon={faInfo} color="red" size={24} />
                      </Callout.Icon>
                      <Callout.Text>
                        No tokens remaining. <Link to="/payment">Purchase more to continue.</Link>
                      </Callout.Text>
                    </Callout.Root>
                  </div>

                ) : ( */}

                {/* )} */}
              </div>
              {/* Element that will be shown/hidden */}
            </div>

            {/* OnBoarding */}
            {user?.firstLogin && <Onboarding
              closeModal={closeModal}
              isOpen={isOpen}
              disableFirstLogin={disableFirstLogin}
            />
            }
            {engagements?.length > 0 && (
              <div className="">
                <h5 className=" text-xl text-blue-500 
                 mb-2 font-bold sm:mb-4">
                  Your saved brands
                </h5>
                <div className="grid grid-cols-12 gap-6">
                  {engagements.map((item) => {
                    return (
                      <BrandEngagementCard
                        key={item._id}
                        id={item._id}
                        brandName={item?.BrandName}
                        websiteUrl={item.WebSite}
                        timeZone={item.Timezone}
                        companySector={item.CompanySector}
                        brandTone={item.BrandTone}
                        targetAudience={item.TargetAudience}
                        postType={item.PostType}
                        postContent={item.postContent}
                        relatedPostsStatus={item.relatedPostsStatus}
                        fetchEngagements={fetchEngagements}
                        userId={user?._id}
                        setFormValues={setValues}
                        isAdminPage={false}
                        setIsVisible={setIsVisible}
                        campaignTitle={item?.campaignTitle}
                        endDate={item?.endDate}
                        setEndDate={setEndDate}
                        setSelectedOption={setSelectedOption}
                        lifeCycleStatus={item?.lifeCycleStatus}
                        setEnabled={setEnabled}
                        isViewOnly={false}
                      />
                    );
                  })}
                </div>
                {numberOfPages > 1 && (
                  <div class="flex items-center md:mt-4 justify-center space-x-2">
                    <button
                      className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                      onClick={gotoPrevious}
                    >
                      Previous
                    </button>

                    {/* {pages.map((pageIndex) => (
                      <button
                        key={pageIndex}
                        className={`${pageNumber === pageIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                          } px-3 py-1 rounded-lg`}
                        onClick={() => setPageNumber(pageIndex)}
                      >
                        {pageIndex + 1}
                      </button>
                    ))} */}
                    <select
                      value={pageNumber}
                      onChange={(e) => setPageNumber(e.target.value)}
                      className="rounded-md h-9 bg-white border border-gray-300 text-gray-600 "
                    >
                      {pages.map((pageIndex) => (
                        <option
                          key={pageIndex}
                          value={pageIndex}
                          className="text-black"
                        >
                          {pageIndex + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                      onClick={gotoNext}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default BrandEngagementBuilder;