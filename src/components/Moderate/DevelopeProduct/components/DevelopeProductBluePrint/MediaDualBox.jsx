import MediaBox from "./MediaBox";
import MediaDualBoxContainer from "./MediaDualBoxContainer";

export default function MediaDualBox({
  title,
  error,
  message,
  firstChild = {
    id: "",
    src: "",
    message: "",
    onChange: () => {},
    type: "image", // image | video
  },
  secondChild = {
    id: "",
    src: "",
    message: "",
    onChange: () => {},
    type: "image", // image | video
  },
}) {
  return (
    <MediaDualBoxContainer title={title}>
      <MediaBox
        id={firstChild.id}
        src={firstChild.src}
        type={firstChild.type}
        message={firstChild.message}
        onChange={firstChild.onChange}
      />

      <MediaBox
        id={secondChild.id}
        src={secondChild.src}
        type={secondChild.type}
        message={secondChild.message}
        onChange={secondChild.onChange}
      />
    </MediaDualBoxContainer>
  );
}
