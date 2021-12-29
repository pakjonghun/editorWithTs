import React, { FC } from "react";
import { ResizableBox, ResizeHandle } from "react-resizable";
import "../style/resizable.css";

type ResizableProps = {
  direction?: "horizontal" | "vertical";
};

const Resizable: FC<ResizableProps> = ({
  children,
  direction = "horizontal",
}) => {
  if (direction === "horizontal") {
    console.log(window.innerWidth);
    return (
      <ResizableBox
        className={"codeWidthHandler"}
        maxConstraints={[window.innerWidth * 0.7, Infinity]}
        minConstraints={[window.innerWidth * 0.3, Infinity]}
        resizeHandles={["e"]}
        draggableOpts={{ direction }}
        height={Infinity}
        width={window.innerWidth * 0.7}
      >
        {children}
      </ResizableBox>
    );
  } else {
    return (
      <ResizableBox
        maxConstraints={[Infinity, window.innerHeight * 0.7]}
        minConstraints={[Infinity, window.innerHeight * 0.3]}
        resizeHandles={["s"]}
        draggableOpts={{ direction }}
        height={window.innerHeight * 0.3}
        width={Infinity}
      >
        {children}
      </ResizableBox>
    );
  }
};

export default Resizable;
