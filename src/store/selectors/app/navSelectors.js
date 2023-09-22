import { createSelector } from "@reduxjs/toolkit";

const selectedNavStatus = ({ nav }) => ({
  loading: nav.status.loading,
  error: nav.status.error,
  message: nav.status.message,
});

const selectedNav = ({ nav }) => ({
  men: nav.nav.men,
  women: nav.nav.women,
  adult: nav.nav.adult,
  family: nav.nav.family,
});

export const selectNavStatus = createSelector(
  [selectedNavStatus],
  (status) => status
);

export const selectNav = createSelector(selectedNav, (nav) => nav);
