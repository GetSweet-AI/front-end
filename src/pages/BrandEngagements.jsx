import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchForm from '../partials/SearchForm';
import FilterButton from '../components/DropdownFilter';
import CampaignsCard from '../partials/CampaignsCard';
import PaginationNumeric from '../partials/PaginationNumeric';

import Image01 from '../images/user-28-01.jpg';
import Image02 from '../images/user-28-02.jpg';
import DashboardHeader from '../partials/DashboardHeader';

function BrandEngagements() {

    const items = [
        {
            id: 0,
            category: '1',
            members: [
                {
                    name: 'User 01',
                    image: Image01,
                    link: '#0'
                },

            ],
            title: 'Brand Engagement 1',
            link: '/BrandEngagement/1',
            content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
            dates: {
                from: 'Jan 20'
            },
            type: 'draft'
        },
        {
            id: 1,
            category: '2',
            members: [
                {
                    name: 'User 04',
                    image: Image02,
                    link: '#0'
                },


            ],
            title: 'Brand Engagement 2',
            link: '/BrandEngagEment/2',
            content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
            dates: {
                from: 'Jan 20',
                // to: 'Jan 27'
            },
            type: 'published'
        },

    ];

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                {/*  Site header */}
                <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Page header */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Brand Engagements ✨</h1>
                            </div>

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                {/* Search form */}
                                <SearchForm />
                                {/* Filter button */}
                                <FilterButton align="right" />
                                {/* Create campaign button */}
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 ">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden xs:block ml-2">Create Worflow</span>
                                </button>
                            </div>

                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-12 gap-6">
                            {
                                items.map(item => {
                                    return (
                                        <CampaignsCard
                                            key={item.id}
                                            id={item.id}
                                            category={item.category}
                                            members={item.members}
                                            title={item.title}
                                            link={item.link}
                                            content={item.content}
                                            dates={item.dates}
                                            type={item.type}
                                        />
                                    )
                                })
                            }
                        </div>

                        {/* Pagination */}
                        <div className="mt-8">
                            <PaginationNumeric />
                        </div>

                    </div>
                </main>

            </div>

        </div>
    );
}

export default BrandEngagements;