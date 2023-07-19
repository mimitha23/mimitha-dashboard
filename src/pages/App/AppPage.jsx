import App from "components/App/App";
import { Outlet } from "react-router-dom";

export default function AppPage() {
  return (
    <App>
      <Outlet />
    </App>
  );
}
