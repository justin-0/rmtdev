export default function SortingControls({
  onClick,
  sortBy,
}: {
  onClick: (newSort: "relevant" | "recent") => void;
  sortBy: string;
}) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? "sorting__button--active" : ""
        }`}
        onClick={() => onClick("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "recent" ? "sorting__button--active" : ""
        }`}
        onClick={() => onClick("recent")}
      >
        Recent
      </button>
    </section>
  );
}
