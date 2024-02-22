import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";
import { JobData, JobItem } from "../types/types";
// import { useQuery } from "@tanstack/react-query";

export function useGetJobItems(search: string) {
  const [jobItems, setJobItems] = useState<Array<JobItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return { isLoading, jobItems };
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

export function useJobContent() {
  const activeId = useActiveJobId();
  const [jobContent, setJobContent] = useState<JobData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeId) return;

    const getJobContent = async () => {
      setIsLoading(true);
      const resp = await fetch(`${API_URL}/${activeId}`);
      const data = await resp.json();
      setJobContent(data.jobItem);
      setIsLoading(false);
    };
    getJobContent();
  }, [activeId]);
  const data = jobContent;
  return { data, isLoading };
}

// const fetchJobItem = async (id: number) => {
//   const resp = await fetch(`${API_URL}/${id}`);
//   const data = await resp.json();
//   return data;
// };

// export function useJobContent() {
//   const activeId = useActiveJobId();
//   const { data, isInitialLoading } = useQuery(
//     ["job-item", activeId],
//     () => (activeId ? fetchJobItem(activeId) : null),
//     {
//       staleTime: 1000 * 60 * 60,
//       refetchOnWindowFocus: false,
//       retry: false,
//       enabled: Boolean(activeId),
//     }
//   );
//   return { data: data.jobItem, isLoading: isInitialLoading };
// }

export function useGetLocalStorage() {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("bookmarks") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);
  console.log(bookmarkedIds);

  return { bookmarkedIds, setBookmarkedIds };
}
