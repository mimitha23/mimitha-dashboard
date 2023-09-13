import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";

import ImageFilesReview from "./ImageFilesReview";
import DetailsBlock from "./DetailsBlock";
import MediaDualBox from "./MediaDualBox";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default function DevelopedProductBlueprint() {
  const form = useSelector(selectDevelopeProductForm);

  const [size, setSize] = useState({
    size: "",
    inStock: "",
  });

  useEffect(() => {
    if (!form.sizes[0]) return;

    const sizeStr = form.sizes
      .map((size) => (size.size.ka ? `${size.size.ka} - ${size.amount}` : ""))
      .join(" / ");

    const inStock = form.sizes.reduce(
      (acc, size) => acc + parseFloat(size.amount),
      0
    );

    setSize((prev) => ({
      ...prev,
      size: sizeStr,
      inStock,
    }));
  }, [form.sizes]);

  return (
    <Styled.DevelopedProductBlueprint>
      <ImageFilesReview assets={[]} />

      <MediaDualBox
        title="პროდუქტის ხატულები"
        firstChild={{
          src: "",
          type: "image",
          message: "პროდუქტის წინა მხარე",
          id: "product-thumbnail--front",
          // src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw14qbKDfS2PeLdAL26F7zyv5Tk3_TyzwvBQ&usqp=CAU",
        }}
        secondChild={{
          src: "",
          type: "image",
          message: "პროდუქტის უკანა მხარე",
          id: "product-thumbnail--back",
          // src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw14qbKDfS2PeLdAL26F7zyv5Tk3_TyzwvBQ&usqp=CAU",
        }}
      />

      <MediaDualBox
        title="პროდუქტის მანეკენი და მოდელი"
        firstChild={{
          src: "",
          type: "image",
          message: "მანეკენი",
          id: "product-mannequin",
          // src: "https://moremannequins.co.uk/c/47-Niara_category/female-mannequins-aegon.jpg",
        }}
        secondChild={{
          src: "",
          type: "video",
          message: "მოდელი",
          id: "product-model",
          // src: "https://cdn.coverr.co/videos/coverr-woman-posing-in-front-of-blue-wall-3845/1080p.mp4",
        }}
      />

      <MediaDualBox
        title="პროდუქტის კონფიგურატორი (აღება და დადება)"
        firstChild={{
          src: "",
          type: "video",
          message: "პროდუქტის დადება",
          id: "product-config-take-down",
          // src: "https://cdn.coverr.co/videos/coverr-woman-posing-in-front-of-blue-wall-3845/1080p.mp4",
        }}
        secondChild={{
          src: "",
          type: "video",
          message: "პროდუქტის აღება",
          id: "product-config-take-up",
          // src: "https://cdn.coverr.co/videos/coverr-woman-posing-in-front-of-blue-wall-3845/1080p.mp4",
        }}
      />

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
