import React from "react";
import { DebounceInput } from "react-debounce-input";
import { useStore } from "../../Stores/Helpers/useStore";
import "./SearchInput.css";

const SearchInput = () => {
  const {
    dataStore: { driversStore },
  } = useStore();

  return (
    <div>
      <DebounceInput
        minLength={1}
        placeholder="Search..."
        debounceTimeout={300}
        onChange={(event) =>
          driversStore.filterDriverByName(event.target.value)
        }
      />
    </div>
  );
};

export default SearchInput;
