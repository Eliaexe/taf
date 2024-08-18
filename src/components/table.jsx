import React, { useState, useEffect } from 'react';
import Card from './UI/card';
import Modal from './UI/modal';

export default function Table() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ open: false, content: '' });

    useEffect(() => {
        fetch('http://localhost:3000/mock_data/results.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setJobs(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Opens the modal with job details
    const handleModalClick = (job) => {
        setModal({ open: true, content: job.job_offer_body });
    };

    return (
        <div className="container mx-auto my-4">
            {jobs.length === 0 ? (
                <p>No jobs available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job) => (
                        <Card key={job.id} job={job} onModalClick={() => handleModalClick(job)} />
                    ))}
                </div>
            )}
            <Modal details={modal.content} isOpen={modal.open} handleOnClose={() => setModal({ open: false, content: '' })} />
        </div>
    );
}
