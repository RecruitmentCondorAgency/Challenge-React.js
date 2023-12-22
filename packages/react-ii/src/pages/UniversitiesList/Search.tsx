import { useCallback, useState } from "react";

import Autocomplete from "../../components/AutoComplete";
import { getUniversitiesAPI } from "../../api/utils";
import { University } from "../../types/university";
import Button from "../../components/Button";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const UniversitiesSearch: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleOnChange = useCallback((text: string) => {
    setSearchTerm(text);
  }, []);

  const handleSuggestionSelect = useCallback((suggestion: string) => {
    onSearch(suggestion);
  }, []);

  const handleGetSuggestions = useCallback(async (inputValue: string) => {
    const suggestions = await getUniversitiesAPI(inputValue);
    setSuggestions(
      suggestions?.map((university: University) => university.name) || []
    );
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      onSearch(searchTerm);
    },
    [searchTerm]
  );

  return (
    <form onSubmit={handleSearch}>
      <div className="mb-10 flex items-center">
        <Autocomplete
          onSelect={handleSuggestionSelect}
          placeholder="University name"
          onChange={handleOnChange}
          suggestions={suggestions}
          onGetSuggestions={handleGetSuggestions}
        />
        <span className="ml-2">
          <Button type="submit" onClick={handleSearch}>
            <svg
              className="w-4 h-6"
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
