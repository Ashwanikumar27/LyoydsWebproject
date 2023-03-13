import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";
import LoadingSpinner from "./LoadingSpinner";
import "./Autocomplete.css";

function Autocomplete(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let getData;
    if (searchTerm) {
      setIsLoading(true);
      getData = setTimeout(() => {
        fetchSuggestions(searchTerm)
          .then((_suggestions) => {
            setIsLoading(false);
            setSuggestions(_suggestions.slice(0, 10));
          })
          .catch(() => {
            setErrorMessage("Error Occured while fetching. Please try again");
            setIsLoading(false);
          });
      }, 3000);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }

    return () => clearTimeout(getData);
  }, [searchTerm]);

  const SuggestionsListComponent = () => {
    return suggestions.map((suggestion) => (
      <div className="suggestion-wrapper" data-testid="suggestions">
        <span
          key={suggestion.id}
          onClick={() => {
            props.selectProduct(suggestion.id);
            setSearchTerm("");
          }}
        >
          {suggestion.title}
        </span>
      </div>
    ));
  };

  return (
    <div className="search-container" data-testid="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ height: 50 }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SuggestionsListComponent
          suggestions={suggestions}
          selectProduct={props.selectProduct}
        />
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default Autocomplete;
