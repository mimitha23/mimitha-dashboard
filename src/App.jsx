import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "config/routes";

import Navigation from "components/navigation/Navigation";
import { LoadingSpinner } from "components/layouts";
import * as Pages from "pages";

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path={PATHS.main_navigation.root}
            element={<Navigate to={PATHS.main_navigation.login} />}
          />

          <Route
            path={PATHS.main_navigation.home}
            element={<Pages.HomePage />}
          />

          {/* MODERATE */}
          <Route
            path={PATHS.main_navigation.moderate}
            element={<Pages.ModeratePage />}
          >
            <Route
              path={PATHS.moderate_sidebar.createColorPage.relativePath}
              element={<Pages.CreateColorPage />}
            />
            <Route
              path={PATHS.moderate_nested_routes.colorsPage.absolutePath()}
              element={<Pages.ColorsPage />}
            />

            <Route
              path={PATHS.moderate_sidebar.createVariantPage.relativePath}
              element={<Pages.CreateVariantPage />}
            />
            <Route
              path={PATHS.moderate_nested_routes.variantsPage.absolutePath()}
              element={<Pages.VariantsPage />}
            />

            <Route
              path={PATHS.moderate_sidebar.createProductTypePage.relativePath}
              element={<Pages.CreateProductTypePage />}
            />
            <Route
              path={PATHS.moderate_nested_routes.productTypesPage.absolutePath()}
              element={<Pages.ProductTypesPage />}
            />

            <Route
              path={PATHS.moderate_sidebar.createProductStylePage.relativePath}
              element={<Pages.CreateProductStylePage />}
            />
            <Route
              path={PATHS.moderate_nested_routes.productStylePage.absolutePath()}
              element={<Pages.ProductStylesPage />}
            />

            <Route
              path={PATHS.moderate_sidebar.registerProductPage.relativePath}
              element={<Pages.RegisterProductPage />}
            />

            <Route
              path={PATHS.moderate_sidebar.registeredProductsPage.relativePath}
              element={<Pages.RegisteredProductsPage />}
            />

            <Route
              path={PATHS.moderate_nested_routes.developedProductsPage.absolutePath(
                {}
              )}
              element={<Pages.DevelopedProductsPage />}
            >
              <Route
                path={PATHS.moderate_nested_routes.developedProductPage.relativePath(
                  {}
                )}
                element={<Pages.DevelopedProductPage />}
              />
            </Route>

            <Route
              path={PATHS.moderate_nested_routes.addDevelopedProductPage.absolutePath(
                {}
              )}
              element={<Pages.AddDevelopedProductPage />}
            />
          </Route>

          <Route
            path={PATHS.main_navigation.login}
            element={<Pages.LoginPage />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
