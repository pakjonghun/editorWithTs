import { useState, useEffect } from "react";

type initialProps = {
  initialWidth?: number;
  initialHeight?: number;
};

const useAutoWidth = ({
  initialWidth = window.innerWidth,
  initialHeight = window.innerHeight,
}: initialProps) => {
  const [width, setWidth] = useState<number>(initialWidth);
  const [height, setHeight] = useState<number>(initialHeight);

  function getCurWidhtAndHeight() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    let timer: any;
    function dbounce(func: Function) {
      return function () {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          getCurWidhtAndHeight();
          timer = null;
        }, 100);
      };
    }

    window.addEventListener("resize", dbounce(getCurWidhtAndHeight), false);

    return () =>
      window.removeEventListener(
        "resize",
        dbounce(getCurWidhtAndHeight),
        false
      );
  }, []);

  return { width, height };
};

export default useAutoWidth;
