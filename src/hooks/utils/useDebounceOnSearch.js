/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

/**
 * debounce filter on search
 */
export default function useDebounceOnSearch({ search, array, filterHandler }) {
  const [filteredArray, setFilteredArray] = useState([]);

  function setDefaultArray() {
    setFilteredArray(array);
  }

  useEffect(() => {
    if (!search) return setFilteredArray(array);

    const timeoutId = setTimeout(() => {
      setFilteredArray(() => {
        return array.filter(filterHandler);
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return { filteredArray, setDefaultArray };
}
