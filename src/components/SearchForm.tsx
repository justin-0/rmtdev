import { useState } from "react";

export default function SearchForm() {
  const [search, setSearch] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type={search}
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
