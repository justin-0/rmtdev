import { useActiveJobId } from "../lib/hooks";
import { JobItem } from "../types/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  isLoading: boolean;
  jobItems: JobItem[];
};
export function JobList({ isLoading, jobItems }: JobListProps) {
  const activeId = useActiveJobId();

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
            id={job.id}
            active={activeId === job.id}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
