import React, { useState, useEffect, useCallback } from 'react';
import Search from '../Search';
import Cards from '../Cards/Cards';
import Spinner from '../Spinner/Spinner';

function SpaceContent() {
  // state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [offset, setOffset] = useState(0);

  const LIMIT = 10; // Limit the number of results per fetch
  const API_URL = `https://api.spacexdata.com/v3/launches?limit=${LIMIT}&offset=${offset}`;

  // Fetch data from SpaceX API
  const fetchLaunches = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.length > 0) {
        setLaunches((prev) => [...prev, ...data]);
        setFilteredLaunches((prev) => [...prev, ...data]);
        setOffset((prev) => prev + LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [page, hasMore]);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // scroll event listner
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="app-container">
      <Search
        launches={launches}
        filteredLaunches={filteredLaunches}
        setFilteredLaunches={setFilteredLaunches}
      />
      <Cards filteredLaunches={filteredLaunches} />
      {loading && <Spinner />}
      {!loading && filteredLaunches.length === 0 && (
        <div className="no-results">No results found</div>
      )}
      {!hasMore && <div className="no-more-data">No more data to load</div>}
    </div>
  );
}

export default SpaceContent;
