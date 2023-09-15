import MediaBox from "./MediaBox";
import * as Styled from "./DevelopedProductBlueprint.styled";
import MediaDualBoxContainer from "./MediaDualBoxContainer";

export default function MediaDualBox({
  title,
  error,
  message,
  firstChild = {
    id: "",
    src: "",
    label: "",
    onChange: () => {},
    type: "image", // image | video
  },
  secondChild = {
    id: "",
    src: "",
    label: "",
    onChange: () => {},
    type: "image", // image | video
  },
}) {
  return (
    <Styled.MediaDualBox>
      <MediaDualBoxContainer title={title}>
        <MediaBox
          id={firstChild.id}
          src={firstChild.src}
          type={firstChild.type}
          label={firstChild.label}
          onChange={firstChild.onChange}
        />

        <MediaBox
          id={secondChild.id}
          src={secondChild.src}
          type={secondChild.type}
          label={secondChild.label}
          onChange={secondChild.onChange}
        />

        {error && <div className="dual-box__err-msg">{message}</div>}
      </MediaDualBoxContainer>
    </Styled.MediaDualBox>
  );
}
