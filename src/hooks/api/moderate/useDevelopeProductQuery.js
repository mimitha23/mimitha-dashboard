/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useReactHookForm } from "hooks/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { developeProductValidation } from "utils/zod/moderate";

import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import * as developeProductSelectors from "store/selectors/moderate/developeProductSelectors";

export default function useDevelopeProductQuery() {
  const dispatch = useDispatch();

  const { registeredProductId } = useParams();

  const status = useSelector(
    developeProductSelectors.selectDevelopeProductStatus
  );

  const developeProductFormDefaults = useSelector(
    developeProductSelectors.selectDevelopeProductForm
  );

  const form = useForm({
    resolver: zodResolver(developeProductValidation),
    defaultValues: {
      title_ka: "",
      title_en: "",
      price: "",
      color: {
        ka: "",
        en: "",
        _id: "",
        caption: "",
      },
      sizes: [
        {
          amount: "",
          size: {
            ka: "",
            en: "",
            _id: "",
            caption: "",
          },
        },
      ],
      variants: [],
      description_ka: "",
      description_en: "",
      is_public: "",
      is_featured: "",
      assets: [],
      new_assets: [],
      assets_to_delete: [],
    },
  });

  const sizeField = useFieldArray({
    control: form.control,
    name: "sizes",
  });

  const variantField = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const { onSelect, onMultipleSelect: multipleSelect } = useReactHookForm(form);

  function onMultipleSelect({ key, item }) {
    switch (key) {
      case "variants":
        multipleSelect({ key, item, field: variantField });
        break;
      default:
        break;
    }
  }

  function onSubmit(values) {
    console.log(values);
    // credentials.isUpdating
    //   ? dispatch(
    //       developeProductActions.updateDevelopedProduct({
    //         ...checkedData,
    //         registeredProductId,
    //       })
    //     )
    //   : dispatch(
    //       developeProductActions.attachDevelopedProduct({
    //         ...checkedData,
    //         registeredProductId,
    //       })
    //     );
  }

  useEffect(() => {
    dispatch(developeProductActions.getDevelopeProductFormSuggestions());

    return () => {
      dispatch(developeProductActions.resetState());
    };
  }, []);

  return {
    form,
    sizeField,
    onSelect,
    onMultipleSelect,
    status,
    registeredProductId,
    isUpdating: developeProductFormDefaults.isUpdating,
  };
}
