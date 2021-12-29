import React, { FC, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import useOnChange from "../hooks/useOnChange";
import { rootReducerType } from "../store/reducer";
import CodeEditor from "./codeEditor";
import Textarea from "./Textarea";
const App: FC = () => {
  const ref = useRef<any>();
  const { value, onChange } = useOnChange("");
  const code = useSelector<rootReducerType, string>(
    (state) => state.code.data.data
  );
  if (ref.current) ref.current.contentWindow.postMessage(code, "*");

  const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root"></div>
    </body>

    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color:red;"><h2>'+err.name+'</h2><h4>'+err.message+'</h4></div>';
        console.error(err);
        }
      }, false);
    </script>
  </html>
  `;

  return (
    <>
      <CodeEditor
        html={html}
        iframe={ref}
        initialValue="Default"
        onChange={onChange}
        value={value}
      />
      <Textarea iframe={ref} html={html} />
      <iframe
        title="123"
        ref={ref}
        sandbox="allow-scripts"
        srcDoc={html}
      ></iframe>
    </>
  );
};

export default App;
