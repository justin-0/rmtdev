import { useEffect, useState } from "react";
import { useActiveJobId } from "../lib/hooks";
import BookmarkIcon from "./BookmarkIcon";
import { JobData } from "../types/types";
import { API_URL } from "../constants/constants";
import Spinner from "./Spinner";

export default function JobItemContent() {
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

  console.log(jobContent);

  // return <EmptyJobContent />;
  return (
    <section className="job-details">
      <div>
        {isLoading ? (
          <Spinner />
        ) : jobContent !== null ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1272&q=100"
              alt="#"
            />

            <a
              className="apply-btn"
              href="https://fictional9thtechwebsite.com/"
              target="_blank"
            >
              Apply
            </a>

            <section className="job-info">
              <div className="job-info__left">
                <div className="job-info__badge">{jobContent.badgeLetters}</div>
                <div className="job-info__below-badge">
                  <time className="job-info__time">{jobContent.daysAgo}d</time>

                  <BookmarkIcon />
                </div>
              </div>

              <div className="job-info__right">
                <h2 className="second-heading">{jobContent.title}</h2>
                <p className="job-info__company">{jobContent.company}</p>
                <p className="job-info__description">
                  {jobContent.description}
                </p>
                <div className="job-info__extras">
                  <p className="job-info__extra">
                    <i className="fa-solid fa-clock job-info__extra-icon"></i>
                    {jobContent.duration}
                  </p>
                  <p className="job-info__extra">
                    <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                    {jobContent.salary}
                  </p>
                  <p className="job-info__extra">
                    <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                    {jobContent.location}
                  </p>
                </div>
              </div>
            </section>

            <div className="job-details__other">
              <section className="qualifications">
                <div className="qualifications__left">
                  <h4 className="fourth-heading">Qualifications</h4>
                  <p className="qualifications__sub-text">
                    Other qualifications may apply
                  </p>
                </div>
                <ul className="qualifications__list">
                  {jobContent.qualifications.map((q) => {
                    return (
                      <li key={q} className="qualifications__item">
                        {q}
                      </li>
                    );
                  })}
                </ul>
              </section>
              s
              <section className="reviews">
                <div className="reviews__left">
                  <h4 className="fourth-heading">Company reviews</h4>
                  <p className="reviews__sub-text">
                    Recent things people are saying
                  </p>
                </div>
                <ul className="reviews__list">
                  {jobContent.reviews.map((r) => {
                    return <li className="reviews__item">{r}</li>;
                  })}
                </ul>
              </section>
            </div>

            <footer className="job-details__footer">
              <p className="job-details__footer-text">
                If possible, please reference that you found the job on{" "}
                <span className="u-bold">rmtDev</span>, we would really
                appreciate it!
              </p>
            </footer>
          </>
        ) : (
          <EmptyJobContent />
        )}
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    // <section className="job-details">
    // <div>
    <div className="job-details__start-view">
      <p>What are you looking for?</p>
      <p>
        Start by searching for any technology your ideal job is working with
      </p>
    </div>
    // </div>
    // </section>
  );
}
