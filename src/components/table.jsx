import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import Card from './UI/Card';
import Modal from './UI/Modal';
import LoadMoreCard from './UI/LoadMoreCard';

export default function Table() {
    const { searchResults, setSearchResults, isLoading, setIsLoading, error, setError } = useAppContext();
    const [modal, setModal] = useState({ open: false, content: null, jobId: '' });
    const [viewedJobs, setViewedJobs] = useState(new Set());
    const [hasMoreJobs, setHasMoreJobs] = useState(true);

    useEffect(() => {
        if (searchResults.length > 0) {
            setViewedJobs(prevViewedJobs => {
                const updatedViewedJobs = new Set(prevViewedJobs);
                searchResults.forEach(job => {
                    updatedViewedJobs.add(job.original_site_id);
                });
                return updatedViewedJobs;
            });
        }
    }, [searchResults]);

    const handleModalClick = (job) => {
        setModal({ open: true, content: job, jobId: job.original_site_id });
    };

    const loadMoreJobs = async () => {
        if (isLoading || !hasMoreJobs) return;
        setIsLoading(true);
        try {
            const response = await fetch('https://taf-nima.onrender.com/api/load-more', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Array.from(viewedJobs)),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const newJobs = await response.json();

            // Filter out duplicates
            const uniqueNewJobs = newJobs.filter(
                (newJob) => !searchResults.some((existingJob) => existingJob._id === newJob._id)
            );

            if (uniqueNewJobs.length === 0) {
                setHasMoreJobs(false);
            } else {
                setSearchResults((prevResults) => [...prevResults, ...uniqueNewJobs]);
                setViewedJobs((prevViewedJobs) => {
                    const updatedViewedJobs = new Set(prevViewedJobs);
                    uniqueNewJobs.forEach((job) => {
                        updatedViewedJobs.add(job.original_site_id);
                    });
                    return updatedViewedJobs;
                });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setModal({ open: false, content: null, jobId: '' });
    };

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div className="container mx-auto my-4">
            {searchResults.length === 0 ? (
                ''
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((job) => (
                        <Card key={job._id} job={job} onModalClick={() => handleModalClick(job)} />
                    ))}
                    {hasMoreJobs && (
                        <LoadMoreCard onClick={loadMoreJobs} isLoading={isLoading} />
                    )}
                </div>
            )}
            <Modal details={modal.content} isOpen={modal.open} handleOnClose={handleModalClose} />
        </div>
    );
}