import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import PaginationButton from "./PaginationButton";

export default function PaginationControls({
  current,
  setPage,
  totalPages,
}: {
  current: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) {
  return (
    <section className="pagination">
      {current === 1 ? (
        <button></button>
      ) : (
        <PaginationButton
          current={current}
          setPage={setPage}
          direction="left"
          icon={<ArrowLeftIcon />}
        />
      )}
      {current === totalPages || totalPages === 0 ? (
        <button></button>
      ) : (
        <PaginationButton
          current={current}
          setPage={setPage}
          direction="right"
          icon={<ArrowRightIcon />}
        />
      )}
    </section>
  );
}
