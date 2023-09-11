/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerProductValidation } from "utils/zod/moderate";

import { generateBase64Str } from "utils";
import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";

export default function useRegisterProductQuery() {
  const dispatch = useDispatch();

  const status = useSelector(
    registerProductSelectors.selectRegisterProductStatus
  );

  const registerProductDefaults = useSelector(
    registerProductSelectors.selectRegisterProductForm
  );

  const formDefaults = {
    isEditable: false,
    thumbnail: "",
    productTypes: {
      _id: "",
      ka: "",
      en: "",
      query: "",
      caption: "",
    },
    gender: {
      _id: "",
      ka: "",
      en: "",
      query: "",
      caption: "",
    },
    category: {
      _id: "",
      ka: "",
      en: "",
      query: "",
      caption: "",
    },
  };

  const form = useForm({
    resolver: zodResolver(registerProductValidation),
    defaultValues: formDefaults,
  });

  async function onFileChange(reactEvent, fieldChangeEvent) {
    const file = reactEvent.target.files[0];

    const { hasError, base64Str } = await generateBase64Str({
      file,
      fileType: "image/",
    });

    if (hasError)
      return form.setError(
        "thumbnail",
        "ფაილის ნიშნული უნდა წარმოადგენდეს ვალიდურ ფაილს"
      );

    fieldChangeEvent(base64Str);
  }

  function onSelect({ key, item }) {
    const f = form.getValues();
    form.setValue(key, { ...f[key], ...item });
  }

  const onSubmit = (values) => {
    console.log(values);
    // registerProductDefaults.isUpdating
    //   ? dispatch(
    //       registerProductActions.updateRegisteredProduct({
    //         data: values,
    //         updatingRegisteredProductId:
    //           registerProductDefaults.updatingRegisteredProductId,
    //       })
    //     )
    //   : dispatch(registerProductActions.registerProduct({ data: values }));
  };

  useEffect(() => {
    if (status.stage === REQUEST_STATUS_STAGE.SUCCESS) {
      form.reset(formDefaults);
      dispatch(registerProductActions.setStatusSuccess());
    }
  }, [status]);

  return { form, onSelect, onFileChange, onSubmit, status };
}
