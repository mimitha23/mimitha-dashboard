/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectNavStatus, selectNav } from "store/selectors/app/navSelectors";
import { navActions } from "store/reducers/app/navigation/navReducer";
import { navRoutesActions } from "store/reducers/app/navigation/navRoutesReducer";

import { LoadingSpinner } from "components/layouts";
import SubCategoryListItem from "./components/SubCategoryListItem";
import AddSubCategoryButton from "./components/AddSubCategoryButton";
import RoutesListItem from "./components/RoutesListItem";
import NavListItem from "./components/NavListItem";
import * as Styled from "./EditNav.styled";

export default function EditNav() {
  const dispatch = useDispatch();

  const status = useSelector(selectNavStatus);
  const nav = useSelector(selectNav);

  function onAddCategory(blockId) {
    dispatch(
      navActions.addSubCategory({
        blockId,
        placeAfterIndex: 0,
      })
    );
  }

  useEffect(() => {
    dispatch(navActions.getNav());
    dispatch(navRoutesActions.getAllNavRoute());

    return () => {
      dispatch(navActions.resetState());
      dispatch(navRoutesActions.resetAllNavRoutes());
    };
  }, []);

  return (
    <Styled.EditNav>
      <ul className="edit-nav__list">
        {nav.map((navCategory) => (
          <NavListItem title={navCategory.category} key={navCategory._id}>
            {navCategory.blocks[0] && (
              <ul className="edit-nav__blocks-list">
                {navCategory.blocks.map((subCategory) => (
                  <SubCategoryListItem
                    key={subCategory._id}
                    categoryId={navCategory._id}
                    subCategoryId={subCategory._id}
                  >
                    {subCategory.routes[0] && (
                      <ul className="routes-box__list">
                        {subCategory.routes.map((route) => (
                          <RoutesListItem
                            key={route._id}
                            route={route}
                            categoryId={navCategory._id}
                            subCategoryId={subCategory._id}
                          />
                        ))}
                      </ul>
                    )}
                  </SubCategoryListItem>
                ))}
              </ul>
            )}

            {!navCategory.blocks[0] && (
              <AddSubCategoryButton
                onClick={() => onAddCategory(navCategory._id)}
              />
            )}
          </NavListItem>
        ))}
      </ul>

      {status.loading && <LoadingSpinner />}
    </Styled.EditNav>
  );
}
