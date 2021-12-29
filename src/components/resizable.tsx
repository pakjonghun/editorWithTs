import React, { FC } from "react";
import { ResizableBox } from "react-resizable";
import "../style/resizable.css";

type ResizableProps = {
  height: number;
  width: number;
  direction: "horizontal" | "vertical";
};

const Resizable: FC<ResizableProps> = ({
  children,
  direction = "horizontal",
  height = 300,
  width = Infinity,
}) => {
  return (
    <ResizableBox
      resizeHandles={["s"]}
      draggableOpts={{ direction }}
      height={height}
      width={width}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
