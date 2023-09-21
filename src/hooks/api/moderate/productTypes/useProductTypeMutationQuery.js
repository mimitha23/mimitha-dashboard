/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductTypeValidation } from "utils/zod/moderate";

import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import * as productTypeSelectors from "store/selectors/moderate/productTypeSelectors";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";

export default function useProductTypeMutationQuery() {
  const dispatch = useDispatch();

  const status = useSelector(productTypeSelectors.selectProductTypeStatus);
  const productTypeDefaults = useSelector(
    productTypeSelectors.selectProductTypeForm
  );

  const formDefaults = {
    label_ka: productTypeDefaults.label_ka,
    label_en: productTypeDefaults.label_en,
  };

  const form = useForm({
    resolver: zodResolver(createProductTypeValidation),
    defaultValues: formDefaults,
  });

  const onSubmit = (values) =>
    productTypeDefaults.isUpdating
      ? dispatch(
          productTypeActions.updateProductType({
            data: values,
            updatingProductTypeId: productTypeDefaults.updatingProductTypeId,
          })
        )
      : dispatch(productTypeActions.createProductType({ data: values }));

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(productTypeActions.setStatusSuccess());
    }
  }, [status]);

  return { status, form, onSubmit, isUpdating: productTypeDefaults.isUpdating };
}
