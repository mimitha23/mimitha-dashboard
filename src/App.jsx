import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "components/navigation/Navigation";
import LoginPage from "pages/Auth/LoginPage";
import HomePage from "pages/HomePage";
import ModeratePage from "pages/Moderate/ModeratePage";
import ModerateColorPage from "pages/Moderate/ModerateColorPage";
import ModerateVariantPage from "pages/Moderate/ModerateVariantPage";
import ModerateProductPage from "pages/Moderate/ModerateProductPage";
import ModerateDevelopedProductPage from "pages/Moderate/ModerateDevelopedProductPage";
import ModerateProductTypePage from "pages/Moderate/ModerateProductTypePage";

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
            path={PATHS.moderate_sidebar.moderateProductTypePage}
            element={<ModerateProductTypePage />}
          />
          <Route
            path={PATHS.moderate_sidebar.moderateVariantPage}
            element={<ModerateVariantPage />}
          />
          <Route
            path={PATHS.moderate_sidebar.moderateColorPage}
            element={<ModerateColorPage />}
          />
          <Route
            path={PATHS.moderate_sidebar.moderateProductPage}
            element={<ModerateProductPage />}
          />
          <Route
            path={PATHS.moderate_sidebar.moderateDevelopedProductPage}
            element={<ModerateDevelopedProductPage />}
          />
        </Route>
        <Route path={PATHS.main_navigation.login} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
