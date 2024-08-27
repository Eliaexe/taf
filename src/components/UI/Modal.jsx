import React from "react";

export default function Modal(props) {
    const { details, isOpen, handleOnClose } = props;

    // Close modal if clicked outside the content area
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleOnClose();
        }
    };

    // Only render the modal when it's open
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackgroundClick}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleOnClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                >
                    &times;
                </button>
                <div className="modal-content">
                    <h2 className="text-2xl font-semibold mb-6">Job Details</h2>
                    <div className="text-gray-800 leading-relaxed">
                        {details}
                    </div>
                </div>
            </div>
        </div>
    );
}
