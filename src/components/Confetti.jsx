import React, { useState, useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Set a timeout to hide the confetti after a certain duration
        const duration = 5000; // Duration in milliseconds (adjust as needed)
        const timeout = setTimeout(() => {
            setShowConfetti(false);
        }, duration);

        // Clean up the timeout on component unmount or if duration changes
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                />
            )}
        </>
    );
}

export default ConfettiComponent;
