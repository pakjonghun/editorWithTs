import React, { FC, useState } from "react";
import { ResizableBox } from "react-resizable";
import useAutoWidth from "../hooks/autoWidth";
import "../style/resizable.css";

type ResizableProps = {
  direction: "horizontal" | "vertical";
};

const Resizable: FC<ResizableProps> = ({
  children,
  direction = "horizontal",
}) => {
  const { width, height } = useAutoWidth({});

  const [rate, setRate] = useState<number>(0.6);

  if (direction === "horizontal") {
    return (
      <ResizableBox
        className={"codeWidthHandler"}
        maxConstraints={[width * 0.7, Infinity]}
        minConstraints={[width * 0.3, Infinity]}
        resizeHandles={["e"]}
        draggableOpts={{ direction }}
        height={Infinity}
        width={width * rate}
        onResizeStop={(_, data) => {
          setRate(data.size.width / width);
        }}
      >
        {children}
      </ResizableBox>
    );
  } else {
    return (
      <ResizableBox
        maxConstraints={[Infinity, height * 0.7]}
        minConstraints={[Infinity, height * 0.3]}
        resizeHandles={["s"]}
        draggableOpts={{ direction }}
        height={300}
        width={Infinity}
      >
        {children}
      </ResizableBox>
    );
  }
};

export default Resizable;
