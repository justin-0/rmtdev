import { JobItem } from "../types/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: JobItem[];
  isLoading: boolean;
}) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((job: JobItem) => (
          <JobListItem
            key={job.id}
            badgeLetters={job.badgeLetters}
            title={job.title}
            company={job.company}
            daysAgo={job.daysAgo}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
