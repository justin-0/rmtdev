type PaginationButtonProps = {
  current: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  icon: React.ReactNode;
  direction: "left" | "right";
};

export default function PaginationButton({
  current,
  setPage,
  icon,
  direction,
}: PaginationButtonProps) {
  return (
    <button
      className="pagination__button"
      onClick={() => setPage((p) => (direction === "left" ? p - 1 : p + 1))}
    >
      {direction === "left" ? (
        <>
          {icon} {"Page"} {current}
        </>
      ) : (
        <>
          {"Page"} {current + 1} {icon}
        </>
      )}
    </button>
  );
}
