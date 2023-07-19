import { lazy } from "react";

export const LoginPage = lazy(() => import("pages/Auth/LoginPage"));
export const HomePage = lazy(() => import("pages/HomePage"));

// MODERATE
export const ModeratePage = lazy(() => import("pages/Moderate/ModeratePage"));

export const CreateColorPage = lazy(() =>
  import("pages/Moderate/CreateColorPage")
);
export const ColorsPage = lazy(() => import("pages/Moderate/ColorsPage"));

export const CreateVariantPage = lazy(() =>
  import("pages/Moderate/CreateVariantPage")
);
export const VariantsPage = lazy(() => import("pages/Moderate/VariantsPage"));

export const CreateProductTypePage = lazy(() =>
  import("pages/Moderate/CreateProductTypePage")
);
export const ProductTypesPage = lazy(() =>
  import("pages/Moderate/ProductTypesPage")
);

export const CreateProductStylePage = lazy(() =>
  import("pages/Moderate/CreateProductStylePage")
);
export const ProductStylesPage = lazy(() =>
  import("pages/Moderate/ProductStylesPage")
);

export const CreateTexturePage = lazy(() =>
  import("pages/Moderate/CreateTexturePage")
);
export const TexturesPage = lazy(() => import("pages/Moderate/TexturesPage"));

export const RegisterProductPage = lazy(() =>
  import("pages/Moderate/RegisterProductPage")
);
export const RegisteredProductsPage = lazy(() =>
  import("pages/Moderate/RegisteredProductsPage")
);

export const DevelopedProductsPage = lazy(() =>
  import("pages/Moderate/DevelopedProductsPage")
);
export const DevelopedProductPage = lazy(() =>
  import("pages/Moderate/DevelopedProductPage")
);
export const AddDevelopedProductPage = lazy(() =>
  import("pages/Moderate/AddDevelopedProductPage")
);

// APP
export const AppPage = lazy(() => import("pages/App/AppPage"));
export const AddNavRoutePage = lazy(() => import("pages/App/AddNavRoutePage"));
export const EditNavPage = lazy(() => import("pages/App/EditNavPage"));
