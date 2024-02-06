import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [jobItems, setJobItems] = useState([]);
  console.log(jobItems);

  useEffect(() => {
    if (!search) return;
    async function getJobData() {
      const response = await fetch(API_URL + `?search=${search}`);
      const data = await response.json();
      setJobItems(data.jobItems);
    }
    getJobData();
  }, [search]);

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
