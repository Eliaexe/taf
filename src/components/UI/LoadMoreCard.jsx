import React from "react";

export default function LoadMoreCard({ onClick }) {
    return (
        <div
            className="flex justify-center items-center border-2 border-black bg-black h-64 sm:h-80 lg:h-96 cursor-pointer"
            onClick={onClick}
        >
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-white">
                Load More Jobs
            </p>
        </div>
    );
}
