import { SearchIcon } from "components/layouts/Icons";
import * as Styled from "./styles/Search.styled";

export default function Search({ value, onSearch }) {
  return (
    <Styled.Search>
      <input
        type="text"
        className="moderate-search--input"
        name="color_search"
        placeholder="მოძებნე ფერი..."
        value={value}
        onChange={onSearch}
      />
      <span className="moderate-search--icon">
        <SearchIcon />
      </span>
    </Styled.Search>
  );
}
