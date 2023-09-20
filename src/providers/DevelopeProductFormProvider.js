import { createContext, useContext } from "react";
import { useDevelopeProductQuery } from "hooks/api/moderate";

const DevelopeProductFormContext = createContext({
  isUpdating: false,
  registeredProductId: "",
  form: {
    control: "",
    watch: () => {},
    getValues: () => {},
  },
  sizeField: {
    fields: [],
    append: () => {},
    remove: () => {},
  },
  onSelect: ({ key, item }) => {},
  onMultipleSelect: ({ key, item }) => {},
  onAssetsChange: (reactEvent, fieldChangeEvent) => {},
  onRemoveAsset: (assetSrc) => {},
  onFrontThumbnailChange: (reactEvent, fieldChangeEvent) => {},
  onBackThumbnailChange: (reactEvent, fieldChangeEvent) => {},
  onMannequinChange: (reactEvent, fieldChangeEvent) => {},
  onModelVideoChange: (reactEvent, fieldChangeEvent) => {},
  onPlacingVideoChange: (reactEvent, fieldChangeEvent) => {},
  onPickUpVideoChange: (reactEvent, fieldChangeEvent) => {},
  onSubmit: (values) => {},
  status: {
    stage: "",
    loading: false,
    error: false,
    message: "",
  },
});

export default function DevelopeProductFormProvider({ children }) {
  const {
    isUpdating,
    registeredProductId,
    form,
    sizeField,
    onSelect,
    onMultipleSelect,
    onAssetsChange,
    onRemoveAsset,
    onFrontThumbnailChange,
    onBackThumbnailChange,
    onMannequinChange,
    onModelVideoChange,
    onPlacingVideoChange,
    onPickUpVideoChange,
    onSubmit,
    status,
  } = useDevelopeProductQuery();

  return (
    <DevelopeProductFormContext.Provider
      value={{
        isUpdating,
        registeredProductId,
        form,
        sizeField,
        onSelect,
        onMultipleSelect,
        onAssetsChange,
        onRemoveAsset,
        onFrontThumbnailChange,
        onBackThumbnailChange,
        onMannequinChange,
        onModelVideoChange,
        onPlacingVideoChange,
        onPickUpVideoChange,
        onSubmit,
        status,
      }}
    >
      {children}
    </DevelopeProductFormContext.Provider>
  );
}

export const useDevelopeProductProvider = () =>
  useContext(DevelopeProductFormContext);
