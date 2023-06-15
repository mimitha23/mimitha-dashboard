import { Outlet } from "react-router-dom";
import ModerateContainer from "components/Moderate/ModerateContainer";

export default function ModeratePage() {
  return (
    <ModerateContainer>
      <Outlet />
    </ModerateContainer>
  );
}
