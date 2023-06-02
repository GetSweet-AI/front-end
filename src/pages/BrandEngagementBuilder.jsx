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

function BrandEngagementBuilder() {
  const items = [
    {
      id: 0,
      category: "1",
      members: [
        {
          name: "User 01",
          image: Image01,
          link: "#0",
        },
      ],
      title: "Brand Engagement 1",
      link: "/BrandEngagement/1",
      content:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.",
      dates: {
        from: "Jan 20",
      },
      type: "draft",
    },
    {
      id: 1,
      category: "2",
      members: [
        {
          name: "User 04",
          image: Image02,
          link: "#0",
        },
      ],
      title: "Brand Engagement 2",
      link: "/BrandEngagEment/2",
      content:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.",
      dates: {
        from: "Jan 20",
        // to: 'Jan 27'
      },
      type: "published",
    },
  ];

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdhMDJjNjFhZGViYjM2OTU5YTk4ODIiLCJpYXQiOjE2ODU3MTc4NDQsImV4cCI6MTY4NTgwNDI0NH0.E3zP-kzcs2BLOsv99rhcYMhpqgrlkTPOara0Ne0Y5IA";
  const [previewLoading, setPreviewLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const [values, setValues] = useState({
    brandName: "",
    websiteUrl: "",
    timeZone: null,
    companySector: null,
    brandTone: null,
    targetAudience: null,
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

  const handlePreview = (e) => {
    e.preventDefault();
    setResult(null);
    setPreviewLoading(true);
    axios
      .post(
        "https://seashell-app-8amlb.ondigitalocean.app/api/v1/generate-blog-post",
        {
          targetAudience: values.targetAudience,
          platform: values.websiteUrl,
          question: "Inspirational quote",
          tone: values.brandTone,
        }
      )
      .then((res) => {
        console.log(res.data);
        setPreviewLoading(false);
        setResult(res.data.postContent);
      })
      .catch((err) => {
        console.log(err);
        setPreviewLoading(false);
      });
  };

  const handleSave = () => {
    setSaveLoading(true);
    axios
      .post(
        "https://seashell-app-8amlb.ondigitalocean.app/api/v1/save-brand-engagement",
        {
          targetAudience: "old professionals",
          platform: "Facebook",
          question: "Inspirational quote",
          tone: "inspiring",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSaveLoading(false);
        console.log(res.data);
        fetchEngagements();
      })
      .catch((err) => {
        setSaveLoading(false);
        console.log(err);
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
                        id="select1"
                        className="w-full"
                        placeholder="Time Zone"
                        value={values.timeZone}
                        onChange={(selectedOption) =>
                          handleSelectChange("timeZone", selectedOption)
                        }
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
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
                        placeholder="Company Sector"
                        value={values.companySector}
                        onChange={(selectedOption) =>
                          handleSelectChange("companySector", selectedOption)
                        }
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ]}
                      />
                    </div>
                    <div className="w-full p-2">
                      <label htmlFor="select3" className="block mb-1">
                        Brand Tone
                      </label>
                      <Select
                        id="select3"
                        className="w-full"
                        placeholder="Brand Tone"
                        value={values.brandTone}
                        onChange={(selectedOption) =>
                          handleSelectChange("brandTone", selectedOption)
                        }
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ]}
                      />
                    </div>
                    <div className="w-full p-2">
                      <label htmlFor="select4" className="block mb-1">
                        Target Audience
                      </label>
                      <Select
                        id="select4"
                        className="w-full"
                        placeholder="Target Audience"
                        value={values.targetAudience}
                        onChange={(selectedOption) =>
                          handleSelectChange("targetAudience", selectedOption)
                        }
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ]}
                      />
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
                        brandName="Brand Name (static)"
                        website="www.website.com/static"
                        timeZone={item.timeZone}
                        companySector={item.CompanySector}
                        brandTone={item.BrandTone}
                        targetAudience={item.TargetAudience}
                        postType={item.PostType}
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
