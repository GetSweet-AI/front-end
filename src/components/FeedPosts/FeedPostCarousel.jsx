import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ testCarouselArray, renderMedia }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testCarouselArray.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === testCarouselArray.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testCarouselArray.map(post => (
                    <div key={post.id} className="w-full flex-shrink-0">
                        <div className="mb-4 bg-blue-50 p-2 rounded-md">
                            {post.Caption}
                        </div>
                        <div className="mb-2">
                            {renderMedia(post.MediaUrl)}
                        </div>

                    </div>
                ))}
            </div>
            {
                testCarouselArray?.length > 1 &&
                <div className=" flex justify-between">
                    <button onClick={prevSlide} className="absolute w-10 hover:bg-blue-500 top-1/2 left-0 transform -translate-y-4/5 p-2 ml-1 bg-gray-700 text-white rounded-full">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <button onClick={nextSlide} className="absolute w-10 hover:bg-blue-500 top-1/2 right-0 transform -translate-y-4/5 p-2 mr-1 bg-gray-700 text-white rounded-full">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button></div>
            }
        </div>
    );
};

export default Carousel;
