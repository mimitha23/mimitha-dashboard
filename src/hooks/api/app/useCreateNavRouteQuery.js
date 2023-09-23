/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientNavigationValidation } from "utils/zod/app/clientNavigation/editClientNavigationValidation";

import { navActions } from "store/reducers/app/navigation/navReducer";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";
import { selectNav, selectNavStatus } from "store/selectors/app/navSelectors";

export default function useCreateNavRouteQuery() {
  const dispatch = useDispatch();

  const navDefaults = useSelector(selectNav);
  const status = useSelector(selectNavStatus);

  const formDefaults = {
    men: navDefaults.men,
    women: navDefaults.women,
    adult: navDefaults.adult,
    family: navDefaults.family,
  };

  const form = useForm({
    resolver: zodResolver(clientNavigationValidation),
    defaultValues: formDefaults,
  });

  useEffect(() => {
    form.reset(formDefaults);
  }, [navDefaults]);

  const onAddSubCategory = (category, subCategoryIndex) => {
    const existingBlock = form.getValues(category);
    const blockShallowCopy = [...existingBlock.blocks];

    const newBlock = {
      _id: nanoid(),
      title: { ka: "", en: "" },
      routes: [{ _id: nanoid(), ka: "", en: "", query: "", caption: "" }],
    };
    blockShallowCopy.splice(subCategoryIndex + 1, 0, newBlock);

    form.setValue(category, {
      ...existingBlock,
      blocks: blockShallowCopy,
    });
  };

  const onRemoveSubCategory = (category, subCategoryIndex) => {
    const existingBlock = form.getValues(category);
    const blockShallowCopy = [...existingBlock.blocks];

    if (blockShallowCopy.length === 1) return;

    blockShallowCopy.splice(subCategoryIndex, 1);

    form.setValue(category, {
      ...existingBlock,
      blocks: blockShallowCopy,
    });
  };

  const onAddRoute = (category, subCategoryIndex, routeIndex) => {
    const existingBlock = form.getValues(category);
    const routesShallowCopy = [
      ...existingBlock.blocks[subCategoryIndex].routes,
    ];

    const newRoute = { _id: nanoid(), ka: "", en: "", query: "", caption: "" };
    routesShallowCopy.splice(routeIndex + 1, 0, newRoute);

    form.setValue(category, {
      ...existingBlock,
      blocks: existingBlock.blocks.map((block, index) => {
        if (index === subCategoryIndex)
          return {
            ...block,
            routes: routesShallowCopy,
          };
        else return block;
      }),
    });
  };

  const onRemoveRoute = (category, subCategoryIndex, routeIndex) => {
    const existingBlock = form.getValues(category);
    const routesShallowCopy = [
      ...existingBlock.blocks[subCategoryIndex].routes,
    ];

    if (routesShallowCopy.length === 1) return;

    routesShallowCopy.splice(routeIndex, 1);

    form.setValue(category, {
      ...existingBlock,
      blocks: existingBlock.blocks.map((block, index) => {
        if (index === subCategoryIndex)
          return {
            ...block,
            routes: routesShallowCopy,
          };
        else return block;
      }),
    });
  };

  // console.log(form.watch());

  function saveNavRouteQuery(values) {
    dispatch(navActions.saveNav(values));
  }

  useEffect(() => {
    dispatch(navActions.getNav());
    dispatch(productTypeActions.getAllProductTypes());

    return () => {
      dispatch(navActions.resetState());
      dispatch(productTypeActions.resetAllProductTypes());
    };
  }, []);

  return {
    form,
    onAddSubCategory,
    onRemoveSubCategory,
    onAddRoute,
    onRemoveRoute,
    status,
    saveNavRouteQuery,
  };
}
