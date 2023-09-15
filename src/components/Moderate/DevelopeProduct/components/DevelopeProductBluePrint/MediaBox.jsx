import { PlusIcon } from "components/layouts/Icons";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default function MediaBox({
  id,
  type,
  src,
  label,
  fieldProps,
  error,
  message,
  onChange,
}) {
  return (
    <Styled.MediaBox htmlFor={id}>
      <figure>
        <ChildComponent
          id={id}
          src={src}
          type={type}
          label={label}
          onChange={onChange}
          fieldProps={fieldProps}
        />
      </figure>
      {error && <p className="media-box__err-msg">{message}</p>}
    </Styled.MediaBox>
  );
}

function ChildComponent({ id, src, type, label, onChange, fieldProps }) {
  return (
    <>
      {type === "image" && src ? (
        <img
          src={src instanceof Object ? URL.createObjectURL(src) : src}
          alt="dual-box_image-asset"
        />
      ) : type === "video" && src ? (
        <video
          src={src instanceof Object ? URL.createObjectURL(src) : src}
          controls={true}
          autoPlay={true}
          alt="dual-box_video-asset"
        />
      ) : (
        <p className="dual-box__file-label">
          <PlusIcon />
          <span>{label}</span>
        </p>
      )}

      <input
        hidden
        id={id}
        type="file"
        onChange={onChange}
        {...fieldProps}
        accept={type === "image" ? "image/*" : "video/*"}
      />
    </>
  );
}
