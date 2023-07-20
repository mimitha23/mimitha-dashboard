/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllNavRoutes,
  selectNavRoutesStatus,
} from "store/selectors/app/navRoutesSelectors";

import { PATHS } from "config/routes";
import { useDebounceOnSearch } from "hooks/utils";
import { navRoutesActions } from "store/reducers/app/navigation/navRoutesReducer";

import {
  Search,
  LoadingSpinner,
  DeletionPopup,
  EditAndDeleteButtons,
} from "components/layouts";
import * as Styled from "./AllNavRoutes.styled";

export default function AllNavRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeDeletion, setActiveDeletion] = useState("");

  const status = useSelector(selectNavRoutesStatus);
  const allRoutes = useSelector(selectAllNavRoutes);

  const { filteredArray: filteredRoutes, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allRoutes,
      filterHandler: (route) =>
        route.ka.includes(search) || route.en.includes(search),
    });

  function onDelete() {
    dispatch(navRoutesActions.deleteNavRoute(activeDeletion));
    setActiveDeletion("");
  }

  function onEdit(route) {
    dispatch(navRoutesActions.setNavRouteDefaults(route));
    navigate(PATHS.app_sidebar.createNavRoutePage.absolutePath);
  }

  useEffect(() => {
    dispatch(navRoutesActions.getAllNavRoute());

    return () => {
      dispatch(navRoutesActions.resetAllNavRoutes());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allRoutes]);

  return (
    <Styled.AllNavRoutes>
      <div>
        <Search
          placeholder="მოძებნე ნავიგაციის კურსი..."
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
        />
      </div>

      {!status.loading && (
        <ul className="routes-list">
          {filteredRoutes.map((route) => (
            <li key={route._id} className="routes-list__item">
              <div className="routes-list__item-details">
                <p>
                  <span>ka:</span>
                  &nbsp;
                  <span>{route.ka}</span>
                </p>

                <p>
                  <span>en:</span>
                  &nbsp;
                  <span>{route.en}</span>
                </p>

                <EditAndDeleteButtons
                  onEdit={() => onEdit(route)}
                  onDelete={() => setActiveDeletion(route._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="ნავიგაციის კურსი"
          onClose={() => setActiveDeletion("")}
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.AllNavRoutes>
  );
}
