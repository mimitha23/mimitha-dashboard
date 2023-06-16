import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sort: [{ label: "", query: "" }],
    productType: [{ label: "", query: "" }],
    season: [{ label: "", query: "" }],
    texture: [{ label: "", query: "" }],
    style: [{ label: "", query: "" }],

    activeFilterDropdown: "", // PRODUCT_TYPE - SORT - SEASON - TEXTURE - STYLE

    activeFilter: {
      sort: [],
      season: [],
      productType: [],
      texture: [],
      style: [],
    },
  },
  reducers: {
    setActiveFilter(state, { payload }) {
      const { filterType } = payload;
      state.activeFilterDropdown =
        state.activeFilterDropdown === filterType ? "" : filterType;
    },
  },
});

export default filterSlice.reducer;
export const { setActiveFilter } = filterSlice.actions;
