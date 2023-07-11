export default function CardDetailBlock({ label, value }) {
  return (
    <div className="registered-product--card__details-box">
      <span>{label}:</span>
      &nbsp;
      <span>{value}</span>
    </div>
  );
}
