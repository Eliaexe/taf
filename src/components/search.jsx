import React, { useState } from "react";
import { useAppContext } from '../AppContext';

export default function Search() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const { setSearchResults, isLoading, setIsLoading, error, setError } = useAppContext();

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults([]); // Clear previous results

    const params = new URLSearchParams({
      jobTitle: jobTitle.trim(),
      jobLocation: location.trim()
    });

    try {
      const response = await fetch(`https://taf-nima.onrender.com/api/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        
      if (response.status == 204) {
        setError('Pas de taf, desole..')
      }
      const data = await response.json();
      

      if (data.length === 0 || data == undefined) {
        setError('Pas de taf, desole..');
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.log(error);
      setError('Pas de taf, desole..');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center bg-white py-12 w-full">
      <div className="w-full max-w-4xl px-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Intitulé de poste, mots-clés ou entreprise"
            className="w-full max-w-md px-4 py-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ville, département, code postal ou Télétravail"
            className="w-full max-w-md px-4 py-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 border-2 border-black bg-black text-white rounded-md shadow-sm hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Ricerca in corso...' : 'Rechercher'}
          </button>
        </form>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
}