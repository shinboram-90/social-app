import React, { useState } from 'react';

function Searchbar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((user) => {
      return user.username.toLowerCase().startsWith(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          user={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            ''
          ) : (
            <button id="clearBtn" onClick={clearInput}>
              Clear
            </button>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((user) => {
            return (
              <a className="dataItem" href={user.username} key={user.id}>
                <p>{user.username} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
