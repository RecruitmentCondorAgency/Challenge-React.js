import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Autosuggest, {
  RenderSuggestionsContainerParams,
  SuggestionsFetchRequestedParams,
} from "react-autosuggest";

interface AutocompleteProps {
  onChange: (selectedItem: string) => void;
  suggestions?: string[];
  onGetSuggestions: (text: string) => void;
  placeholder?: string;
  onSelect: (selectedItem: string) => void;
  onSuggestionsClearRequested?: () => void;
}

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

const getSuggestionValue = (suggestion: string) => suggestion;

const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

const Autocomplete: React.FC<AutocompleteProps> = ({
  onChange,
  suggestions,
  onGetSuggestions,
  placeholder,
  onSelect,
  onSuggestionsClearRequested = () => {},
}) => {
  const [value, setValue] = useState<string>("");

  const onSuggestionsFetchRequested = useCallback(
    debounce(async ({ value }: SuggestionsFetchRequestedParams) => {
      onGetSuggestions(value);
    }, 200),
    []
  );

  const inputProps = {
    placeholder: placeholder || "Search",
    value,
    onChange: (_: React.FormEvent, { newValue }: { newValue: string }) => {
      setValue(newValue);
      onChange(newValue?.trim());
    },
  };

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
        container: "relative inline-block w-full",
        input: "mt-1 p-2 w-full border rounded outline-[#e5e7eb]",
        suggestionsList: "divide-y divide-gray-200",
        suggestion: "p-2 cursor-pointer hover:bg-gray-100",
      }}
    />
  );
};

export default Autocomplete;
