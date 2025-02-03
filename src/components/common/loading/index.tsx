// the-movies/src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="border-4 border-t-4 border-white border-opacity-30 border-t-white rounded-full w-10 h-10 animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;