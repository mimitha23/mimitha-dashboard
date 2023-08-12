/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  selectDevelopedProduct,
  selectSingleDevelopeProductStatus,
} from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { Spinner } from "components/layouts";
import {
  VariantDetails,
  TextureDetails,
  WarningDetails,
  DevelopedProductSlider,
  DevelopedProductActions,
  CloseDevelopedProductButton,
  DevelopedProductCardDetailBlock,
} from "./components/DevelopedProduct";
import * as Styled from "./styles/DevelopedProduct.styled";

export default function DevelopedProduct() {
  const dispatch = useDispatch();

  const { registeredProductId, developedProductId } = useParams();

  const status = useSelector(selectSingleDevelopeProductStatus);
  const product = useSelector(selectDevelopedProduct);

  useEffect(() => {
    if (!registeredProductId || !developedProductId) return;

    dispatch(
      developeProductActions.getDevelopedProduct({
        registeredProductId,
        developedProductId,
      })
    );

    return () => {
      dispatch(developeProductActions.resetDevelopedProduct());
    };
  }, [registeredProductId, developedProductId]);

  return (
    <Styled.DevelopedProduct>
      <CloseDevelopedProductButton />

      {!status.loading && product && (
        <main className="developed-product__main">
          <DevelopedProductSlider assets={product.assets} />

          <div className="developed-product__details">
            <DevelopedProductCardDetailBlock
              label="რედაქტირებადი"
              value={product.product.isEditable ? "კი" : "არა"}
            />

            <DevelopedProductCardDetailBlock
              label="საჯარო"
              value={product.isPublic ? "კი" : "არა"}
            />

            <DevelopedProductCardDetailBlock
              label="რეიტინგი"
              value={product.rating}
            />

            <DevelopedProductCardDetailBlock
              label="გაყიდულია"
              value={product.soldOut}
            />

            <DevelopedProductCardDetailBlock
              label="მარაგშია"
              value={product.inStock}
            />

            <DevelopedProductCardDetailBlock
              label="ზომები"
              value={product.size
                .map((size) =>
                  size.size ? `${size.size} - ${size.amount}` : ""
                )
                .join(" / ")}
            />

            <DevelopedProductCardDetailBlock
              label="ფასდაკლება"
              value={product.sale ? "კი" : "არა"}
            />

            <DevelopedProductCardDetailBlock
              label="ფასი"
              value={`${product.price}₾`}
            />

            <DevelopedProductCardDetailBlock
              label="სახელი"
              value={product.title.ka}
            />

            <DevelopedProductCardDetailBlock
              label="პროდუქტის ტიპი"
              value={product.product.productType.ka}
            />

            <DevelopedProductCardDetailBlock
              label="სტილი"
              value={product.product.styles
                .map((style) => style.ka)
                .join(" / ")}
            />

            <DevelopedProductCardDetailBlock
              label="სეზონი"
              value={product.product.seasons
                .map((season) => season.ka)
                .join(" / ")}
            />

            <DevelopedProductCardDetailBlock
              label="სქესი"
              value={product.product.gender.ka}
            />

            <DevelopedProductCardDetailBlock
              label="ფერი"
              value={product.color.ka}
            />

            <DevelopedProductCardDetailBlock
              label="აღწერა"
              value={product.description.ka}
            />

            <VariantDetails variants={product.variants} />

            <TextureDetails textures={product.product.textures} />

            <WarningDetails warnings={product.product.warnings} />

            <DevelopedProductActions
              registeredProductId={registeredProductId}
              developedProductId={developedProductId}
              product={product}
            />
          </div>
        </main>
      )}

      {status.loading && <Spinner position="absolute" />}
    </Styled.DevelopedProduct>
  );
}
