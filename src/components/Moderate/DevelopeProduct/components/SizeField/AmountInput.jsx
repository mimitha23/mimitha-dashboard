export default function AmountInput({ error, onSetSize, size }) {
  return (
    <div className="size-field__inps-amount--inp">
      <input
        type="number"
        placeholder="რაოდენობა"
        className={error.amount?.hasError ? "error" : ""}
        name="amount"
        value={size.amount}
        onChange={(e) =>
          onSetSize({
            key: e.target.name,
            value: e.target.value,
            sizeId: size._id,
          })
        }
      />

      {error.amount?.hasError && (
        <p className="size-field__message">{error.amount?.message}</p>
      )}
    </div>
  );
}
