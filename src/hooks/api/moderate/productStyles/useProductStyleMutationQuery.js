/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductStyleValidation } from "utils/zod/moderate";

import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import * as productStyleSelectors from "store/selectors/moderate/productStyleSelectors";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";

export default function useProductStyleMutationQuery() {
  const dispatch = useDispatch();

  const status = useSelector(productStyleSelectors.selectProductStyleStatus);
  const productStyleDefaults = useSelector(
    productStyleSelectors.selectProductStyleForm
  );

  const formDefaults = {
    label_ka: productStyleDefaults.label_ka,
    label_en: productStyleDefaults.label_en,
  };

  const form = useForm({
    resolver: zodResolver(createProductStyleValidation),
    defaultValues: formDefaults,
  });

  const onSubmit = (values) =>
    productStyleDefaults.isUpdating
      ? dispatch(
          productStyleActions.updateProductStyle({
            data: values,
            updatingProductStyleId: productStyleDefaults.updatingProductStyleId,
          })
        )
      : dispatch(productStyleActions.createProductStyle({ data: values }));

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(productStyleActions.setStatusSuccess());
    }
  }, [status]);

  return {
    status,
    form,
    onSubmit,
    isUpdating: productStyleDefaults.isUpdating,
  };
}
