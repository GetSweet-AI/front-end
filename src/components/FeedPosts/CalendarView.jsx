import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling

const transformFeedPosts = (feedPosts) => {
    const datesToColorize = {};
    feedPosts.forEach(post => {
        // Parse the date and subtract one day
        const dateObj = new Date(post.Date);
        dateObj.setDate(dateObj.getDate() - 1);
        // Convert the adjusted date to a UTC string
        const dateString = dateObj.toISOString().split('T')[0];

        // If the date already exists, increment the count, otherwise set it to 1
        if (datesToColorize[dateString]) {
            datesToColorize[dateString].count += 1;
        } else {
            datesToColorize[dateString] = {
                color: 'blue',
                count: 1
            };
        }
    });
    return datesToColorize;
};

const CalendarView = ({ feedPosts }) => {
    const [datesToColorize, setDatesToColorize] = useState(transformFeedPosts(feedPosts));
    console.log(datesToColorize);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD'
            if (datesToColorize[dateString]) {
                return `highlight-${datesToColorize[dateString].color}`;
            }
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD'
            if (datesToColorize[dateString] && datesToColorize[dateString].count) {
                return <div className="custom-count">{datesToColorize[dateString].count}</div>;
            }
        }
    };

    return (
        <div className='p-2 flex justify-center items-center'>
            <Calendar
                tileClassName={tileClassName}
                tileContent={tileContent}
            />
        </div>
    );
};

export default CalendarView;
