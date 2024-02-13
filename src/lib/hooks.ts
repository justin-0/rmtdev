import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";
import { JobItem } from "../types/types";

export function useGetJobItems(search: string) {
  const [jobItems, setJobItems] = useState<Array<JobItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const slicedJobItems = jobItems.slice(0, 7);
  useEffect(() => {
    if (!search) return;
    async function getJobData() {
      setIsLoading(true);
      const response = await fetch(`${API_URL}?search=${search}`);
      const data = await response.json();
      setJobItems(data.jobItems);
      setIsLoading(false);
    }
    getJobData();
  }, [search]);

  return [slicedJobItems, isLoading] as const;
}

export function useActiveJobId() {
  const [activeJobId, setActiveJobId] = useState<number | null>(null);

  // Run effect on mount to add event listener to window
  useEffect(() => {
    const handleHashChange = () => {
      // Convert string into number with unary
      const id = +window.location.hash.slice(1);
      setActiveJobId(id);
    };
    // Call func so id is set, if we don't do this then id will be null
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeJobId;
}
