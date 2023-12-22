import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Autosuggest, {
  RenderSuggestionsContainerParams,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';

// Props for the Autocomplete component
interface AutocompleteProps {
  onChange: (selectedItem: string) => void;
  suggestions?: string[];
  onGetSuggestions: (text: string) => void;
  placeholder?: string;
  onSelect: (selectedItem: string) => void;
  onSuggestionsClearRequested?: () => void;
}

// Suggestions container component for rendering autosuggestions
const SuggestionsContainer: React.FC<RenderSuggestionsContainerParams> = ({
  containerProps,
  children,
}) => {
  if (!children) {
    return null;
  }
  return (
    <div
      {...containerProps}
      className="absolute w-full z-10 mt-2 bg-white border rounded shadow-lg"
    >
      {children}
    </div>
  );
};

// Function to get the suggestion value
const getSuggestionValue = (suggestion: string) => suggestion;

// Function to render a suggestion item
const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

// Autocomplete component
const Autocomplete: React.FC<AutocompleteProps> = ({
  onChange,
  suggestions,
  onGetSuggestions,
  placeholder,
  onSelect,
  onSuggestionsClearRequested = () => {},
}) => {
  // State to manage the input value
  const [value, setValue] = useState<string>('');

  // Debounced function to fetch suggestions based on input text
  const onSuggestionsFetchRequested = useCallback(
    debounce(async ({ value }: SuggestionsFetchRequestedParams) => {
      onGetSuggestions(value);
    }, 200),
    [onGetSuggestions]
  );

  // Input properties for Autosuggest component
  const inputProps = {
    placeholder: placeholder || 'Search',
    value,
    onChange: (_: React.FormEvent, { newValue }: { newValue: string }) => {
      setValue(newValue);
      onChange(newValue?.trim());
    },
  };

  // Handle suggestion selection
  const onSuggestionSelected = (
    _: React.FormEvent,
    { suggestion }: { suggestion: string }
  ) => {
    onSelect(suggestion);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={SuggestionsContainer}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      inputProps={inputProps}
      theme={{
        container: 'relative inline-block w-full',
        input: 'mt-1 p-3 w-full border rounded outline-[#e5e7eb]',
        suggestionsList: 'divide-y divide-gray-200',
        suggestion: 'p-2 cursor-pointer hover:bg-gray-100',
      }}
    />
  );
};

export default Autocomplete;
