import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SearchInput({ isInNavBar }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
    setSearchParams({q: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?${searchParams.toString()}`)
  };

  const inputClass = `border rounded-lg py-2 px-4 mx-2 ${isInNavBar ? 'w-64 h-8' : 'w-80'}`;
  const buttonClass = `btn ${isInNavBar ? 'btn-sm bg-stone-600' : 'bg-violet-700'}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center"
    >
      <input
        type="text"
        id="q"
        placeholder="Search for cards, box sets.. "
        value={searchInput}
        onChange={handleInputChange}
        className={inputClass}
      />
      <button type="submit" className={buttonClass}>
        Search
      </button>
    </form>
  );
}
