import { Outlet } from "react-router-dom";
import DevelopedProducts from "components/Moderate/DevelopedProducts";

export default function DevelopedProductsPage() {
  return (
    <DevelopedProducts>
      <Outlet />
    </DevelopedProducts>
  );
}
