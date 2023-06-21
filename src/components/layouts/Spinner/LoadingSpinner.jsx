import * as Styled from "./styles/LoadingSpinner.styled.js";
import Loading from "../Loading/Loading.jsx";

export default function LoadingSpinner() {
  return (
    <Styled.LoadingSpinner className="restrict-overflow">
      <Loading />
    </Styled.LoadingSpinner>
  );
}
