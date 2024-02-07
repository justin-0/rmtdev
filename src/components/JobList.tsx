import { JobTitle } from "../types/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: JobTitle[];
  isLoading: boolean;
}) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((job: JobTitle) => (
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
