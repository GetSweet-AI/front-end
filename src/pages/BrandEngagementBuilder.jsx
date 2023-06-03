import React, { useEffect, useState } from "react";
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
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { targetAudienceOptions } from "../constants/objects";
import brandTones from "../constants/brandTones";
import postTypeOptions from "../constants/postTypeOtions";
import { clearMessage, setMessage } from "../redux/message";

function BrandEngagementBuilder() {


  const dispatch = useDispatch()

  const [previewLoading, setPreviewLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const { token } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const [values, setValues] = useState({
    brandName: "",
    websiteUrl: "",
    timeZone: null,
    companySector: null,
    brandTone: null,
    targetAudience: null,
    postType: ""
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
    CompanySector: values.companySector?.value,
    BrandTone: values.brandTone?.value,
    TargetAudience: values.targetAudience?.value,
    PostType: values.postType?.value,
    postContent: result,
    WebSite: values.websiteUrl,
    BrandName: values.brandName
  };

  const handlePreview = (e) => {
    e.preventDefault();
    const { brandName, brandTone, postType, timeZone, targetAudience, companySector, websiteUrl } = values
    if (!brandTone | !postType | !targetAudience | !websiteUrl) {
      dispatch(setMessage("Please provide all values "))
    } else {
      setResult(null);
      setPreviewLoading(true);
      axios
        .post(
          "https://seashell-app-8amlb.ondigitalocean.app/api/v1/generate-blog-post",
          {
            targetAudience: values.targetAudience,
            platform: values.websiteUrl,
            question: values.postType?.value,
            tone: values.brandTone?.value,
          }
        )
        .then((res) => {
          console.log(res.data);
          setPreviewLoading(false);
          setResult(res.data.postContent);
          console.log("res.data.postContent :" + res.data.postContent)
        })
        .catch((err) => {
          console.log(err);
          setPreviewLoading(false);
          dispatch(err)
        });
    }

    // alert(JSON.stringify(postData))

  };


  // const postData = {
  //   Timezone: 'UTC+3 Test',
  //   CompanySector: 'E-commerce and Online Retail',
  //   BrandTone: 'Friendly',
  //   TargetAudience: 'Young professionals',
  //   PostType: 'Quotes',
  //   postContent: '<h1>Attention Young Professionals!</h1><p>Are you feeling stuck in your career? Remember, success is not final, failure is not fatal: it is the courage to continue that counts.</p><p>Don'
  // };

  const handleSave = async () => {
    setSaveLoading(true);
    await axios
      .post(
        "https://seashell-app-8amlb.ondigitalocean.app/api/v1/save-brand-engagement",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        setSaveLoading(false);
        console.log(res.data);
        fetchEngagements();
        handleReset()
      })
      .catch((err) => {
        setSaveLoading(false);
        console.log(err);
        dispatch(setMessage(err.data))
      });
  };

  const handleReset = () => {
    setValues({
      brandName: "",
      websiteUrl: "",
      timeZone: null,
      companySector: null,
      brandTone: null,
      targetAudience: null,
    });
    setResult(null);
  };

  const fetchEngagements = () => {
    axios
      .get(
        "https://seashell-app-8amlb.ondigitalocean.app/api/v1/brand-engagements",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setEngagements(res.data.brandManagements);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    fetchEngagements();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(clearMessage())
  }, [])

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
            <div className=" mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                  Brand Engagement Builder
                </h1>
              </div>
              <div className="my-4 sm:mb-0">
                <p className="text-slate-800">
                  Engagement Builder is a powerful product designed to help you
                  elevate your brand's social media presence. With Engagement
                  Builder, you'll be able to easily define your brand voice and
                  ensure that all of your soaical content aligns with your
                  brand's messaging and value.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap bg-white p-4 rounded-lg">
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
                      <label htmlFor="input2" className="block mb-1">
                        Website URL
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

                          { value: "UTC (Coordinated Universal Time)", label: "UTC (Coordinated Universal Time)" },
                          { value: "BST (British Summer Time)", label: "BST (British Summer Time)" },
                          { value: "JST (Japan Standard Time)", label: "JST (Japan Standard Time)" },
                          { value: "IST (Indian Standard Time)", label: "IST (Indian Standard Time)" },
                          { value: "PST (Pacific Standard Time)", label: "PST (Pacific Standard Time)" },
                          { value: "MST (Mountain Standard Time)", label: "MST (Mountain Standard Time)" },
                          { value: "CST (Central Standard Time)", label: "CST (Central Standard Time)" },
                          { value: "EST (Eastern Standard Time)", label: "EST (Eastern Standard Time)" },
                          { value: "GMT (Greenwich Mean Time)", label: "GMT (Greenwich Mean Time)" },
                        ]}
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                      <label htmlFor="select2" className="block mb-1">
                        Company Sector
                      </label>
                      <Select
                        id="select2"
                        className="w-full"
                        name="companySector"
                        placeholder="Company Sector"
                        value={values.companySector}
                        onChange={(selectedOption) =>
                          handleSelectChange("companySector", selectedOption)
                        }
                        options={[
                          {
                            value: "E-commerce and Online Retail",
                            label: "E-commerce and Online Retail",
                          },
                          {
                            value: "Health and Wellness",
                            label: "Health and Wellness",
                          },
                          {
                            value: "Technology and Software Development",
                            label: "Technology and Software Development",
                          },
                          {
                            value: "Digital Marketing and Social Media",
                            label: "Digital Marketing and Social Media",
                          },
                          {
                            value: "Food and Beverage",
                            label: "Food and Beverage",
                          },
                          {
                            value: "Social Enterprise and Impact Investing",
                            label: "Social Enterprise and Impact Investing",
                          },
                        ]}
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
                    <div className="w-full md:w-1/2 p-2">
                      <label className="block mb-1">
                        Post type
                      </label>
                      <Select
                        id="select3"
                        className="w-full"
                        placeholder="Post Type"
                        value={values.postType}
                        onChange={(selectedOption) =>
                          handleSelectChange("postType", selectedOption)
                        }
                        options={postTypeOptions}
                      />
                    </div>
                    <div className="w-full p-2">
                      <label htmlFor="select4" className="block mb-1">
                        Target Audience
                      </label>
                      <Select
                        id="select4"
                        className="w-full"
                        name="targetAudience"
                        placeholder="Target Audience"
                        value={values.targetAudience}
                        onChange={(selectedOption) =>
                          handleSelectChange("targetAudience", selectedOption)
                        }
                        options={targetAudienceOptions}
                      />
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
                        className="md:w-[20%] w-full bg-[#60696d] text-white rounded p-2"
                      >
                        Reset form
                      </button>
                      <button
                        type={!previewLoading ? "submit" : "button"}
                        className="md:w-[80%] flex justify-center items-center w-full bg-blue-500 text-white rounded p-2 mt-2 md:mt-0 md:ml-2"
                      >
                        {previewLoading ? (
                          <>
                            <img className="mr-2" width={20} src={rolling} />
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
                              <img className="mr-2" width={20} src={rolling} />
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
              <div className="w-full text-white md:w-1/2 bg-[#333333] rounded-lg p-4">
                {result !== null
                  ? ReactHtmlParser(result)
                  : "Results will be added here."}
              </div>
            </div>

            {engagements.length > 0 && (
              <>
                <h5 className="text-2xl font-bold mt-16 mb-6">
                  Your saved brand engagements
                </h5>
                <div className="grid grid-cols-12 gap-6">
                  {engagements.map((item) => {
                    return (
                      <BrandEngagementCard
                        key={item._id}
                        id={item._id}
                        brandName={item?.BrandName}
                        website={item.WebSite}
                        timeZone={item.Timezone}
                        companySector={item.CompanySector}
                        brandTone={item.BrandTone}
                        targetAudience={item.TargetAudience}
                        postType={item.PostType}
                        fetchEngagements={fetchEngagements}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default BrandEngagementBuilder;
