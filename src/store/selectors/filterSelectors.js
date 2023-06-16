export const selectActiveFilterDropdown = ({ filter }) =>
  filter.activeFilterDropdown;

export const selectFilters = ({ filter }) => ({
  productType: filter.productType,
  season: filter.season,
  texture: filter.texture,
  style: filter.style,
});
