import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { useStateContext } from '../store/usecontext';

function SearchComponent() {
  const { setSearchTerm } = useStateContext(); // Accessing context here
  const [search, setSearch] = useState(""); 
  const [debouncedValue] = useDebounce(search, 300); 

  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      setSearchTerm(debouncedValue); 
    }
  }, [debouncedValue, setSearchTerm]);

  const handleInput = () => {
    console.log("Search value:", search);
    setSearch(""); // Clear input after search is set
    setSearchTerm(search); // Trigger search immediately on click
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInput(); // Trigger search on Enter key
    }
  };

  return (
    <div className="relative">
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        className=" ml-4 pr-[90px] " 
      />
      <Search
        className="absolute  top-[45%] right-4 transform -translate-y-1/2 text-gray-600 cursor-pointer dark:text-white"
        size={28}
        onClick={handleInput}
      />
    </div>
  );
}

export default SearchComponent;
