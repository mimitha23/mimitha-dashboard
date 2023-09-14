import { PlusIcon } from "components/layouts/Icons";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default function MediaBox({ id, type, src, message, onChange }) {
  return (
    <Styled.MediaBox htmlFor={id}>
      <figure>
        <ChildComponent
          id={id}
          src={src}
          type={type}
          message={message}
          onChange={onChange}
        />
      </figure>
    </Styled.MediaBox>
  );
}

function ChildComponent({ id, src, type, message, onChange }) {
  return (
    <>
      {type === "image" && src ? (
        <img src={src} alt="dual-box_image-asset" />
      ) : type === "video" && src ? (
        <video
          src={src}
          controls={true}
          autoPlay={true}
          alt="dual-box_video-asset"
        />
      ) : (
        <p className="dual-box__file-label">
          <PlusIcon />
          <span>{message}</span>
        </p>
      )}

      <input hidden id={id} type="file" onChange={onChange} />
    </>
  );
}
