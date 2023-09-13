/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTextureValidation } from "utils/zod/moderate";

import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import * as textureSelectors from "store/selectors/moderate/textureSelectors";
import { textureActions } from "store/reducers/moderate/textureReducer";

export default function useTextureMutationQuery() {
  const dispatch = useDispatch();

  const status = useSelector(textureSelectors.selectTextureStatus);
  const textureDefaults = useSelector(textureSelectors.selectTextureForm);

  const formDefaults = {
    label_ka: textureDefaults.label_ka,
    label_en: textureDefaults.label_en,
  };

  const form = useForm({
    resolver: zodResolver(createTextureValidation),
    defaultValues: formDefaults,
  });

  const onSubmit = (values) =>
    textureDefaults.isUpdating
      ? dispatch(
          textureActions.updateTexture({
            data: values,
            updatingTextureId: textureDefaults.updatingTextureId,
          })
        )
      : dispatch(textureActions.createTexture({ data: values }));

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(textureActions.setStatusSuccess());
    }
  }, [status]);

  return {
    status,
    form,
    onSubmit,
    isUpdating: textureDefaults.isUpdating,
  };
}
