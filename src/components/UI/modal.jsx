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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={handleBackgroundClick}
        >
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleOnClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>
                <div className="modal-content">
                    <h2 className="text-xl font-semibold mb-4">Job Details</h2>
                    <p>{details}</p>
                </div>
            </div>
        </div>
    );
}
