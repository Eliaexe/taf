import React from "react";

export default function Card(props) {
    const { job, onModalClick } = props;

    // Function to limit the text displayed
    const job_offer = (text) => {
        const wordLimit = 20;
        const charLimit = 100;
        const words = text.split(" ");

        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }

        if (text.length > charLimit) {
            return text.slice(0, charLimit) + "...";
        }

        return text;
    };

    return (
        <button
            onClick={() => onModalClick(job)}
            key={job.original_site_id}
            className="group relative block text-left h-64 sm:h-80 lg:h-96"
        >
            <div className="relative flex h-full items-end border-2 border-black bg-white">
                <div className="p-4 !pt-0 sm:p-6 lg:p-8">
                    <h2 className="mt-4 text-xl font-medium sm:text-2xl">{job.title}</h2>
                </div>

                <div className="absolute p-4 opacity-0 sm:p-6 lg:p-8">
                    <h3 className="mt-4 text-xl font-medium sm:text-2xl">{job.title}</h3>

                    <p className="mt-4 text-sm sm:text-base">
                        {job_offer(job.job_offer_body)}
                    </p>

                    <p className="mt-8 font-bold">Read more</p>
                </div>
            </div>
        </button>
    );
}
