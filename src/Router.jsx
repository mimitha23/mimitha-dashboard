import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import router from "config/router";
import { LoadingSpinner } from "components/layouts";

export default function Router() {
  return (
    <Suspense fallback={<LoadingSpinner caption="Page Is Loading" />}>
      <Routes>
        {router.map((route, index) => (
          <Route
            key={`router-page--${index}`}
            path={route.path}
            element={route.element}
          >
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route
                  key={`router-child--page__${childIndex}`}
                  path={childRoute.path}
                  element={childRoute.element}
                >
                  {childRoute.children &&
                    childRoute.children.map(
                      (nestedChildRoute, nestedChildIndex) => (
                        <Route
                          key={`router-nested--page__${nestedChildIndex}`}
                          path={nestedChildRoute.path}
                          element={nestedChildRoute.element}
                        />
                      )
                    )}
                </Route>
              ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
}
