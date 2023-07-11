import * as Styled from "./styles/LoadingSpinner.styled.js";
import Loading from "../Loading/Loading.jsx";

export default function LoadingSpinner({ caption, position = "fixed" }) {
  return (
    <Styled.LoadingSpinner className="restrict-overflow" position={position}>
      <Loading caption={caption || ""} />
    </Styled.LoadingSpinner>
  );
}
