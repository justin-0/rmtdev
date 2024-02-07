import { JobTitle } from "../types/types";
import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.map((job: JobTitle) => (
        <JobListItem
          key={job.id}
          badgeLetters={job.badgeLetters}
          title={job.title}
          company={job.company}
          daysAgo={job.daysAgo}
        />
      ))}
    </ul>
  );
}

export default JobList;
