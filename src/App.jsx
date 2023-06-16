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
import RegisteredProductsListPage from "pages/Moderate/RegisteredProductsListPage";
import DevelopedProductsListPage from "pages/Moderate/DevelopedProductsListPage";

import { PATHS, MODERATE_HIDDEN_ROUTES } from "config/routes";

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
            path={PATHS.moderate_sidebar.createProductTypePage}
            element={<CreateProductTypePage />}
          />

          <Route
            path={PATHS.moderate_sidebar.createVariantPage}
            element={<CreateVariantPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.createColorPage}
            element={<CreateColorPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.registerProductPage}
            element={<RegisterProductPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.registeredProductsListPage}
            element={<RegisteredProductsListPage />}
          />

          <Route
            path={MODERATE_HIDDEN_ROUTES.developedProductsListPage.fullPath}
            element={<DevelopedProductsListPage />}
          />

          <Route
            path={PATHS.moderate_sidebar.developeProductPage}
            element={<DevelopeProductPage />}
          />
        </Route>

        <Route path={PATHS.main_navigation.login} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
