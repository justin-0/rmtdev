import BookmarkIcon from "./BookmarkIcon";

type JobListItemProps = {
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  id: number;
};

export default function JobListItem({
  badgeLetters,
  title,
  company,
  daysAgo,
  id,
}: JobListItemProps) {
  return (
    <li className="job-item">
      <a className="job-item__link" href={`#${id}`}>
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
