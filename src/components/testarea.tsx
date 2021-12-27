import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { codeActions } from "../store/reducer/code";

const Textarea: React.FC = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(codeActions.insertRequest({ code }));
  }, [dispatch, code]);

  const onChange = useCallback(
    (value: string) => {
      setCode(value);
    },
    [setCode]
  );

  return (
    <>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <textarea
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange(event.target.value)
          }
          value={code}
        />

        <button>click</button>
      </form>
    </>
  );
};

export default Textarea;
