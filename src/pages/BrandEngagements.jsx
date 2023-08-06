import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/SearchForm";
import FilterButton from "../components/DropdownFilter";
import BrandEngagementCard from "../partials/BrandEngagementCard";
import PaginationNumeric from "../partials/PaginationNumeric";

import Image01 from "../images/user-28-01.jpg";
import Image02 from "../images/user-28-02.jpg";
import DashboardHeader from "../partials/DashboardHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";

function BrandEngagements() {
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [engagements, setEngagements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);

  const fetchEngagements = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://seashell-app-8amlb.ondigitalocean.app/api/v1/admin/brand-engagements?userId=${user?._id}`
      )
      .then((res) => {
        setEngagements(res.data?.brandEngagements);
        console.log("brandEngagements" + JSON.stringify(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEngagements();
  }, []);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                  Brand Engagements
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                {/* <SearchForm /> */}
                {/* Filter button */}
                {/* <FilterButton align="right" /> */}
                {/* Create campaign button */}
                {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 ">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden xs:block ml-2">Create Worflow</span>
                                </button> */}
              </div>
            </div>

            {/* Cards */}
            {isLoading && (
              <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                <MutatingDots
                  height="100"
                  width="100"
                  color="#1c7aed"
                  secondaryColor="#3078fd"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
            {engagements?.length > 0 && (
              <div className="">
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
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8">{/* <PaginationNumeric /> */}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BrandEngagements;
