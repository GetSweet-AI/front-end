import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchForm from '../partials/SearchForm';
import FilterButton from '../components/DropdownFilter';
import CampaignsCard from '../partials/CampaignsCard';
import PaginationNumeric from '../partials/PaginationNumeric';

import Image01 from '../images/user-28-01.jpg';
import Image02 from '../images/user-28-02.jpg';
import SideBarHeader from '../partials/SideBarHeader';
import { useSelector } from 'react-redux';

function BrandEngagementCard() {

    const { taskId } = useSelector((state) => state.uiSlice)

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}

                <main>

                    <SideBarHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className='flex'>

                        </div>


                    </main>
                </main>

            </div>

        </div>
    );
}

export default BrandEngagementCard;