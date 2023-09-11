/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createColorValidation } from "utils/zod/moderate";

import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import { colorActions } from "store/reducers/moderate/colorReducer";
import * as colorSelectors from "store/selectors/moderate/colorSelectors";

export default function useColorMutationQuery() {
  const dispatch = useDispatch();

  const status = useSelector(colorSelectors.selectColorStatus);
  const colorDefaults = useSelector(colorSelectors.selectColorForm);

  const formDefaults = {
    color_ka: colorDefaults.color_ka || "",
    color_en: colorDefaults.color_en || "",
    color_hex: colorDefaults.color_hex || "",
  };

  const form = useForm({
    resolver: zodResolver(createColorValidation),
    defaultValues: formDefaults,
  });

  const onSubmit = (values) =>
    colorDefaults.isUpdating
      ? dispatch(
          colorActions.updateColor({
            data: values,
            updatingColorId: colorDefaults.updatingColorId,
          })
        )
      : dispatch(colorActions.createColor({ data: values }));

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(colorActions.setStatusSuccess());
    }
  }, [status]);

  return {
    form,
    status,
    onSubmit,
    isUpdating: colorDefaults.isUpdating,
  };
}
