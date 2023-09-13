import * as Styled from "./DevelopedProductBlueprint.styled";
import { PlusIcon } from "components/layouts/Icons";

export default function MediaDualBox({
  title,
  firstChild = {
    message: "",
    type: "image", // image | video
    src: "",
    id: "",
  },
  secondChild = {
    message: "",
    type: "image", // image | video
    src: "",
    id: "",
  },
}) {
  return (
    <Styled.AssetsReviewDualBox>
      <p className="product__media-box--title">{title}</p>

      <div className="product__thumbnails">
        <figure>
          <ChildComponent child={firstChild} />
        </figure>

        <figure>
          <ChildComponent child={secondChild} />
        </figure>
      </div>
    </Styled.AssetsReviewDualBox>
  );
}

function ChildComponent({ child }) {
  return (
    <>
      {child.src && (
        <>
          {child.type === "image" ? (
            <img src={child.src} alt="dual-box_image-asset" />
          ) : child.type === "video" ? (
            <video
              controls={true}
              autoPlay={true}
              src={child.src}
              alt="dual-box_video-asset"
            />
          ) : (
            <></>
          )}
        </>
      )}

      {!child.src && (
        <label className="dual-box__file-label" htmlFor={child.id}>
          <PlusIcon />
          <span>{child.message}</span>
          <input hidden id={child.id} type="file" />
        </label>
      )}
    </>
  );
}
