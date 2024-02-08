import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";

export function useGetJobItems(search: string) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) return;
    async function getJobData() {
      setIsLoading(true);
      const response = await fetch(API_URL + `?search=${search}`);
      const data = await response.json();
      setJobItems(data.jobItems);
      setIsLoading(false);
    }
    getJobData();
  }, [search]);

  return { jobItems, isLoading };
}
