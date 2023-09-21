/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { registerProductValidation } from "utils/zod/moderate";

import { useReactHookForm } from "hooks/utils";
import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";

export default function useRegisterProductMutationQuery() {
  const dispatch = useDispatch();

  const status = useSelector(
    registerProductSelectors.selectRegisterProductStatus
  );

  const registerProductDefaults = useSelector(
    registerProductSelectors.selectRegisterProductForm
  );

  const formDefaults = {
    isEditable: registerProductDefaults.isEditable,
    thumbnail: registerProductDefaults.thumbnail,
    newThumbnail: registerProductDefaults.newThumbnail,
    productTypes: registerProductDefaults.productTypes,
    gender: registerProductDefaults.gender,
    category: registerProductDefaults.category,
    productStyles: registerProductDefaults.productStyles,
    seasons: registerProductDefaults.seasons,
    textures: registerProductDefaults.textures,
    warnings: registerProductDefaults.warnings,
  };

  const form = useForm({
    resolver: zodResolver(registerProductValidation),
    defaultValues: formDefaults,
  });

  const {
    onSelect,
    onBase64FileChange: onFileChangeEvent,
    onMultipleSelect: multipleSelect,
  } = useReactHookForm(form);

  const styleField = useFieldArray({
    control: form.control,
    name: "productStyles",
  });

  const seasonsField = useFieldArray({
    control: form.control,
    name: "seasons",
  });

  const textureField = useFieldArray({
    control: form.control,
    name: "textures",
  });

  const warningField = useFieldArray({
    control: form.control,
    name: "warnings",
  });

  const onFileChange = onFileChangeEvent({ formPropertyName: "thumbnail" });

  function onMultipleSelect({ key, item }) {
    switch (key) {
      case "productStyles":
        multipleSelect({ key, item, field: styleField });
        break;
      case "seasons":
        multipleSelect({ key, item, field: seasonsField });
        break;
      default:
        break;
    }
  }

  const onSubmit = (values) => {
    registerProductDefaults.isUpdating
      ? dispatch(
          registerProductActions.updateRegisteredProduct({
            data: values,
            updatingRegisteredProductId:
              registerProductDefaults.updatingRegisteredProductId,
          })
        )
      : dispatch(registerProductActions.registerProduct({ data: values }));
  };

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(registerProductActions.setStatusSuccess());
    }
  }, [status]);

  useEffect(() => {
    dispatch(registerProductActions.getRegisterProductFormSuggestions());

    return () => {
      dispatch(registerProductActions.resetState());
    };
  }, []);

  return {
    form,
    onSelect,
    onMultipleSelect,
    onFileChange,
    textureField,
    warningField,
    onSubmit,
    status,
    isUpdating: registerProductDefaults.isUpdating,
  };
}
