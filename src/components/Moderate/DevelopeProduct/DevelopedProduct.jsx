/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useDevelopeProductGetQuery } from "hooks/api/moderate/developeProduct";

import { Spinner } from "components/layouts";
import * as UI from "./components/DevelopedProduct";
import * as Styled from "./styles/DevelopedProduct.styled";

export default function DevelopedProduct() {
  const {
    registeredProductId,
    developedProductId,
    activeProductStatus: status,
    getActiveDevelopedProductQuery,
    activeProduct: product,
    resetActiveProduct,
  } = useDevelopeProductGetQuery();

  useEffect(() => {
    if (!registeredProductId || !developedProductId) return;

    getActiveDevelopedProductQuery();

    return () => {
      resetActiveProduct();
    };
  }, [registeredProductId, developedProductId]);

  return (
    <Styled.DevelopedProduct>
      <UI.CloseDevelopedProductButton />

      {!status.loading && product && (
        <main className="developed-product__main">
          <UI.DevelopedProductSlider assets={product.assets} />

          <UI.MultimediaDualBoxContainer title="პროდუქტის ხატულები">
            <UI.MultimediaBox type="image" src={product.thumbnails[0]} />
            <UI.MultimediaBox type="image" src={product.thumbnails[1]} />
          </UI.MultimediaDualBoxContainer>

          <UI.MultimediaDualBoxContainer title="პროდუქტის მანეკენი და მოდელი">
            <UI.MultimediaBox type="image" src={product.mannequin} />
            <UI.MultimediaBox type="video" src={product.modelVideo} />
          </UI.MultimediaDualBoxContainer>

          <UI.MultimediaDualBoxContainer title="პროდუქტის აღება/დადების ვიდეოები">
            <UI.MultimediaBox type="video" src={product.placingVideo} />
            <UI.MultimediaBox type="video" src={product.pickUpVideo} />
          </UI.MultimediaDualBoxContainer>

          <div className="developed-product__details">
            <UI.DevelopedProductCardDetailBlock
              label="რედაქტირებადი"
              value={product.product.isEditable ? "კი" : "არა"}
            />

            <UI.DevelopedProductCardDetailBlock
              label="საჯარო"
              value={product.isPublic ? "კი" : "არა"}
            />

            <UI.DevelopedProductCardDetailBlock
              label="რეიტინგი"
              value={product.rating}
            />

            <UI.DevelopedProductCardDetailBlock
              label="გაყიდულია"
              value={product.soldOut}
            />

            <UI.DevelopedProductCardDetailBlock
              label="მარაგშია"
              value={product.inStock}
            />

            <UI.DevelopedProductCardDetailBlock
              label="ზომები"
              value={product.size
                .map((size) =>
                  size.size ? `${size.size} - ${size.amount}` : ""
                )
                .join(" / ")}
            />

            <UI.DevelopedProductCardDetailBlock
              label="ფასდაკლება"
              value={product.sale ? "კი" : "არა"}
            />

            <UI.DevelopedProductCardDetailBlock
              label="ფასი"
              value={`${product.price}₾`}
            />

            <UI.DevelopedProductCardDetailBlock
              label="სახელი"
              value={product.title.ka}
            />

            <UI.DevelopedProductCardDetailBlock
              label="პროდუქტის ტიპი"
              value={product.product.productType.ka}
            />

            <UI.DevelopedProductCardDetailBlock
              label="სტილი"
              value={product.product.styles
                .map((style) => style.ka)
                .join(" / ")}
            />

            <UI.DevelopedProductCardDetailBlock
              label="სეზონი"
              value={product.product.seasons
                .map((season) => season.ka)
                .join(" / ")}
            />

            <UI.DevelopedProductCardDetailBlock
              label="სქესი"
              value={product.product.gender.ka}
            />

            <UI.DevelopedProductCardDetailBlock
              label="ფერი"
              value={product.color.ka}
            />

            <UI.DevelopedProductCardDetailBlock
              label="აღწერა"
              value={product.description.ka}
            />

            <UI.VariantDetails variants={product.variants} />

            <UI.TextureDetails textures={product.product.textures} />

            <UI.WarningDetails warnings={product.product.warnings} />

            <UI.DevelopedProductActions
              registeredProductId={registeredProductId}
              developedProductId={developedProductId}
            />
          </div>
        </main>
      )}

      {status.loading && <Spinner position="absolute" />}
    </Styled.DevelopedProduct>
  );
}
