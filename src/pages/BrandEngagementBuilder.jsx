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
import DashboardHeader from "../partials/DashboardHeader";
import Select from "react-select";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { targetAudienceOptions } from "../constants/objects";
import brandTones from "../constants/brandTones";
import postTypeOptions from "../constants/postTypeOtions";
import { clearMessage, setMessage } from "../redux/message";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserData } from "../redux/auth";
import PaymentSuccessMessage from "../partials/PaymentSuccessMessage ";
import Onboarding from "../components/OnBoarding/Onboarding";
import SwitchButton from "../partials/SwitchButton";

function BrandEngagementBuilder() {
  const dispatch = useDispatch();

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const [previewLoading, setPreviewLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // State to track visibility
  const [isVisible, setIsVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState('RunForEver');

  const [endDate, setEndDate] = useState(''); // Initialize endDate state


  console.log("User :" + JSON.stringify(user))


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
    timeZone: null,
    companySector: null,
    brandTone: null,
    targetAudience: null,
    postType: "",
    other: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const postData = {
    Timezone: values.timeZone?.value,
    CompanySector: values.companySector,
    BrandTone: values.brandTone?.value,
    TargetAudience: values.targetAudience?.value,
    PostType: values.postType?.value,
    postContent: result,
    WebSite: values.websiteUrl,
    BrandName: values.brandName,
    endDate: endDate,
    lifeCycleStatus: selectedOption
  };

  const handlePreview = async (e) => {
    setResult("");
    e.preventDefault();
    const { brandName, brandTone, companySector, websiteUrl, timeZone } =
      values;
    if (!brandTone) {
      dispatch(setMessage("Please provide the brand tone"));
    } else if (!companySector) {
      dispatch(setMessage("Please provide the company sector"));
    } else if (!brandName) {
      dispatch(setMessage("Please provide the brand name"));
    } else if (!timeZone) {
      dispatch(setMessage("Please provide the time zone"));
    } else {
      setResult(null);
      setPreviewLoading(true);
      await axios
        .post(
          "http://localhost:5000/api/v1/generate-blog-post",
          {
            tone: values.brandTone?.value,
            brandName: values.brandName,
            CompanySector: values.companySector,
          }
        )
        .then((res) => {
          // console.log(res.data);
          setPreviewLoading(false);
          setResult(res.data.postContent);
          // console.log("res.data.postContent :" + res.data.postContent)
        })
        .catch((err) => {
          // console.log(err);
          setPreviewLoading(false);
        });
    }

    // alert(JSON.stringify(postData))
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
          `http://localhost:5000/api/v1/save-brand-engagement/${user?._id}`,
          postData
        )
        .then((res) => {
          getUserData();
          handleReset();
          setSaveLoading(false);
          // console.log(res.data);
          fetch(
            `http://localhost:5000/api/v1/brand-engagements/${user?._id}?page=${pageNumber}`
          )
            .then((response) => response.json())
            .then(({ totalPages, brandEngagements }) => {
              setEngagements(brandEngagements);
              setNumberOfPages(totalPages);
            });

          dispatch(clearMessage());
          // dispatch("")
        })
        .catch((err) => {
          setSaveLoading(false);
          console.log(err);
          // dispatch(setMessage(err.data))
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
      targetAudience: null,
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
  console.log("user.notificationMessage : " + user.notificationMessage)
  const handleNotificationClose = async () => {

    // if (user.notificationMessage === 'payment_succeeded') {
    //   // Display a success toast message
    //   toast.success("Payment succeeded");
    //   // Reset the notificationMessage to 'none' in the frontend
    // } else {
    //   if (user.notificationMessage === 'payment_failed') {
    //     // Display a success toast message

    //     setTimeout(() => {
    //       toast.success("Payment Failed!");
    //     }, 3000);

    //   }
    // }
    try {
      // Make a POST request to update the notificationMessage in the backend using Axios
      // Replace 'YOUR_UPDATE_NOTIFICATION_ENDPOINT' with your actual endpoint
      await axios.put(`http://localhost:5000/api/v1/auth/update-notification-message/${user._id}`, {
        notificationMessage: 'none',
      }).then((res) => {
        fetchUserData()
      })
    } catch (error) {
      console.error('Error updating notificationMessage:', error);
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

  // const realEstateValues = {
  //   brandName: "Real Estate Brand",
  //   websiteUrl: "https://realestatewebsite.com",
  //   timeZone: { value: "UTC (Coordinated Universal Time)", label: "UTC (Coordinated Universal Time)" },
  //   companySector: "A real estate company is a business that buys, sells, or manages properties, such as homes, commercial buildings",
  //   brandTone: { value: "professional", label: "Professional" },
  //   targetAudience: "Homebuyers",
  //   postType: "News",
  //   other: "Other information for Real Estate",
  // };


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
    setEndDate(endDateValue)
    setSelectedOption(template.lifeCycleStatus)
    template.lifeCycleStatus === "HasEndDate" ? setEnabled(true) : ""

  };


  console.log("values :" + JSON.stringify(values))

  // const handleCloneClick = (brandEngagementData) => {
  //   setValues({
  //     brandName: brandEngagementData.brandName,
  //     websiteUrl: brandEngagementData.websiteUrl,
  //     timeZone: brandEngagementData.timeZone,
  //     companySector: brandEngagementData.companySector,
  //     brandTone: brandEngagementData.brandTone,
  //     targetAudience: brandEngagementData.targetAudience,
  //     postType: brandEngagementData.postType,
  //   });

  //   setSelectedOption(brandEngagementData.lifeCycleStatus)

  //   setEndDate(brandEngagementData.lifeCycleStatus === "HasEndDate" ? brandEngagementData.endDate : "")
  //   // Additional code to handle cloning logic if needed
  // };



  //Get template + add delete icon
  const [templates, setTemplates] = useState([])
  const getTemplates = async () => {
    try {
      await axios.get(`http://localhost:5000/api/v1/admin/templates?userId=${user?._id}`).then((res) => {
        setTemplates(res.data.templates)
      })

    } catch (error) {

    }
  }

  useEffect(() => {
    getTemplates()
  }, [])


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };


  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (enabled) {
      //Show endDate field
      setSelectedOption("HasEndDate")
    } else {
      setSelectedOption("RunForEver")
      setEndDate("")
    }
  }, [enabled])




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
        />

        <main>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="md mb-8">
              {/* Left: Title */}
              <div className="mb-4 flex md:justify-between md:flex-row flex-col sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold flex justify-between items-center">
                  Brand Engagement Builder
                </h1>
                <button
                  className="px-2 md:py-1 py-2 bg-purple-500 md:mt-0 mt-2  text-center text-white rounded text-sm flex items-center font-normal"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  Add brand voice
                </button>
              </div>

              <div className="my-4 sm:mb-8 flex flex-col">  {/* Increased the bottom margin to mb-8 */}
                {user.notificationMessage !== 'none' &&
                  <PaymentSuccessMessage
                    onClose={handleNotificationClose}
                    text={(user.notificationMessage === 'payment_failed') ? 'Payment Failed!' : user.notificationMessage === 'payment_succeeded' ? "Payment succeeded" : ""} />
                }                <p className="text-slate-800">
                  Engagement Builder is a powerful product designed to help you
                  elevate your brand's social media presence. With Engagement
                  Builder, you'll be able to easily define your brand voice and
                  ensure that all of your social content aligns with your
                  brand's messaging and value.
                </p>
                {
                  isVisible &&
                  <>
                    <h1 className="text-md md:text-xl mt-3 text-gray-500 font-bold flex justify-between items-center">
                      Start from template
                    </h1>


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
                  <div id="Brand_Form" className="flex flex-wrap bg-white md:p-4 rounded-lg sm:mb-12">
                    <div className="w-full md:w-1/2">
                      <form className="rounded px-4" onSubmit={handlePreview}>


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
                              maxLength={90}
                              name="companySector"
                              placeholder="Enter your brand description "
                              value={values.companySector}
                              onChange={handleInputChange}
                            />

                          </div>

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
                              options={[
                                {
                                  value: "UTC (Coordinated Universal Time)",
                                  label: "UTC (Coordinated Universal Time)",
                                },
                                {
                                  value: "BST (British Summer Time)",
                                  label: "BST (British Summer Time)",
                                },
                                {
                                  value: "JST (Japan Standard Time)",
                                  label: "JST (Japan Standard Time)",
                                },
                                {
                                  value: "IST (Indian Standard Time)",
                                  label: "IST (Indian Standard Time)",
                                },
                                {
                                  value: "PST (Pacific Standard Time)",
                                  label: "PST (Pacific Standard Time)",
                                },
                                {
                                  value: "MST (Mountain Standard Time)",
                                  label: "MST (Mountain Standard Time)",
                                },
                                {
                                  value: "CST (Central Standard Time)",
                                  label: "CST (Central Standard Time)",
                                },
                                {
                                  value: "EST (Eastern Standard Time)",
                                  label: "EST (Eastern Standard Time)",
                                },
                                {
                                  value: "GMT (Greenwich Mean Time)",
                                  label: "GMT (Greenwich Mean Time)",
                                },
                              ]}
                            />
                          </div>


                          <div className=" mt-2 flex w-full justify-center items-center p-2">
                            <label className={`mr-4 ${selectedOption === 'RunForEver' ? 'text-[#3b82f6]' : 'text-gray-700'}`}>
                              <span className="mr-2 text-md  font-medium">Run forever</span>
                            </label>

                            <SwitchButton enabled={enabled} setEnabled={setEnabled} />

                            <label className={`ml-4 ${selectedOption === 'HasEndDate' ? 'text-[#3b82f6]' : 'text-gray-700'}`}>
                              <span className="ml-2 text-md  font-medium">Add end date</span>
                            </label>
                          </div>

                          <div className="w-full my-2  p-2">
                            {selectedOption === 'HasEndDate' && (
                              <div>
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
                            )}
                          </div>

                          <div className="flex w-full justify-center items-center">
                            <p className="text-red-500 text-sm my-2  text-center">
                              {message ? message : ""}
                            </p>
                          </div>
                          <div className="md:flex w-full p-2">
                            <button
                              type="reset"
                              onClick={handleReset}
                              className="md:w-[40%] w-full bg-[#60696d] text-white rounded p-2"
                            >
                              Reset form
                            </button>
                            <button
                              type={!previewLoading ? "submit" : "button"}
                              className="md:w-[80%] flex justify-center items-center w-full bg-purple-500 text-white rounded p-2 mt-2 md:mt-0 md:ml-2"
                            >
                              {previewLoading ? (
                                <>
                                  <img
                                    className="mr-2"
                                    width={20}
                                    src={rolling}
                                  />
                                  Generating...
                                </>
                              ) : (
                                "Preview"
                              )}
                            </button>
                          </div>
                          {result !== null && (
                            <div className="w-full px-2">
                              <button
                                type="button"
                                onClick={() => {
                                  !saveLoading && handleSave();
                                }}
                                className="flex justify-center items-center w-full bg-[#33cc00] text-white rounded p-2"
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
                                  "Save"
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                      </form>
                    </div>
                    <div className="w-full flex-col  text-white md:w-1/2 bg-[#333333] rounded-lg p-4">
                      {result && (
                        <div
                          onClick={handleCopyText}
                          className=" flex justify-end text-end "
                        >
                          <p className="bg-slate-600 w-[15%] cursor-pointer text-center rounded-lg py-1 ">
                            {" "}
                            Copy
                          </p>
                        </div>
                      )}
                      <div className="ove md:space-y-3">
                        {result !== null
                          ? ReactHtmlParser(result)
                          : "Results will be added here."}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Element that will be shown/hidden */}
            </div>
            {/*End Brand Engagement Card Form*/}

            {/* Toast container */}
            <ToastContainer />

            {/* OnBoarding */}
            <Onboarding closeModal={closeModal} isOpen={isOpen} />


            {engagements?.length > 0 && (
              <div className="">
                <h5 className="md:text-2xl text-xl  mb-2 font-bold sm:mb-4">
                  Your saved brand voices
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

                    {pages.map((pageIndex) => (
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
                    ))}

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
      </div>
    </div>
  );
}

export default BrandEngagementBuilder;