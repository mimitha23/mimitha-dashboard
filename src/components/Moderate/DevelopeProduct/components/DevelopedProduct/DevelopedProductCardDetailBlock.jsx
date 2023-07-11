export default function DevelopedProductCardDetailBlock({ label, value }) {
  return (
    <div className="developed-product__details-box">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
}
