import React, { useCallback, useState } from "react";

const useOnChange = (initial: string) => {
  const [value, setValue] = useState<string>(initial);

  const onChange = useCallback(
    (term: string) => {
      setValue(term);
    },
    [setValue]
  );

  return { value, setValue, onChange };
};

export default useOnChange;
