import { Navigate } from "react-router-dom";
import { PATHS } from "./routes";
import * as Pages from "pages";

const router = [
  {
    path: PATHS.main_navigation.root,
    element: <Navigate to={PATHS.main_navigation.login} />,
  },
  {
    path: PATHS.main_navigation.home,
    element: <Pages.HomePage />,
  },
  {
    path: PATHS.main_navigation.moderate,
    element: <Pages.ModeratePage />,
    children: [
      // Color
      {
        path: PATHS.moderate_sidebar.createColorPage.relativePath,
        element: <Pages.CreateColorPage />,
      },
      {
        path: PATHS.moderate_nested_routes.colorsPage.absolutePath(),
        element: <Pages.ColorsPage />,
      },

      // Variant
      {
        path: PATHS.moderate_sidebar.createVariantPage.relativePath,
        element: <Pages.CreateVariantPage />,
      },
      {
        path: PATHS.moderate_nested_routes.variantsPage.absolutePath(),
        element: <Pages.VariantsPage />,
      },

      // Product Type
      {
        path: PATHS.moderate_sidebar.createProductTypePage.relativePath,
        element: <Pages.CreateProductTypePage />,
      },
      {
        path: PATHS.moderate_nested_routes.productTypesPage.absolutePath(),
        element: <Pages.ProductTypesPage />,
      },

      // Product Style
      {
        path: PATHS.moderate_sidebar.createProductStylePage.relativePath,
        element: <Pages.CreateProductStylePage />,
      },
      {
        path: PATHS.moderate_nested_routes.productStylesPage.absolutePath(),
        element: <Pages.ProductStylesPage />,
      },

      // Texture
      {
        path: PATHS.moderate_sidebar.createTexturePage.relativePath,
        element: <Pages.CreateTexturePage />,
      },
      {
        path: PATHS.moderate_nested_routes.texturesPage.absolutePath(),
        element: <Pages.TexturesPage />,
      },

      // Register Product
      {
        path: PATHS.moderate_sidebar.registerProductPage.relativePath,
        element: <Pages.RegisterProductPage />,
      },

      // Develope Product
      {
        path: PATHS.moderate_sidebar.registeredProductsPage.relativePath,
        element: <Pages.RegisteredProductsPage />,
      },
      {
        path: PATHS.moderate_nested_routes.developedProductsPage.absolutePath(
          {}
        ),
        element: <Pages.DevelopedProductsPage />,
        children: [
          {
            path: PATHS.moderate_nested_routes.developedProductPage.relativePath(
              {}
            ),
            element: <Pages.DevelopedProductPage />,
          },
        ],
      },
      {
        path: PATHS.moderate_nested_routes.addDevelopedProductPage.absolutePath(
          {}
        ),
        element: <Pages.AddDevelopedProductPage />,
      },
    ],
  },
  {
    path: PATHS.main_navigation.login,
    element: <Pages.LoginPage />,
  },
];

export default router;
