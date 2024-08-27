import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import Card from './UI/Card';
import Modal from './UI/Modal';
import LoadMoreCard from './UI/LoadMoreCard'; // Assicurati di creare questo componente

export default function Table() {
    const { searchResults, setSearchResults, isLoading, setIsLoading, error, setError } = useAppContext();
    const [modal, setModal] = useState({ open: false, content: '', jobId: '' });
    const [viewedJobs, setViewedJobs] = useState([]);
    const [hasMoreJobs, setHasMoreJobs] = useState(true);

    useEffect(() => {
        // Aggiorna gli ID dei lavori visualizzati
        if (searchResults.length > 0) {
            setViewedJobs(searchResults.map(job => job.original_site_id));
        }
    }, [searchResults]);

    const handleModalClick = (job) => {
        setModal({ open: true, content: job.job_offer_body, jobId: job.original_site_id });
    };

    const loadMoreJobs = async () => {
        if (isLoading || !hasMoreJobs) return;

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/load-more', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    viewedJobs,
                    jobTitle: "your current job title", // Modifica con il tuo stato corrente
                    jobLocation: "your current job location" // Modifica con il tuo stato corrente
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const newJobs = await response.json();
            if (newJobs.length === 0) {
                setHasMoreJobs(false);
            } else {
                setSearchResults(prevResults => [...prevResults, ...newJobs]);
                setViewedJobs(prev => [...prev, ...newJobs.map(job => job.original_site_id)]);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setModal({ open: false, content: '', jobId: '' });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto my-4">
            {searchResults.length === 0 ? (
                <p>No jobs available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((job) => (
                        <Card key={job.original_site_id} job={job} onModalClick={() => handleModalClick(job)} />
                    ))}
                    {hasMoreJobs && (
                        <LoadMoreCard onClick={loadMoreJobs} />
                    )}
                </div>
            )}
            <Modal details={modal.content} isOpen={modal.open} handleOnClose={handleModalClose} />
        </div>
    );
}
