import { Controller } from "react-hook-form";
import { useCreateNavRouteQuery } from "hooks/api/app";

import { LoadingSpinner } from "components/layouts";
import { Button } from "components/layouts/Form";
import SubCategoryListItem from "./components/SubCategoryListItem";
import AddSubCategoryButton from "./components/AddSubCategoryButton";
import RoutesListItem from "./components/RoutesListItem";
import NavListItem from "./components/NavListItem";
import * as Styled from "./EditNav.styled";

export default function EditNav() {
  const {
    form,
    onAddSubCategory,
    onRemoveSubCategory,
    onAddRoute,
    onRemoveRoute,
    saveNavRouteQuery,
    status,
  } = useCreateNavRouteQuery();

  const navBaseBlocks = Object.keys(form.getValues());

  return (
    <Styled.EditNav onSubmit={form.handleSubmit(saveNavRouteQuery)}>
      <ul className="edit-nav__list">
        {navBaseBlocks.map((key) => (
          <Controller
            key={`base-nav-blocks__${key}`}
            control={form.control}
            name={key}
            render={({ field, fieldState: { error } }) => (
              <NavListItem title={field.value.category}>
                {field.value.blocks[0] && (
                  <ul className="edit-nav__blocks-list">
                    {field.value.blocks.map((subCategory, subCategoryIndex) => (
                      <SubCategoryListItem
                        key={subCategory._id}
                        form={{
                          control: form.control,
                          name: `${key}.blocks.${subCategoryIndex}.title`,
                        }}
                        onAddCategory={(e) => {
                          e.preventDefault();
                          onAddSubCategory(key, subCategoryIndex);
                        }}
                        onRemoveCategory={(e) => {
                          e.preventDefault();
                          onRemoveSubCategory(key, subCategoryIndex);
                        }}
                      >
                        {subCategory.routes[0] && (
                          <ul className="routes-box__list">
                            {subCategory.routes.map((route, routeIndex) => (
                              <RoutesListItem
                                key={route._id}
                                form={{
                                  control: form.control,
                                  name: `${key}.blocks.${subCategoryIndex}.routes.${routeIndex}`,
                                }}
                                onAddRoute={(e) => {
                                  e.preventDefault();
                                  onAddRoute(key, subCategoryIndex, routeIndex);
                                }}
                                onRemoveRoute={(e) => {
                                  e.preventDefault();
                                  onRemoveRoute(
                                    key,
                                    subCategoryIndex,
                                    routeIndex
                                  );
                                }}
                              />
                            ))}
                          </ul>
                        )}
                      </SubCategoryListItem>
                    ))}
                  </ul>
                )}

                {!field.value.blocks[0] && (
                  <AddSubCategoryButton
                    onClick={(e) => {
                      e.preventDefault();
                      onAddSubCategory(key, 0);
                    }}
                  />
                )}
              </NavListItem>
            )}
          />
        ))}
      </ul>

      {status.loading && <LoadingSpinner />}

      <Button caption="შეინახე ნავიგაცია" type="submit" />
    </Styled.EditNav>
  );
}
