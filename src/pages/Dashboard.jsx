import React, { useState } from 'react';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Sidebar from '../partials/Sidebar';
import SideBarHeader from '../partials/SideBarHeader';

function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/*  Site header */}
            {/* <Header /> */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Page content
      <main className="grow">

      </main> */}

            {/*  Site footer */}
            {/* <Footer /> */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <SideBarHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    </div></main>
            </div>
        </div>
    );
}

export default Dashboard;