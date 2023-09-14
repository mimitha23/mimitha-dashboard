/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVariantValidation } from "utils/zod/moderate";
import { useReactHookForm } from "hooks/utils";

import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import { variantActions } from "store/reducers/moderate/variantReducer";
import * as variantSelectors from "store/selectors/moderate/variantSelectors";

export default function useVariantMutationQuery() {
  const dispatch = useDispatch();

  const status = useSelector(variantSelectors.selectVariantStatus);
  const variantDefaults = useSelector(variantSelectors.selectVariantForm);

  const formDefaults = {
    variant_type: variantDefaults.variant_type,
    label_ka: variantDefaults.label_ka,
    label_en: variantDefaults.label_en,
    description_ka: variantDefaults.description_ka,
    description_en: variantDefaults.description_en,
    icon: variantDefaults.icon,
    new_icon: variantDefaults.new_icon,
  };

  const form = useForm({
    resolver: zodResolver(createVariantValidation),
    defaultValues: formDefaults,
  });

  const { onFileChange: onFileChangeEvent } = useReactHookForm(form);

  const onFileChange = onFileChangeEvent({
    formPropertyName: "new_icon",
    fileType: "image/svg+xml",
  });

  function onSelectVariant(variant) {
    const f = form.getValues();

    form.setValue("variant_type", {
      ...f.variant_type,
      ...variant,
    });
    form.setValue("label_ka", variant?.label_ka || f.label_ka || "");
    form.setValue("label_en", variant?.label_en || f.label_en || "");
  }

  const onSubmit = (values) =>
    variantDefaults.isUpdating
      ? dispatch(
          variantActions.updateVariant({
            data: values,
            updatingVariantId: variantDefaults.updatingVariantId,
          })
        )
      : dispatch(variantActions.createVariant({ data: values }));

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(variantActions.setStatusSuccess());
    }
  }, [status]);

  return {
    form,
    onFileChange,
    onSelectVariant,
    onSubmit,
    isUpdating: variantDefaults.isUpdating,
    status,
  };
}
