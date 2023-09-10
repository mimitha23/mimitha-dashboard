import * as Styled from "./DevelopedProductBlueprint.styled";

export default function MediaDualBox({
  title,
  firstChild = {
    message: "",
    type: "image", // image | video
    src: "",
  },
  secondChild = {
    message: "",
    type: "image", // image | video
    src: "",
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

      {!child.src && <p>{child.message}</p>}
    </>
  );
}
