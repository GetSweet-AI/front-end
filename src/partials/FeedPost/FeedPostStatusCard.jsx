import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheckCircle, faTimesCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { postStatus } from '../Time';

const FeedPostStatusCard = ({ unixTimestamp, isAccountConnected }) => {
    const status = postStatus(unixTimestamp, isAccountConnected);

    const getStatusStyleAndIcon = (status) => {
        switch (status) {
            case 'Post Scheduled':
                return {
                    text: 'text-blue-400',
                    bg: 'bg-blue-50',
                    icon: faClock
                };
            case 'Successfully Posted':
                return {
                    text: 'text-green-400',
                    bg: 'bg-green-50',
                    icon: faCheckCircle
                };
            case 'Skipped':
                return {
                    text: 'text-gray-400',
                    bg: 'bg-gray-100',
                    icon: faTimesCircle
                };
            default:
                return {
                    text: 'text-gray-800',
                    bg: 'bg-white',
                    icon: faExclamationCircle
                };
        }
    };

    const { text, bg, icon } = getStatusStyleAndIcon(status);

    return (
        <div className={`p-2 mr-2 ${bg} rounded-lg flex items-center space-x-2`}>
            <FontAwesomeIcon icon={icon} className={`${text}`} color={text} size="1x" />
            <span className={`${text} text-sm font-medium`}>{status}</span>
        </div>
    );
};

export default FeedPostStatusCard;
