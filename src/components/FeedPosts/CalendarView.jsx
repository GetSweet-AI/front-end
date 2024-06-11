import React, { useState, Fragment } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling
import { Dialog, Transition } from '@headlessui/react';
import Carousel from './FeedPostCarousel';

const transformFeedPosts = (feedPosts) => {
    const datesToColorize = {};
    feedPosts.forEach(post => {
        const dateObj = new Date(post.Date);
        dateObj.setDate(dateObj.getDate() - 1);
        const dateString = dateObj.toISOString().split('T')[0];

        if (datesToColorize[dateString]) {
            datesToColorize[dateString].count += 1;
            datesToColorize[dateString].posts.push(post);
        } else {
            datesToColorize[dateString] = {
                color: 'blue',
                count: 1,
                posts: [post]
            };
        }
    });
    return datesToColorize;
};

const CalendarView = ({ feedPosts }) => {
    const [datesToColorize, setDatesToColorize] = useState(transformFeedPosts(feedPosts));
    const [selectedDatePosts, setSelectedDatePosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateClick = (date) => {
        const dateString = date.toISOString().split('T')[0];
        if (datesToColorize[dateString] && datesToColorize[dateString].posts) {
            setSelectedDatePosts(datesToColorize[dateString].posts);
            setIsModalOpen(true);
        } else {
            setSelectedDatePosts([]);
            setIsModalOpen(false);
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            if (datesToColorize[dateString]) {
                return `highlight-${datesToColorize[dateString].color}`;
            }
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            if (datesToColorize[dateString] && datesToColorize[dateString].count) {
                return <div className="custom-count">{datesToColorize[dateString].count}</div>;
            }
        }
    };

    const renderMedia = (mediaUrl) => {
        if (mediaUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
            return <img src={mediaUrl} alt="Media" className="w-full object-cover h-[50vh] rounded-md" />;
        } else if (mediaUrl.match(/\.(mp4|webm)$/)) {
            return <video src={mediaUrl} controls className="w-full object-cover h-[50vh] rounded-md" />;
        } else {
            return <p>Unsupported media format</p>;
        }
    };

    // console.log(selectedDatePosts)
    const testCarouselArray = [
        {
            "Accounts": "Hicham's Agency",
            "BrandEngagementID": "65c8e30f11aca36eb817197d",
            "Caption": "🔥 Elevate your digital marketing strategies with cutting-edge AI SaaS solutions at Hicham's Agency! Let's revolutionize the way you work! 💡✨ Share your success stories with AI SaaS! 🚀💻 #DigitalMarketing #AI #SaaS #Innovation",
            "Date": "2024-06-13",
            "HadFinalCheck": false,
            "IsDeleted": false,
            "MediaUrl": "https://pcore-customer-media.s3.amazonaws.com/a75261f8-db77-4a34-996e-f8b48975ee7d/a3f29dc1-fa31-49d8-bf75-68426fa5bc9e.mp4",
            "ShouldDelete": false,
            "archived": false,
            "cloudTitle": "Digital Marketers_Hicham's Agency_friendly_66212157671",
            "createdBy": "64f75eb864262740d87c7e89",
            "scheduled": false,
            "toBeArchived": false,
            "toBeRevised": false,
            "toBeScheduled": false,
            "unixTimestamp": "1718313702000",
            "__v": 0,
            "_id": "666229f20837491e3a6eb8a1"
        },
        {
            "Accounts": "Hicham's Agency",
            "BrandEngagementID": "75d8f40g21bda47fc928207e",
            "Caption": "🌟 Unleash the power of AI-driven marketing with Hicham's Agency! Transform your business with our innovative SaaS solutions! 🚀📈 Let's achieve greatness together! 💪🤖 #AI #SaaS #Marketing #Innovation",
            "Date": "2024-07-15",
            "HadFinalCheck": false,
            "IsDeleted": false,
            "MediaUrl": "https://pcore-customer-media.s3.amazonaws.com/a75261f8-db77-4a34-996e-f8b48975ee7d/a3f29dc1-fa31-49d8-bf75-68426fa5bc9e.mp4",
            "ShouldDelete": false,
            "archived": false,
            "cloudTitle": "AI Marketers_Hicham's Agency_innovative_77223268782",
            "createdBy": "64g86fc975373841d98e8f90",
            "scheduled": false,
            "toBeArchived": false,
            "toBeRevised": false,
            "toBeScheduled": false,
            "unixTimestamp": "1729414802000",
            "__v": 0,
            "_id": "777330g31948502f4b7fc9b2"
        }
    ]


    return (
        <div className='p-2 flex flex-col items-center'>
            <Calendar
                tileClassName={tileClassName}
                tileContent={tileContent}
                onClickDay={handleDateClick}
            />
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <h2 className="text-xl font-bold mb-2">Feed Post Details</h2>

                                    <div className="p-2">
                                        <Carousel renderMedia={renderMedia} testCarouselArray={selectedDatePosts} />

                                    </div>
                                    <div className="mt-3  flex justify-end">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default CalendarView;





// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // default styling

// const transformFeedPosts = (feedPosts) => {
//     const datesToColorize = {};
//     feedPosts.forEach(post => {
//         // Parse the date and subtract one day
//         const dateObj = new Date(post.Date);
//         dateObj.setDate(dateObj.getDate() - 1);
//         // Convert the adjusted date to a UTC string
//         const dateString = dateObj.toISOString().split('T')[0];

//         // If the date already exists, increment the count, otherwise set it to 1
//         if (datesToColorize[dateString]) {
//             datesToColorize[dateString].count += 1;
//         } else {
//             datesToColorize[dateString] = {
//                 color: 'blue',
//                 count: 1
//             };
//         }
//     });
//     return datesToColorize;
// };

// const CalendarView = ({ feedPosts }) => {
//     const [datesToColorize, setDatesToColorize] = useState(transformFeedPosts(feedPosts));
//     console.log(datesToColorize);

//     const tileClassName = ({ date, view }) => {
//         if (view === 'month') {
//             const dateString = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD'
//             if (datesToColorize[dateString]) {
//                 return `highlight-${datesToColorize[dateString].color}`;
//             }
//         }
//     };

//     const tileContent = ({ date, view }) => {
//         if (view === 'month') {
//             const dateString = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD'
//             if (datesToColorize[dateString] && datesToColorize[dateString].count) {
//                 return <div className="custom-count">{datesToColorize[dateString].count}</div>;
//             }
//         }
//     };

//     return (
//         <div className='p-2 flex justify-center items-center'>
//             <Calendar
//                 tileClassName={tileClassName}
//                 tileContent={tileContent}
//             />
//         </div>
//     );
// };

// export default CalendarView;
