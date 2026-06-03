"use client";

import "./Search.css";

interface SearchProps {
  onChange: (term: string) => void;
}

export default function Search({ onChange }: SearchProps) {
  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Search for a Company or Product"
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
}
