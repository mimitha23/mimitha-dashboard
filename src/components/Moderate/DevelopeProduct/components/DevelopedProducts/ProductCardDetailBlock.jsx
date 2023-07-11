export default function ProductCardDetailBlock({ label, value }) {
  return (
    <div className="developed-product--card__details-box">
      <span>{label}:</span>
      &nbsp;
      <span>{value}</span>
    </div>
  );
}
