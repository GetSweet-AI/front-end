import React, { useState } from 'react';

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DayPicker = ({ selectedDays, setSelectedDays }) => {

    const toggleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        <div className="flex justify-center items-center flex-wrap gap-3 md:p-4 p-2 bg(">
            {daysOfWeek.map((day) => (
                <button
                    key={day}
                    onClick={() => toggleDaySelection(day)}
                    className={`px-4 py-2 flex-grow rounded-md text-white font-semibold transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                    ${selectedDays.includes(day) ? 'bg-blue-600 scale-105 border border-white shadow-lg' : 'bg-blue-300 hover:bg-blue-400'}`}
                    aria-pressed={selectedDays.includes(day) ? 'true' : 'false'}
                >
                    {day}
                </button>
            ))}
        </div>
    );
};

export default DayPicker;
