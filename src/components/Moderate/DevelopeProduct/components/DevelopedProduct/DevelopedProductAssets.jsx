export default function DevelopedProductAssets({ assets }) {
  return (
    <figure className="developed-product__fig">
      <img src={assets?.[0]} alt={assets?.[0]} />
    </figure>
  );
}
