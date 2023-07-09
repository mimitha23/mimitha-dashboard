import { Suspense } from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "config/router";
import { LoadingSpinner } from "components/layouts";

import ThemeProvider from "providers/ThemeProvider";

import Navigation from "components/navigation/Navigation";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
        <Suspense fallback={<LoadingSpinner caption="Page Is Loading" />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
