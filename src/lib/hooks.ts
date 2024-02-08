import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";
import { JobItem } from "../types/types";

export function useGetJobItems(search: string) {
  const [jobItems, setJobItems] = useState<Array<JobItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const slicedJobItems = jobItems.slice(0, 7)!;
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

  return [slicedJobItems, isLoading] as const;
}
