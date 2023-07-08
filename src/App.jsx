import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "components/navigation/Navigation";
import { LoadingSpinner } from "components/layouts";
import routes from "config/router";

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<LoadingSpinner caption="Page Is Loading" />}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
