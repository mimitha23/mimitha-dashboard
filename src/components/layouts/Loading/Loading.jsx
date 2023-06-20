import * as Styled from "./Loading.styled";

export default function Loading() {
  return (
    <Styled.Loading>
      <div className="loading">
        <span>Loading</span>
        <span className="dot dot-1">.</span>
        <span className="dot dot-2">.</span>
        <span className="dot dot-3">.</span>
      </div>
    </Styled.Loading>
  );
}
