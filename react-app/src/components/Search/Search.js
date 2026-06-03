import React, { useEffect, useState } from 'react';



const Search = ({ callback }) => {


    return (
        <form className='search-form'>
            <input
                type="text"
                placeholder='Search for a Company or Product'
                // value={searchInput}
                onChange={(e) => callback(e.target.value)}
            >
            </input>
        </form>
    )
}

export default Search;
