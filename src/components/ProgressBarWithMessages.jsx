import React from "react";
import { Line } from "rc-progress"; // Assuming you're using rc-progress for the progress bar

const ProgressBarWithMessages = ({ previewProgress, progressMessage }) => {
    return (
        <div className="my-4">
            <Line percent={previewProgress} strokeWidth={1} strokeColor="#f60c9c" />
            <p className="text-center text-blue-600 mt-3 font-semibold">
                {progressMessage} <span className="text-gray-500"> </span>
                <span className="text-pink-500 font-bold">{previewProgress}%</span>
            </p>
        </div>
    );
};

export default ProgressBarWithMessages;
