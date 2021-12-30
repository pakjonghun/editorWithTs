import { useState } from "react";
const useInnerWidth = (initial: number) => {
  const [innerWidth, setInnerWidth] = useState<number>(initial);

  return { innerWidth, setInnerWidth };
};

export default useInnerWidth;
