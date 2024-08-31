import React from "react";

export default function Modal({ isOpen, details, handleOnClose }) {
    // Close modal if clicked outside the content area
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleOnClose();
        }
    };

    // Only render the modal when it's open and details are available
    if (!isOpen || !details) return null;

    const { title, company, job_offer_body, original_job_url, date_posted } = details;

    const formattedDate = new Date(date_posted).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


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
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <div className="modal-content">
                    <div className="p-4 bg-white shadow rounded mb-4">
                        <h2 className="text-2xl font-semibold">{title}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded mb-4">
                        <p className="text-lg">
                            {company?.name}
                        </p>
                    </div>
                    <div className="p-4 bg-white shadow rounded mb-4">
                        <p className="text-lg">
                            {company?.location && `${company.location} - ${formattedDate}`}
                        </p>
                    </div>
                    <div className="p-4 bg-white shadow rounded mb-6">
                        <div
                            className="text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: job_offer_body }}
                        />
                    </div>
                    {original_job_url && (
                        <a
                            href={original_job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Voir l'annonce originale
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}