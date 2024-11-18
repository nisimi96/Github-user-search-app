'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void; // Function to handle search
    placeholder?: string; // Customizable placeholder text 
    theme: 'light' | 'dark'; // Theme state
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search...', theme }) => {
  const [query, setQuery] = useState('');


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className={`${theme === 'light' ? 'bg-[#fefefe]' : 'bg-[#1E2A47]'} flex items-center gap-2 mt-4 py-[10px] px-[32px] rounded-md`}>
        <Image src="./icon-search.svg" alt="search icon" className='mr-10 lg:mr-20 md:mr-15' width={29} height={29}/>
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`"p-2 w-full max-w-md focus:outline-none focus:ring-1 focus:border-blue-600 border-0 " ${theme === 'light' ? 'text-[#4B6A9B] bg-[#fefefe] placeholder-[#4B6A9B]' : 'text-white bg-[#1E2A47] placeholder-[#fff]'} `}
        />
        <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
        >
            Search
        </button>
    </form>
    </div>
  );
};

export default SearchBar;
