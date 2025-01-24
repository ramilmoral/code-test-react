import React, { useState, useEffect } from 'react';

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    props.setFilteredLaunches(
      props.launches.filter((launch) =>
        launch.mission_name.toLowerCase().includes(term)
      )
    );
  };

  return (
    <>
      <h1>SpaceX Launches</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </>
  );
}

export default Search;
