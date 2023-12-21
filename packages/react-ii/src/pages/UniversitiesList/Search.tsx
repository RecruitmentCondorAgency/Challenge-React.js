import React, { useCallback, useState } from 'react';

import Autocomplete from '../../components/AutoComplete';
import { getUniversitiesAPI } from '../../api/utils';
import { University } from '../../types/university';
import Button from '../../components/Button';

interface UniversitiesSearchProps {
  onSearch: (searchTerm: string) => void;
}

const UniversitiesSearch: React.FC<UniversitiesSearchProps> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Handle input change in the autocomplete field
  const handleInputChange = useCallback((text: string) => {
    setSearchTerm(text);
  }, []);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      onSearch(suggestion);
    },
    [onSearch]
  );

  // Fetch university suggestions based on input value
  const handleGetSuggestions = useCallback(async (inputValue: string) => {
    const universities = await getUniversitiesAPI(inputValue);
    const universityNames =
      universities?.map((university: University) => university.name) || [];
    setSuggestions(universityNames);
  }, []);

  // Handle search form submission
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchTerm);
    },
    [onSearch, searchTerm]
  );

  return (
    <form onSubmit={handleSearch}>
      <div className="mb-10 flex items-center">
        <Autocomplete
          onSelect={handleSuggestionSelect}
          placeholder="Enter university name"
          onChange={handleInputChange}
          suggestions={suggestions}
          onGetSuggestions={handleGetSuggestions}
        />
        <span className="ml-2 mt-1">
          <Button type="submit">
            <svg
              className="w-6 h-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </Button>
        </span>
      </div>
    </form>
  );
};

export default UniversitiesSearch;
