import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useStateContext } from '../store/usecontext';
import { gsap } from "gsap";

function SearchComponent() {
  const { setSearchTerm } = useStateContext();
  const [search, setSearch] = useState(""); 
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    const handleFocus = () => {
      gsap.to(inputElement, {
        duration: 0.3,
        boxShadow: "0 0 10px 2px rgba(69, 215, 203, 0.8)",
        ease: "power1.out",
      });
    };

    const handleBlur = () => {
      gsap.to(inputElement, {
        duration: 0.3,
        boxShadow: "none",
        ease: "power1.out",
      });
    };

    inputElement.addEventListener("focus", handleFocus);
    inputElement.addEventListener("blur", handleBlur);

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
      inputElement.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleInput = () => {
    if (search.trim() !== "") {
      setSearchTerm(search);
      setSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInput();
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
        ref={inputRef} // Attach ref to the input
        className="ml-4 pr-[90px] outline-none" // Remove default outline
      />
      <Search
        className="absolute top-[45%] right-4 transform -translate-y-1/2 text-gray-600 cursor-pointer dark:text-white"
        size={28}
        onClick={handleInput}
      />
    </div>
  );
}

export default SearchComponent;
