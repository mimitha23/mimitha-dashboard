import AddDevelopedProduct from "components/Moderate/DevelopeProduct/AddDevelopedProduct";
import DevelopeProductFormProvider from "providers/DevelopeProductFormProvider";

export default function AddDevelopedProductPage() {
  return (
    <DevelopeProductFormProvider>
      <AddDevelopedProduct />
    </DevelopeProductFormProvider>
  );
}
