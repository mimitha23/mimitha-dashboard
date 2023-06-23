import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "components/navigation/Navigation";
import LoginPage from "pages/Auth/LoginPage";
import HomePage from "pages/HomePage";
import ModeratePage from "pages/Moderate/ModeratePage";
import CreateColorPage from "pages/Moderate/CreateColorPage";
import CreateVariantPage from "pages/Moderate/CreateVariantPage";
import RegisterProductPage from "pages/Moderate/RegisterProductPage";
import DevelopeProductPage from "pages/Moderate/DevelopeProductPage";
import CreateProductTypePage from "pages/Moderate/CreateProductTypePage";
import RegisteredProductsPage from "pages/Moderate/RegisteredProductsPage";
import DevelopedProductsPage from "pages/Moderate/DevelopedProductsPage";
import DevelopedProductPage from "pages/Moderate/DevelopedProductPage";
import AddDevelopedProductPage from "pages/Moderate/AddDevelopedProductPage";
import CreateProductStylePage from "pages/Moderate/CreateProductStylePage";

import { PATHS } from "config/routes";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path={PATHS.main_navigation.root}
          element={<Navigate to={PATHS.main_navigation.login} />}
        />

        <Route path={PATHS.main_navigation.home} element={<HomePage />} />

        <Route path={PATHS.main_navigation.moderate} element={<ModeratePage />}>
          <Route
            path={PATHS.moderate_sidebar.createColorPage.relativePath}
            element={<CreateColorPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.createVariantPage.relativePath}
            element={<CreateVariantPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.createProductTypePage.relativePath}
            element={<CreateProductTypePage />}
          />

          <Route
            path={PATHS.moderate_sidebar.createProductStylePage.relativePath}
            element={<CreateProductStylePage />}
          />

          <Route
            path={PATHS.moderate_sidebar.registerProductPage.relativePath}
            element={<RegisterProductPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.registeredProductsPage.relativePath}
            element={<RegisteredProductsPage />}
          />

          <Route
            path={PATHS.moderate_nested_routes.developedProductsPage.absolutePath(
              {}
            )}
            element={<DevelopedProductsPage />}
          >
            <Route
              path={PATHS.moderate_nested_routes.developedProductPage.relativePath(
                {}
              )}
              element={<DevelopedProductPage />}
            />
          </Route>

          <Route
            path={PATHS.moderate_nested_routes.addDevelopedProductPage.absolutePath(
              {}
            )}
            element={<AddDevelopedProductPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.developeProductPage.relativePath}
            element={<DevelopeProductPage />}
          />
        </Route>

        <Route path={PATHS.main_navigation.login} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
