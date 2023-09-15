/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useReactHookForm } from "hooks/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { developeProductValidation } from "utils/zod/moderate";

import { FileChange } from "utils";
import { customValidators } from "utils/zod/helpers/customValidators";

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

  const formDefaults = {
    title_ka: developeProductFormDefaults.title_ka,
    title_en: developeProductFormDefaults.title_en,
    price: developeProductFormDefaults.price,
    color: developeProductFormDefaults.color,
    sizes: developeProductFormDefaults.sizes,
    variants: developeProductFormDefaults.variants,
    description_ka: developeProductFormDefaults.description_ka,
    description_en: developeProductFormDefaults.description_en,
    is_public: developeProductFormDefaults.is_public,
    is_featured: developeProductFormDefaults.is_featured,
    // media properties
    // 1. assets
    assets: developeProductFormDefaults.assets,
    new_assets: [],
    assets_to_delete: [],
    // 2. thumbnails
    thumbnails: developeProductFormDefaults.thumbnails,
    new_thumbnails: ["", ""],
    thumbnails_to_delete: [],
    // 3. mannequin
    mannequin: developeProductFormDefaults.mannequin,
    new_mannequin: "",
    // 4. model
    model_video: developeProductFormDefaults.model_video,
    new_model_video: "",
    // 5. simulation videos
    simulation_video_placing:
      developeProductFormDefaults.simulation_video_placing,
    new_simulation_video_placing: "",
    simulation_video_pick_up:
      developeProductFormDefaults.simulation_video_pick_up,
    new_simulation_video_pick_up: "",
  };

  const form = useForm({
    resolver: zodResolver(developeProductValidation),
    defaultValues: formDefaults,
  });

  const {
    onSelect,
    onBase64FileChange,
    onVideoFileChange,
    onMultipleSelect: multipleSelect,
    onBase64MultipleFileChange: onMultipleFileChangeEvent,
  } = useReactHookForm(form);

  const onAssetsChange = onMultipleFileChangeEvent({
    formPropertyName: "new_assets",
  });

  const onRemoveAsset = (assetSrc) => {
    if (customValidators.isValidBase64ImageStr.validator(assetSrc)) {
      const existingAssets = form.getValues("new_assets");
      form.setValue(
        "new_assets",
        existingAssets.filter((asset) => asset !== assetSrc)
      );
    } else if (customValidators.isURL.validator(assetSrc)) {
      console.log("isUrl");
    } else {
      console.log("not base64 not url");
    }
  };

  const onThumbnailChange = async ({ index, reactEvent }) => {
    try {
      const file = reactEvent.target.files[0];

      const { hasError, base64Str } = await FileChange.generateBase64Str({
        file,
        fileType: "image/",
      });

      if (hasError) {
        throw new Error(
          "თქვენს მიერ მითითებული მედია ფაილები არ არის ვალიდური"
        );
      }

      const existingThumbnails = form.getValues("new_thumbnails");

      form.setValue(
        "new_thumbnails",
        index === 0
          ? [base64Str, existingThumbnails[1]]
          : index === 1
          ? [existingThumbnails[0], base64Str]
          : existingThumbnails
      );
    } catch (error) {
      form.setError("new_thumbnails", error.message);
    }
  };

  const onMannequinChange = onBase64FileChange({
    formPropertyName: "new_mannequin",
  });

  const onModelVideoChange = onVideoFileChange({
    formPropertyName: "new_model_video",
  });

  const onPlacingVideoChange = onVideoFileChange({
    formPropertyName: "new_simulation_video_placing",
  });

  const onPickUpVideoChange = onVideoFileChange({
    formPropertyName: "new_simulation_video_pick_up",
  });

  const sizeField = useFieldArray({
    control: form.control,
    name: "sizes",
  });

  const variantField = useFieldArray({
    control: form.control,
    name: "variants",
  });

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
    onAssetsChange,
    onRemoveAsset,
    onThumbnailChange,
    onMannequinChange,
    onModelVideoChange,
    onPlacingVideoChange,
    onPickUpVideoChange,
    status,
    registeredProductId,
    isUpdating: developeProductFormDefaults.isUpdating,
    onSubmit,
  };
}
