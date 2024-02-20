export default function ResultsCount({
  totalJobItems,
}: {
  totalJobItems: number;
}) {
  return (
    <p className="count">
      <span className="u-bold">{totalJobItems} </span>results
    </p>
  );
}
