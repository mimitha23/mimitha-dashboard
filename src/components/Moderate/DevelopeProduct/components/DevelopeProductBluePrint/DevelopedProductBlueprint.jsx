// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import DetailsBlock from "./DetailsBlock";
// import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";

import ImageFilesReview from "./ImageFilesReview";
import { Controller } from "react-hook-form";
import { useDevelopeProductProvider } from "providers/DevelopeProductFormProvider";

import MediaBox from "./MediaBox";
import MediaDualBox from "./MediaDualBox";
import MediaDualBoxContainer from "./MediaDualBoxContainer";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default function DevelopedProductBlueprint() {
  // const form = useSelector(selectDevelopeProductForm);

  // const [size, setSize] = useState({
  //   size: "",
  //   inStock: "",
  // });

  // useEffect(() => {
  //   if (!form.sizes[0]) return;

  //   const sizeStr = form.sizes
  //     .map((size) => (size.size.ka ? `${size.size.ka} - ${size.amount}` : ""))
  //     .join(" / ");

  //   const inStock = form.sizes.reduce(
  //     (acc, size) => acc + parseFloat(size.amount),
  //     0
  //   );

  //   setSize((prev) => ({
  //     ...prev,
  //     size: sizeStr,
  //     inStock,
  //   }));
  // }, [form.sizes]);
  const {
    form,
    onThumbnailChange,
    onMannequinChange,
    onModelVideoChange,
    onPlacingVideoChange,
    onPickUpVideoChange,
  } = useDevelopeProductProvider();

  const existingThumbnails = form.getValues("thumbnails");
  const existingMannequin = form.getValues("mannequin");
  const existingModelVideo = form.getValues("modelVideo");
  const existingPlacingVideo = form.getValues("placingVideo");
  const existingPickUpVideo = form.getValues("pickUpVideo");

  return (
    <Styled.DevelopedProductBlueprint>
      <ImageFilesReview />

      <Controller
        name="new_thumbnails"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <MediaDualBox
            title="პროდუქტის ხატულები"
            error={error ? true : false}
            message={error?.message}
            firstChild={{
              src: field.value[0] || existingThumbnails[0],
              type: "image",
              label: "პროდუქტის წინა მხარე",
              id: "product-thumbnail--front",
              onChange: (e) =>
                onThumbnailChange({
                  index: 0,
                  reactEvent: e,
                }),
            }}
            secondChild={{
              src: field.value[1] || existingThumbnails[1],
              type: "image",
              label: "პროდუქტის უკანა მხარე",
              id: "product-thumbnail--back",
              onChange: (e) =>
                onThumbnailChange({
                  index: 1,
                  reactEvent: e,
                }),
            }}
          />
        )}
      />

      <MediaDualBoxContainer title="პროდუქტის მანეკენი და მოდელი">
        <Controller
          name="new_mannequin"
          control={form.control}
          render={({
            field: { value, onChange, ...field },
            fieldState: { error },
          }) => (
            <MediaBox
              id="product-mannequin"
              type="image"
              label="მანეკენი"
              src={value || existingMannequin}
              fieldProps={field}
              message={error?.message}
              error={error ? true : false}
              onChange={(e) => onMannequinChange(e, onChange)}
            />
          )}
        />

        <Controller
          name="new_model_video"
          control={form.control}
          render={({
            field: { value, onChange, ...field },
            fieldState: { error },
          }) => (
            <MediaBox
              id="product-model"
              type="video"
              label="მოდელი"
              src={value || existingModelVideo}
              fieldProps={field}
              message={error?.message}
              error={error ? true : false}
              onChange={(e) => onModelVideoChange(e, onChange)}
            />
          )}
        />
      </MediaDualBoxContainer>

      <MediaDualBoxContainer title="პროდუქტის კონფიგურატორი (აღება და დადება)">
        <Controller
          name="new_simulation_video_placing"
          control={form.control}
          render={({
            field: { value, onChange, ...field },
            fieldState: { error },
          }) => (
            <MediaBox
              id="product-config-take-down"
              type="video"
              label="პროდუქტის დადება"
              src={value || existingPlacingVideo}
              fieldProps={field}
              message={error?.message}
              error={error ? true : false}
              onChange={(e) => onPlacingVideoChange(e, onChange)}
            />
          )}
        />

        <Controller
          name="new_simulation_video_pick_up"
          control={form.control}
          render={({
            field: { value, onChange, ...field },
            fieldState: { error },
          }) => (
            <MediaBox
              id="product-config-take-up"
              type="video"
              label="პროდუქტის აღება"
              src={value || existingPickUpVideo}
              fieldProps={field}
              message={error?.message}
              error={error ? true : false}
              onChange={(e) => onPickUpVideoChange(e, onChange)}
            />
          )}
        />
      </MediaDualBoxContainer>

      {/* <div className="registered-product--card__details">
        <DetailsBlock label="სათაური (ka)" value={form.title_ka} />

        <DetailsBlock label="სათაური (en)" value={form.title_en} />

        <DetailsBlock label="ფასი" value={form.price ? `${form.price}₾` : ""} />

        <DetailsBlock label="ფერი" value={form.color.ka} />

        <DetailsBlock label="ზომა" value={size.size} />

        <DetailsBlock label="ჯამური მარაგი" value={size.inStock} />

        <DetailsBlock label="ვარიანტები" value={form.variants?.length} />

        <DetailsBlock label="აღწერა (ka)" value={form.description_ka} />

        <DetailsBlock label="აღწერა (en)" value={form.description_en} />

        <DetailsBlock label="საჯარო" value={form.isPublic ? "✔" : "❌"} />

        <DetailsBlock label="პოპულარული" value={form.isFeatured ? "✔" : "❌"} />
      </div> */}
    </Styled.DevelopedProductBlueprint>
  );
}
