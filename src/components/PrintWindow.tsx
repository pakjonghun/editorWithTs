import { FC } from "react";

type PrintWindowProp = { code: string };

const PrintWindow: FC<PrintWindowProp> = (props: PrintWindowProp) => {
  return <p>{props.code}</p>;
};

export default PrintWindow;
