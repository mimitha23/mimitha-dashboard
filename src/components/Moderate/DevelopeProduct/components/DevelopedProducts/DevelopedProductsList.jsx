/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDebounceOnSearch } from "hooks/utils";
import { selectAllDevelopedProducts } from "store/selectors/moderate/developeProductSelectors";

import { Search } from "components/layouts";
import DevelopedProductCard from "./DevelopedProductCard";
import * as Styled from "./styles/DevelopedProductsList.styled";

export default function DevelopedProductsList({ onDelete, onEdit, status }) {
  const allDevelopedProducts = useSelector(selectAllDevelopedProducts);

  const [search, setSearch] = useState("");
  const { filteredArray: filteredProducts, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allDevelopedProducts,
      filterHandler: (product) =>
        product.title.ka.includes(search) ||
        product.title.en.includes(search) ||
        product.color.ka.includes(search) ||
        product.color.en.includes(search) ||
        product.description.ka.includes(search) ||
        product.description.en.includes(search),
    });

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allDevelopedProducts]);

  return (
    <Styled.DevelopedProductsList>
      <Search
        value={search}
        onSearch={(e) => setSearch(e.target.value)}
        placeholder="მოძებნე პროდუქტი..."
      />

      <ul className="developed-products__list">
        {filteredProducts.map((product) => (
          <DevelopedProductCard
            key={product._id}
            product={product}
            onDelete={() => onDelete(product._id)}
            onEdit={() => onEdit(product)}
          />
        ))}
      </ul>
    </Styled.DevelopedProductsList>
  );
}
