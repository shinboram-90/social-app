import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <span id="clearBtn" onClick={clearInput}>
              Clear
            </span>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((user) => {
            return (
              // <a className="dataItem" href={user.id} key={user.id}>
              //   <p>{user.username} </p>
              // </a>
              <Link to={`/users/${user.id}`} key={user.id}>
                <p>{user.username} </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
