import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Skeleton } from '@radix-ui/themes';

export default function PostBadge({ icon, number, label, bgColor, iconColor }) {
    return (
        <div className='rounded-sm flex md:flex-row flex-col  shadow-sm px-4 py-4 bg-white w-full'>
            <div className={`w-12 h-12 ml-1 ${bgColor ? `bg-${bgColor}` : 'bg-green-500'} flex justify-center items-center rounded-md`}>
                <FontAwesomeIcon
                    className={`text-${iconColor}`}
                    icon={icon}
                />
            </div>
            <div className='pl-2'>
                <p className='text-xl md:my-0 my-1  font-semibold text-start -mb-1'>{number ? number : <>
                    <Skeleton style={{ height: 20, marginBottom: 5 }} /></>}</p>
                <p className='md:text-sm text-xs'>{label}</p>
            </div>
        </div>
    )
}
