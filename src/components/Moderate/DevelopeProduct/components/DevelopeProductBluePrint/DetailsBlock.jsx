import { memo } from "react";

export default memo(function DetailsBlock({ label, value }) {
  return (
    <div className="registered-product--card__details-box">
      <span>{label} :</span>
      &nbsp;
      {value ? (
        <span>{value}</span>
      ) : (
        <span className="is-empty-part">არ არის შევსებული</span>
      )}
    </div>
  );
});
