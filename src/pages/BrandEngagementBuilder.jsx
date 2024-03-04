import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/SearchForm";
import FilterButton from "../components/DropdownFilter";
import BrandEngagementCard from "../partials/BrandEngagementCard";
import PaginationNumeric from "../partials/PaginationNumeric";
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
import { faEye, faL, faPlus, faRefresh, faSave, faUser } from "@fortawesome/free-solid-svg-icons";
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

  // console.log("User :" + JSON.stringify(user))


  useEffect(() => {
    fetch(
      `https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
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
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/users/${user?._id}`
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
    PostType: selectedPostType
  };

  // console.log('selectedPostType :' + selectedPostType)

  const handlePreview = async (e) => {
    e.preventDefault();
    setResult("");
    dispatch(clearMessage())
    const { brandName, brandTone, companySector, timeZone, targetAudience } = values;

    if (!brandTone) {
      dispatch(setMessage("Please provide the brand tone"));
    } else if (!companySector) {
      dispatch(setMessage("Please provide the company sector"));
    } else if (!brandName) {
      dispatch(setMessage("Please provide the brand name"));
    } else if (!timeZone) {
      dispatch(setMessage("Please provide the time zone"));
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
          "https://seal-app-dk3kg.ondigitalocean.app/api/v1/generate-blog-post",
          {
            tone: brandTone?.value,
            brandName: brandName,
            CompanySector: companySector,
            targetAudience: targetAudience?.value
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


  const handleSave = async () => {
    setSaveLoading(true);

    const { brandName, brandTone, timeZone, companySector, websiteUrl } =
      values;
    if (!brandTone | !companySector | !brandName) {
      dispatch(setMessage("Please provide all values "));
      setSaveLoading(false);
    } else if (selectedOption === "HasEndDate" && endDate === "") {
      dispatch(setMessage("Please provide End Date "));
      setSaveLoading(false);
    } else {
      await axios
        .post(
          `https://seal-app-dk3kg.ondigitalocean.app/api/v1/save-brand-engagement/${user?._id}`,
          postData
        )
        .then((res) => {
          getUserData();
          handleReset();
          setSaveLoading(false);
          toast.success("Brand Engagement saved successfully");
          // console.log(res.data);
          axios.get(
            `https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
          )
            .then((response) => response.json())
            .then(({ totalPages, brandEngagements }) => {
              setEngagements(brandEngagements);
              setNumberOfPages(totalPages);
            });
          fetchEngagements()
          dispatch(clearMessage());
          // dispatch("")
        })
        .catch((error) => {
          setSaveLoading(false);
          // console.log("err :" + error.message);
          if (error.message === "Request failed with status code 400") {
            dispatch(setMessage('BrandName must be unique'))

          } else {
            dispatch(setMessage('An error occurred'))
          }

        });
    }

    setSaveLoading(false);
    // alert(JSON.stringify(values))
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
      `https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
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
  // console.log("user.notificationMessage : " + user.notificationMessage)
  const handleNotificationClose = async () => {

    try {
      // Make a POST request to update the notificationMessage in the backend using Axios
      // Replace 'YOUR_UPDATE_NOTIFICATION_ENDPOINT' with your actual endpoint
      await axios.put(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/update-notification-message/${user._id}`, {
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
        `https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/users/${user?._id}`
      )
      .then((res) => {
        dispatch(setUserData(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [isOpen, setIsOpen] = useState(true);

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
      await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/templates?userId=${user?._id}`).then((res) => {
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


  //Get target audiences
  const [targetAudiences, setTargetAudiences] = useState([])
  const getTargetAudiences = async () => {
    try {
      await axios.post(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/generate-ta-options`, {
        companySector: values.companySector
      }).then((res) => {
        setTargetAudiences(res.data.targetAudiences)
        console.log('targetAudiences :' + res.data.targetAudiences)
      })

    } catch (error) {
      console.log('error :' + error)
    }
  }

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

      await axios.put(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/users/disable-first-login/${user?._id}`);

    } catch (error) {
      console.log(error)
    }
  }



  const [selectedDays, setSelectedDays] = useState(["Mon", "Wed", "Fri"]);



  useEffect(() => {
    console.log("Selected Days:", selectedDays);
  }, [selectedDays]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
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
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 text-pink-500 text-center  bg-white py-1 px-[5px] mb-[1px] rounded-full" />
                  <span className="hover:font-bold"> Add Brands</span>
                </button>
              </div>

              {/* <Dialog.Root>
                <Dialog.Trigger>
                  <Button>Edit profile</Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                  <Dialog.Title>Edit profile</Dialog.Title>
                  <Dialog.Description size="2" mb="4">
                    Make changes to your profile.
                  </Dialog.Description>

                  <Flex direction="column" gap="3">
                    <label>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Name
                      </Text>
                      <TextField.Input
                        defaultValue="Freja Johnsen"
                        placeholder="Enter your full name"
                      />
                    </label>
                    <label>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Email
                      </Text>
                      <TextField.Input
                        defaultValue="freja@example.com"
                        placeholder="Enter your email"
                      />
                    </label>
                  </Flex>

                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Button variant="soft" color="gray">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button>Save</Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root> */}
              <div className="my-4 sm:mb-8 flex flex-col">  {/* Increased the bottom margin to mb-8 */}
                {user.notificationMessage !== 'none' &&
                  <PaymentSuccessMessage
                    onClose={handleNotificationClose}
                    text={(user.notificationMessage === 'payment_failed') ? 'Payment Failed!' : user.notificationMessage === 'payment_succeeded' ? "Payment succeeded" : ""} />
                }                <p className="text-slate-800">
                  Welcome to <span className='text-pink-600 font-medium'>Get Sweet’s brand engagement builder</span>, your home for building your voice as a company and will empower your input to be transformed into actual posts for your social media platforms.
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
              <div className={isVisible ? "" : "hidden"}>

                {/*Brand Engagement Card Form*/}
                {user?.availableTokens === 0 ? (
                  <a
                    className="flex justify-center items-center md:text-xl p-3 text-red-600 my-4"
                    href="/payment"
                  >
                    No tokens remaining. Purchase more to continue.
                  </a>
                ) : (
                  <div id="Brand_Form" className="flex flex-wrap bg-blue-50 md:p-4 rounded-lg sm:mb-12">
                    <div className="w-full ">
                      {/* Form goes here */}
                      <form className="rounded px-4" onSubmit={handlePreview}>
                        <div className="  flex-col rounded-md  flex flex-wrap">
                          <label htmlFor="select3" className="block pl-2  mb-2">
                            Post type
                          </label>
                          <div className="w-full flex flex-wrap">
                            <RadioButton
                              id="TextImagePost"
                              value="TextImagePost"
                              checked={selectedPostType === 'TextImagePost'}
                              onChange={handlePostTypeChange}
                              label="Text-Image Posts"
                              img={image}
                            />

                            <RadioButton
                              id="TextVideoPost"
                              value="TextVideoPost"
                              checked={selectedPostType === 'TextVideoPost'}
                              onChange={handlePostTypeChange}
                              label="Text-Video Posts"
                              img={video}
                            />
                            <RadioButton
                              type="radio"
                              id="Both"
                              value="Both"
                              checked={selectedPostType === 'Both'}
                              onChange={handlePostTypeChange}
                              label="Mixed Media Posts"
                              img={image}
                              imgTwo={video}

                            />
                          </div>


                        </div>


                        <div className="flex flex-wrap">
                          <div className="w-full md:w-1/2 p-2">
                            <label htmlFor="input1" className="block mb-1">
                              Brand Name
                            </label>
                            <input
                              id="input1"
                              className="w-full border-gray-300 rounded p-2"
                              type="text"
                              name="brandName"
                              placeholder="Brand Name"
                              value={values.brandName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="w-full md:w-1/2 p-2">
                            <label htmlFor="select3" className="block mb-1">
                              Brand Tone
                            </label>
                            <Select
                              id="select3"
                              className="w-full"
                              placeholder="Brand Tone"
                              name="brandTone"
                              value={values.brandTone}
                              onChange={(selectedOption) =>
                                handleSelectChange("brandTone", selectedOption)
                              }
                              options={brandTones}
                            />
                          </div>
                          <div className="w-full  p-2">
                            <label htmlFor="select2" className="block mb-1">
                              Brand Description
                            </label>
                            {/* Brand Description Text Box */}
                            <textarea
                              // id="input1"
                              className="w-full border-gray-300 rounded p-2"
                              type="text"
                              rows={2}
                              name="companySector"
                              placeholder="Enter your brand description "
                              value={values.companySector}
                              onChange={handleTargetAudienceInputChange}
                            />

                          </div>
                          {/* {targetAudiences.length > 0 && <div className="w-full  p-2">
                            <label htmlFor="select1" className="block mb-1">
                              Target Audience -<span className="text-blue-300 text-sm"> Generated with ai</span>
                            </label>
                            <Select
                              className="w-full"
                              placeholder="choose your Target Audience"
                              value={values.targetAudience}
                              onChange={(selectedOption) =>
                                handleSelectChange("targetAudience", selectedOption)
                              }
                              options={targetAudiences && JSON.parse(targetAudiences)}
                            />
                          </div>} */}

                          <div className="w-full md:w-1/2 p-2">
                            <label htmlFor="input2" className="block mb-1">
                              Web or Social URL <span className="text-gray-500 text-sm">Optional</span>
                            </label>
                            <input
                              id="input2"
                              className="w-full border-gray-300 rounded p-2"
                              type="text"
                              name="websiteUrl"
                              placeholder="Website URL"
                              value={values.websiteUrl}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="w-full md:w-1/2 p-2">
                            <label htmlFor="select1" className="block mb-1">
                              Time Zone
                            </label>
                            <Select
                              id="timeZone"
                              className="w-full"
                              // name="timeZone"
                              placeholder="Time Zone"
                              value={values.timeZone}
                              onChange={(selectedOption) =>
                                handleSelectChange("timeZone", selectedOption)
                              }
                              options={timeZoneOptions}
                            />
                          </div>
                          <div className="w-full p-2 mb-1">
                            <label htmlFor="select1" className="block mb-1">
                              Posts language
                            </label>
                            <Select
                              id="language"
                              className="w-full"
                              // name="timeZone"
                              placeholder="Language of the posts"
                              value={values.language}
                              onChange={(selectedOption) =>
                                handleSelectChange("language", selectedOption)
                              }
                              options={languageOptions}
                            />
                          </div>
                          <div className="  flex-col w-full  rounded-md  flex flex-wrap">
                            <label htmlFor="select3" className="block pl-2">
                              Schedule
                            </label>
                            <DayPicker selectedDays={selectedDays} setSelectedDays={setSelectedDays} />


                          </div>

                          <div className="w-full   p-2">
                            {selectedOption === 'HasEndDate' && (
                              <div className="flex md:flex-row flex-col md:space-x-2">
                                <div className="md:w-1/2 w-full">
                                  <label className="block text-md  ">
                                    Start Date
                                  </label>
                                  <input
                                    type="date"
                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                                    value={startDate} // Bind the input value to endDate state
                                    onChange={handleStartDateChange} // Update the endDate state
                                  />
                                </div>
                                <div className="md:w-1/2 w-full">
                                  <label className="block text-md  ">
                                    End Date
                                  </label>
                                  <input
                                    type="date"
                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                                    value={endDate} // Bind the input value to endDate state
                                    onChange={handleEndDateChange} // Update the endDate state
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className=" mt-2 flex w-full justify-center items-center p-2">
                            <label className={`mr-4 ${selectedOption === 'RunForEver' ? 'text-[#3b82f6]' : 'text-gray-700'}`}>
                              <span className="mr-2 text-md  font-medium">Run forever</span>
                            </label>

                            <SwitchButton enabled={enabled} setEnabled={setEnabled} />

                            <label className={`ml-4 ${selectedOption === 'HasEndDate' ? 'text-[#3b82f6]' : 'text-gray-700'}`}>
                              <span className="ml-2 text-md  font-medium">Set Date Range</span>
                            </label>
                          </div>



                          <div className="flex w-full justify-center items-center">
                            <p className="text-red-500 text-sm my-2  text-center">
                              {message ? message : ""}
                            </p>
                          </div>

                          {previewLoading ? <div className="flex flex-col w-full p-2"> <Line percent={previewProgress} strokeWidth={1} strokeColor="#f60c9c" /> <p className="text-center text-blue-600 mt-3 font-semibold">
                            {progressMessage} <span className="text-gray-500"> </span>
                            <span className="text-pink-500 font-bold">{previewProgress}%</span>
                          </p>
                            {/* Display the message */}</div> : <div className="md:flex w-full p-2">
                            <button
                              type="reset"
                              onClick={handleReset}
                              className="md:w-[40%] w-full bg-blue-500 hover:font-bold  text-white rounded p-2"
                            >
                              <span className="mr-2">Reset form</span>   <FontAwesomeIcon icon={faRefresh} color="white" size={24} />
                            </button>
                            <button
                              disabled={previewLoading}
                              type={!previewLoading ? "submit" : "button"}
                              className={`${previewLoading ? "cursor-not-allowed" : ""} md:w-[80%] flex justify-center items-center w-full
                               bg-pink-500 text-white rounded hover:font-bold  
                                p-2 mt-2 md:mt-0 md:ml-2`}
                            >

                              <span className="mr-2"> Preview
                              </span>    <FontAwesomeIcon icon={faEye} color="white" size={24} />
                            </button>
                          </div>}
                          {(result && !previewLoading) ?

                            <div className="w-full px-2">
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
                                )}  <FontAwesomeIcon className="ml-2" icon={faSave} color="white" size={24} />
                              </button>
                            </div>
                            :
                            <></>

                          }
                        </div>

                      </form>
                    </div>
                    {result && <div className="w-full flex-col mt-2 md:mx-4  text-white md:px-4  bg-[#333333] rounded-lg p-4">
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
                          <pre className="whitespace-pre-wrap font-medium">
                            {result !== null ? ReactHtmlParser(result) : "Results will be added here."}

                          </pre>
                        )}
                      </div>
                    </div>}
                  </div>
                )}
              </div>
              {/* Element that will be shown/hidden */}
            </div>
            {/*End Brand Engagement Card Form*/}

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

                        endDate={item?.endDate}
                        setEndDate={setEndDate}
                        setSelectedOption={setSelectedOption}
                        lifeCycleStatus={item?.lifeCycleStatus}
                        setEnabled={setEnabled}
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

        < ToastContainer
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