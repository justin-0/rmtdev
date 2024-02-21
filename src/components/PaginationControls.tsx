import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function PaginationControls({
  current,
  setPage,
}: {
  current: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <section className="pagination">
      {current === 1 ? (
        <button></button>
      ) : (
        <button
          className="pagination__button"
          onClick={() => setPage((p) => p - 1)}
        >
          <ArrowLeftIcon /> Page {`${current}`}
        </button>
      )}

      <button
        className="pagination__button"
        onClick={() => setPage((p) => p + 1)}
      >
        Page {`${current + 1}`}
        <ArrowRightIcon />{" "}
      </button>
    </section>
  );
}
