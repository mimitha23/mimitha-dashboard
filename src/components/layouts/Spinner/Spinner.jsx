import * as Styled from "./styles/Spinner.styled";

export default function Spinner({ position = "absolute" }) {
  return (
    <Styled.Spinner position={position}>
      <div className="spin"></div>
    </Styled.Spinner>
  );
}
