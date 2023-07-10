import { createRoot } from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import store from "store";

import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
