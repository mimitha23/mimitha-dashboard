import { createRoot } from "react-dom/client";
import ThemeProvider from "providers/ThemeProvider";
import { Provider } from "react-redux";
import store from "store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
