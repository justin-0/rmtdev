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
  console.log(`current page is ${current}`);
  console.log(`Total page is ${totalPages}`);
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
      {current === totalPages ? (
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
