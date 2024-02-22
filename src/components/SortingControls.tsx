export default function SortingControls({
  onClick,
  sortBy,
  totalJobItems,
}: {
  onClick: (newSort: "relevant" | "recent") => void;
  sortBy: string;
  totalJobItems: number;
}) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" && totalJobItems > 0
            ? "sorting__button--active"
            : ""
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
